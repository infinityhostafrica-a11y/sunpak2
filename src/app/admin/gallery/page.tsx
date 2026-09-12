'use client';

import React from 'react';
import { useFirestore, useCollection, useMemoFirebase, useStorage } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firebaseConfig } from '@/firebase/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, Image as ImageIcon, Loader2, Upload, X, ShieldCheck, CheckCircle2, LayoutGrid, AlertCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

interface PendingFile {
  file: File;
  preview: string;
  caption: string;
  category: string;
}

const GALLERY_CATEGORIES = [
  'Site Visit',
  'Title Handover',
  'Project Launch',
  'Community Work',
  'Office Highlights'
];

export default function AdminGalleryPage() {
  const db = useFirestore();
  const storage = useStorage();
  const galleryQuery = useMemoFirebase(() => query(collection(db, 'gallery'), orderBy('createdAt', 'desc')), [db]);
  const { data: images, isLoading } = useCollection(galleryQuery);
  
  const [isUploading, setIsUploading] = React.useState(false);
  const [totalProgress, setTotalProgress] = React.useState(0);
  
  const [isDialogOpen, setIsUploadDialogOpen] = React.useState(false);
  const [pendingFiles, setPendingFiles] = React.useState<PendingFile[]>([]);
  const [batchCategory, setBatchCategory] = React.useState('Site Visit');

  function handleFileSelection(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const newFiles = Array.from(e.target.files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      caption: file.name.split('.')[0].replace(/[-_]/g, ' '),
      category: batchCategory
    }));

    setPendingFiles(prev => [...prev, ...newFiles]);
    setIsUploadDialogOpen(true);
    e.target.value = ''; // Reset input
  }

  function removePendingFile(index: number) {
    setPendingFiles(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  }

  function updateItem(index: number, updates: Partial<PendingFile>) {
    setPendingFiles(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...updates };
      return updated;
    });
  }

  function applyBatchCategory(category: string) {
    setBatchCategory(category);
    setPendingFiles(prev => prev.map(item => ({ ...item, category })));
  }

  async function processUpload() {
    if (pendingFiles.length === 0) return;
    
    if (!storage) {
      console.error("Storage instance is null in processUpload");
      toast({ variant: 'destructive', title: 'Storage Error', description: 'Firebase Storage service is not available.' });
      return;
    }
    
    setIsUploading(true);
    setTotalProgress(0);
    
    let completedCount = 0;

    try {
      for (const item of pendingFiles) {
        const sanitizedName = item.file.name.replace(/[^a-zA-Z0-9.]/g, '_');
        const dbId = firebaseConfig.firestoreDatabaseId || 'default';
        const storageRef = ref(storage, `${dbId}/gallery/${Date.now()}-${sanitizedName}`);
        const uploadTask = uploadBytesResumable(storageRef, item.file);

        // Wait for storage upload
        await new Promise<void>((resolve, reject) => {
          uploadTask.on('state_changed', 
            (snapshot) => {
              // Track overall progress
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload of ${item.file.name} is ${progress}% done`);
            }, 
            (error) => {
              console.error("Upload failed for file:", item.file.name, error);
              reject(error);
            }, 
            () => resolve()
          );
        });

        const url = await getDownloadURL(uploadTask.snapshot.ref);

        // Add to Firestore
        const imageData = {
          url,
          caption: item.caption || 'Sunpak Estate Moment',
          category: item.category || batchCategory,
          createdAt: new Date().toISOString(),
        };

        const colRef = collection(db, 'gallery');
        await addDoc(colRef, imageData);
        
        completedCount++;
        setTotalProgress(Math.round((completedCount / pendingFiles.length) * 100));
      }

      toast({ title: 'Upload Successful', description: `Added ${completedCount} images to gallery.` });
      setPendingFiles([]);
      setIsUploadDialogOpen(false);
    } catch (error: any) {
      console.error('Final upload sequence error:', error);
      toast({ 
        variant: 'destructive', 
        title: 'Upload Failed', 
        description: error.message || 'An unexpected error occurred during storage sync. Check console for details.' 
      });
    } finally {
      setIsUploading(false);
      setTotalProgress(0);
    }
  }

  function handleDeleteImage(id: string) {
    if (!confirm('Are you sure you want to remove this image from the gallery?')) return;
    const docRef = doc(db, 'gallery', id);
    deleteDoc(docRef).catch(async () => {
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'delete',
      } satisfies SecurityRuleContext);
      errorEmitter.emit('permission-error', permissionError);
    });
    toast({ title: 'Removing...', description: 'Image entry is being deleted.' });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <ImageIcon className="text-primary h-8 w-8" />
            Media Gallery Manager
          </h1>
          <p className="text-muted-foreground mt-1 text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
            <ShieldCheck className="h-3 w-3" /> Visual Proof of Excellence
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <label className="cursor-pointer">
            <Button asChild className="bg-primary hover:bg-primary/90 font-black uppercase text-xs tracking-widest px-6 h-12 shadow-lg" disabled={isUploading}>
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Select Photos
              </span>
            </Button>
            <input 
              type="file" 
              multiple 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileSelection} 
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => !isUploading && setIsUploadDialogOpen(open)}>
        <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-hidden flex flex-col p-0 border-none shadow-2xl rounded-2xl">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-2xl font-black uppercase tracking-tight">Prepare Your Gallery</DialogTitle>
            <DialogDescription className="font-bold text-[10px] uppercase tracking-widest text-primary">
              Add captions and categorize your moments for better site organization.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-muted/50 p-4 rounded-xl border border-dashed flex items-center justify-between">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                  <LayoutGrid className="h-3 w-3" /> Batch Category
                </label>
                <Select value={batchCategory} onValueChange={applyBatchCategory}>
                  <SelectTrigger className="w-[220px] h-10 border-none shadow-sm font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GALLERY_CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat} className="font-bold">{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-primary">{pendingFiles.length}</p>
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Files Queued</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {pendingFiles.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-card rounded-xl border group hover:border-primary/50 transition-colors">
                  <div className="relative h-24 w-32 shrink-0 rounded-lg overflow-hidden border bg-muted">
                    <Image src={item.preview} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-muted-foreground">Caption</label>
                        <Input 
                          placeholder="e.g. Happy client at Kitengela..." 
                          value={item.caption}
                          onChange={(e) => updateItem(idx, { caption: e.target.value })}
                          className="h-9 border-none bg-muted/30 focus:ring-1 focus:ring-primary font-bold text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-muted-foreground">Item Category</label>
                        <Select value={item.category} onValueChange={(val) => updateItem(idx, { category: val })}>
                          <SelectTrigger className="h-9 border-none bg-muted/30 font-bold text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {GALLERY_CATEGORIES.map(cat => (
                              <SelectItem key={cat} value={cat} className="text-xs font-bold">{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase text-muted-foreground tracking-tighter opacity-60">
                        {sanitizedSize(item.file.size)} &bull; {item.file.type.split('/')[1].toUpperCase()}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-destructive hover:bg-destructive/10 font-bold text-[9px] uppercase"
                        onClick={() => removePendingFile(idx)}
                      >
                        Remove Item
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="p-6 bg-muted/20 border-t">
            <Button 
              className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest text-sm shadow-xl transition-all active:scale-[0.98]"
              disabled={isUploading || pendingFiles.length === 0}
              onClick={processUpload}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Syncing to Storage {totalProgress}%
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Publish to Gallery
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : images && images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <AnimatedSection key={img.id}>
              <Card className="overflow-hidden border-none shadow-xl group bg-card relative aspect-square">
                <Image 
                  src={img.url} 
                  alt={img.caption} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized={img.url.includes('firebasestorage')}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="h-10 w-10 rounded-full"
                    onClick={() => handleDeleteImage(img.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-[10px] font-black text-white uppercase truncate">{img.caption}</p>
                  <p className="text-[8px] font-bold text-accent uppercase">{img.category || 'Sunpak Estate'}</p>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center bg-card rounded-2xl border-2 border-dashed border-muted shadow-inner">
          <div className="bg-muted p-6 rounded-full mb-6">
            <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tight">Gallery is Empty</h3>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-2 font-bold uppercase tracking-widest">
            Click "Select Photos" to start building your site visit and project showcase.
          </p>
        </div>
      )}
    </div>
  );
}

function sanitizedSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B';
  const kb = bytes / 1024;
  if (kb < 1024) return kb.toFixed(1) + ' KB';
  return (kb / 1024).toFixed(1) + ' MB';
}
