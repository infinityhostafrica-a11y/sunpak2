'use client';

import React from 'react';
import { useFirestore, useCollection, useMemoFirebase, useStorage } from '@/firebase';
import { collection, setDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firebaseConfig } from '@/firebase/config';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  Loader2, 
  Upload, 
  X, 
  Database,
  FileCode
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { AnimatedSection } from '@/components/animated-section';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { LOCATIONS, CATEGORIES, getListings } from '@/lib/listings';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import type { LandListing } from '@/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

export default function AdminListingsPage() {
  const db = useFirestore();
  const storage = useStorage();
  const listingsQuery = useMemoFirebase(() => query(collection(db, 'vehicles'), orderBy('createdAt', 'desc')), [db]);
  const { data: dbListings, isLoading } = useCollection<LandListing>(listingsQuery);

  const [isEditing, setIsEditing] = React.useState(false);
  const [currentListing, setCurrentListing] = React.useState<any>(null);
  const [uploadingImages, setUploadingImages] = React.useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = React.useState<string[]>([]);

  // Merge static and dynamic listings
  const combinedListings = React.useMemo(() => {
    const staticList = getListings();
    const dbList = dbListings || [];
    const dbIds = new Set(dbList.map(l => l.id));
    
    // Tag them so we know which can be deleted
    const taggedDb = dbList.map(l => ({ ...l, source: 'database' as const }));
    const taggedStatic = staticList
      .filter(l => !dbIds.has(l.id))
      .map(l => ({ ...l, source: 'static' as const }));
      
    return [...taggedDb, ...taggedStatic];
  }, [dbListings]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !storage) return;
    setUploadingImages(true);
    const files = Array.from(e.target.files);
    const newUrls: string[] = [];

    try {
      for (const file of files) {
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
        const dbId = firebaseConfig.firestoreDatabaseId || 'default';
        const storageRef = ref(storage, `${dbId}/listings/${Date.now()}-${sanitizedName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on('state_changed', 
            null, 
            (error) => {
              console.error("Storage upload error:", error);
              reject(error);
            }, 
            () => resolve()
          );
        });

        const url = await getDownloadURL(uploadTask.snapshot.ref);
        newUrls.push(url);
      }
      setUploadedImageUrls(prev => [...prev, ...newUrls]);
      toast({ title: 'Success', description: `${files.length} images uploaded.` });
    } catch (error: any) {
      console.error("Upload process failed:", error);
      toast({ variant: 'destructive', title: 'Upload Failed', description: error.message || 'Could not sync images to Storage.' });
    } finally {
      setUploadingImages(false);
    }
  }

  function removeUploadedImage(urlToRemove: string) {
    setUploadedImageUrls(prev => prev.filter(url => url !== urlToRemove));
  }

  function handleSaveListing(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = currentListing?.id || `project-${Date.now()}`;
    
    const listingData = {
      id,
      name: formData.get('name') as string,
      location: formData.get('location') as any,
      price: parseInt(formData.get('price') as string),
      size: formData.get('size') as string,
      categoryDisplayName: formData.get('categoryDisplayName') as string,
      categories: [formData.get('primaryCategory') as any],
      titleStatus: formData.get('titleStatus') as any,
      description: formData.get('description') as string,
      topography: 'Flat',
      soilType: 'Red Soil',
      amenities: ['Water', 'Electricity'],
      features: (formData.get('features') as string).split(',').map(f => f.trim()),
      images: uploadedImageUrls.map(url => ({ id: url, hint: 'Uploaded Image', url })),
      specs: [
        {
          groupName: 'Property Details',
          specs: [
            { name: 'Size', value: formData.get('size') as string },
            { name: 'Title Status', value: formData.get('titleStatus') as string },
          ]
        }
      ],
      createdAt: currentListing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = doc(db, 'vehicles', id);
    setDoc(docRef, listingData, { merge: true })
      .catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'write',
          requestResourceData: listingData,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      });

    toast({ title: 'Saving Project', description: 'Syncing with database...' });
    setIsEditing(false);
    setCurrentListing(null);
    setUploadedImageUrls([]);
  }

  function handleDeleteListing(listing: any) {
    if (listing.source === 'static') {
      toast({ 
        variant: 'destructive', 
        title: 'Cannot Delete', 
        description: 'This is a system default listing. To change it, edit and save it; this will move it to the database where it can be managed.' 
      });
      return;
    }

    if (!confirm(`Are you sure you want to permanently delete "${listing.name}"?`)) return;
    
    const docRef = doc(db, 'vehicles', listing.id);
    deleteDoc(docRef)
      .then(() => {
        toast({ title: 'Deleted', description: `"${listing.name}" has been removed.` });
      })
      .catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Project Management</h1>
          <p className="text-muted-foreground mt-1 font-bold uppercase text-[10px] tracking-widest text-primary">Manage Sunpak Estate land projects.</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 font-black uppercase text-xs tracking-widest px-6 h-12 shadow-lg"
          onClick={() => {
            setCurrentListing(null);
            setUploadedImageUrls([]);
            setIsEditing(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSaveListing}>
            <DialogHeader>
              <DialogTitle className="font-black uppercase text-xl text-primary">
                {currentListing?.id ? 'Edit Project' : 'New Land Project'}
              </DialogTitle>
              <DialogDescription className="text-[10px] font-bold uppercase tracking-widest">
                Fill in the project details. Changes are saved to Firestore.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Project Name</label>
                  <Input name="name" defaultValue={currentListing?.name} required placeholder="e.g. Kitengela Prime" />
                </div>
                <div className="grid gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Location</label>
                  <Select name="location" defaultValue={currentListing?.location || 'kitengela'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map(loc => <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <label className="text-[10px) font-black uppercase tracking-widest text-muted-foreground">Price (Kes)</label>
                  <Input name="price" type="number" defaultValue={currentListing?.price} required placeholder="350000" />
                </div>
                <div className="grid gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Size</label>
                  <Input name="size" defaultValue={currentListing?.size} required placeholder="50 x 100" />
                </div>
                <div className="grid gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Title Status</label>
                  <Select name="titleStatus" defaultValue={currentListing?.titleStatus || 'Ready'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ready">Ready Title</SelectItem>
                      <SelectItem value="In Process">In Process</SelectItem>
                      <SelectItem value="Freehold">Freehold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category Label</label>
                  <Input name="categoryDisplayName" defaultValue={currentListing?.categoryDisplayName} placeholder="e.g. Investment Special" />
                </div>
                <div className="grid gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Primary Category</label>
                  <Select name="primaryCategory" defaultValue={currentListing?.categories?.[0] || 'residential'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Description</label>
                <Textarea name="description" defaultValue={currentListing?.description} placeholder="Describe the property..." className="min-h-[100px]" />
              </div>

              <div className="grid gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Features (Comma separated)</label>
                <Input name="features" defaultValue={currentListing?.features?.join(', ')} placeholder="Water available, Fenced, Near Highway" />
              </div>

              <div className="space-y-4 border-t pt-6">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <Upload className="h-3 w-3" /> Property Images (Unlimited Uploads)
                </label>
                
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {uploadedImageUrls.map((url, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg border overflow-hidden group">
                      <Image src={url} alt="" fill className="object-cover" />
                      <button 
                        type="button"
                        onClick={() => removeUploadedImage(url)}
                        className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    {uploadingImages ? (
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    ) : (
                      <>
                        <Plus className="h-6 w-6 text-muted-foreground" />
                        <span className="text-[8px] font-bold uppercase mt-1">Upload</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      multiple 
                      className="hidden" 
                      onChange={handleImageUpload}
                      disabled={uploadingImages}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full h-12 bg-primary font-black uppercase tracking-widest shadow-xl">
                {currentListing?.id ? 'Update Project' : 'Publish Project'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AnimatedSection>
        <div className="bg-card rounded-2xl border shadow-xl overflow-hidden">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[300px] text-[10px] font-black uppercase tracking-wider">Project Name</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-wider">Source</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-wider">Location</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-wider">Price (Kes)</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-wider">Status</TableHead>
                  <TableHead className="text-right text-[10px] font-black uppercase tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {combinedListings.map((item) => (
                  <TableRow key={item.id} className="group hover:bg-muted/20 transition-colors">
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-14 rounded overflow-hidden border bg-muted shrink-0">
                          {item.images?.[0] && (
                            <Image 
                              src={item.images[0].url || PlaceHolderImages.find(p => p.id === item.images[0].id)?.imageUrl || '/api/placeholder'} 
                              alt="" 
                              fill 
                              className="object-cover"
                              unoptimized={!!item.images[0].url}
                            />
                          )}
                        </div>
                        <span className="font-black text-sm">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.source === 'database' ? (
                        <Badge variant="outline" className="text-[8px] font-black uppercase tracking-tighter bg-green-50 text-green-700 border-green-200">
                          <Database className="mr-1 h-2 w-2" /> Live
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[8px] font-black uppercase tracking-tighter bg-blue-50 text-blue-700 border-blue-200">
                          <FileCode className="mr-1 h-2 w-2" /> Static
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="capitalize font-bold text-muted-foreground text-xs">{item.location}</TableCell>
                    <TableCell className="font-black text-primary">
                      {item.price.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 font-bold text-[10px]">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild title="View Public Page">
                          <Link href={`/plots-for-sale/${item.categories[0]}/${item.id}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-primary"
                          title="Edit Listing"
                          onClick={() => {
                            setCurrentListing(item);
                            setUploadedImageUrls(item.images?.filter(img => img.url).map(img => img.url!) || []);
                            setIsEditing(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          title={item.source === 'static' ? "Cannot delete static items" : "Delete Listing"}
                          onClick={() => handleDeleteListing(item)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
