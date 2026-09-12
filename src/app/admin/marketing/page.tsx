'use client';

import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Plus, Pencil, Trash2, Loader2, Info } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

const DEFAULT_SLIDES = [
  {
    text: 'Own Your Dream Plot Today',
    subtext: 'Verified land in high-growth areas across Kenya.',
    imageId: 'hero-1',
    order: 0,
  },
  {
    text: 'Ready Freehold Title Deeds',
    subtext: 'Absolute peace of mind with authenticated ownership.',
    imageId: 'hero-2',
    order: 1,
  },
  {
    text: 'Flexible 12-Month Payment Plans',
    subtext: 'Start with 10% deposit and pay the balance comfortably.',
    imageId: 'hero-1',
    order: 2,
  }
];

export default function MarketingHeroManager() {
  const db = useFirestore();
  const slidesQuery = useMemoFirebase(() => query(collection(db, 'hero-slides'), orderBy('order', 'asc')), [db]);
  const { data: slides, isLoading } = useCollection(slidesQuery);
  
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState<any>(null);

  const displaySlides = slides && slides.length > 0 ? slides : DEFAULT_SLIDES;
  const isUsingDefaults = !slides || slides.length === 0;

  function handleSaveSlide(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const slideData = {
      text: formData.get('text') as string,
      subtext: formData.get('subtext') as string,
      imageId: formData.get('imageId') as string,
      order: parseInt(formData.get('order') as string) || 0,
    };

    if (currentSlide?.id) {
      const docRef = doc(db, 'hero-slides', currentSlide.id);
      updateDoc(docRef, slideData)
        .catch(async () => {
          const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: slideData,
          } satisfies SecurityRuleContext);
          errorEmitter.emit('permission-error', permissionError);
        });
      toast({ title: 'Updating...', description: 'Applying changes to hero slide.' });
    } else {
      const colRef = collection(db, 'hero-slides');
      addDoc(colRef, slideData)
        .catch(async () => {
          const permissionError = new FirestorePermissionError({
            path: colRef.path,
            operation: 'create',
            requestResourceData: slideData,
          } satisfies SecurityRuleContext);
          errorEmitter.emit('permission-error', permissionError);
        });
      toast({ title: 'Saving...', description: 'Creating new hero slide.' });
    }

    setIsEditing(false);
    setCurrentSlide(null);
  }

  function handleDeleteSlide(id: string) {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this custom slide?')) return;
    
    const docRef = doc(db, 'hero-slides', id);
    deleteDoc(docRef)
      .catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      });
    toast({ title: 'Deleting...', description: 'Removing slide from system.' });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Homepage Hero Manager</h1>
          <p className="text-muted-foreground mt-1">Manage the slides, text, and images your visitors see first.</p>
        </div>
        <Dialog open={isEditing} onOpenChange={(open) => {
          setIsEditing(open);
          if (!open) setCurrentSlide(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 font-bold">
              <Plus className="mr-2 h-4 w-4" />
              Add New Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleSaveSlide}>
              <DialogHeader>
                <DialogTitle>{currentSlide?.id ? 'Edit Slide' : 'Create Custom Slide'}</DialogTitle>
                <DialogDescription>
                  {currentSlide?.id 
                    ? 'Modify this custom slide\'s content.' 
                    : 'This will save a new custom slide to your database.'}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label className="text-sm font-bold">Primary Headline</label>
                  <Input 
                    name="text" 
                    defaultValue={currentSlide?.text} 
                    placeholder="e.g. Own Your Dream Plot Today" 
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-bold">Subtext / Description</label>
                  <Textarea 
                    name="subtext" 
                    defaultValue={currentSlide?.subtext} 
                    placeholder="e.g. Verified land with ready title deeds..." 
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-bold">Background Image</label>
                    <Select name="imageId" defaultValue={currentSlide?.imageId || 'hero-1'}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select image" />
                      </SelectTrigger>
                      <SelectContent>
                        {PlaceHolderImages.map(img => (
                          <SelectItem key={img.id} value={img.id}>{img.id} - {img.imageHint}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-bold">Display Order</label>
                    <Input 
                      name="order" 
                      type="number" 
                      defaultValue={currentSlide?.order ?? 0} 
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">
                  {currentSlide?.id ? 'Update Slide' : 'Save Custom Slide'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isUsingDefaults && !isLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 items-center text-blue-800">
          <Info className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">
            You are currently viewing the site's <strong>default fallback slides</strong>. Click "Edit" on any slide to customize it and save it to your database.
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySlides.map((slide, idx) => {
            const bgImage = PlaceHolderImages.find(img => img.id === slide.imageId);
            const isDefault = !slide.id;
            
            return (
              <AnimatedSection key={slide.id || `default-${idx}`}>
                <Card className="overflow-hidden border-none shadow-lg group relative">
                  {isDefault && (
                    <Badge variant="secondary" className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm text-[10px] font-bold">
                      System Default
                    </Badge>
                  )}
                  <div className="relative h-48 w-full">
                    {bgImage && (
                      <Image 
                        src={bgImage.imageUrl} 
                        alt="Preview" 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 text-center">
                       <p className="text-white text-xs font-bold uppercase tracking-widest">{slide.text}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold truncate max-w-[80%]">{slide.text}</h3>
                      <span className="text-xs bg-muted px-2 py-1 rounded">Order: {slide.order}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{slide.subtext}</p>
                  </CardContent>
                  <CardFooter className="bg-muted/30 p-4 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 font-bold"
                      onClick={() => {
                        setCurrentSlide(slide);
                        setIsEditing(true);
                      }}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      {isDefault ? 'Edit Default' : 'Edit'}
                    </Button>
                    {!isDefault && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteSlide(slide.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      )}
    </div>
  );
}
