'use client';

import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
import { Plus, Pencil, Trash2, Newspaper, Loader2, Calendar, User, ShieldCheck } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

export default function AdminBlogsPage() {
  const db = useFirestore();
  const blogsQuery = useMemoFirebase(() => query(collection(db, 'blogs'), orderBy('createdAt', 'desc')), [db]);
  const { data: blogs, isLoading } = useCollection(blogsQuery);
  
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentBlog, setCurrentBlog] = React.useState<any>(null);

  function handleSaveBlog(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const blogData = {
      title: formData.get('title') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      imageId: formData.get('imageId') as string,
      category: formData.get('category') as string,
      author: (formData.get('author') as string) || 'Sunpak Estate',
      published: true,
      createdAt: currentBlog?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (currentBlog?.id) {
      const docRef = doc(db, 'blogs', currentBlog.id);
      updateDoc(docRef, blogData)
        .catch(async () => {
          const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: blogData,
          } satisfies SecurityRuleContext);
          errorEmitter.emit('permission-error', permissionError);
        });
      toast({ title: 'Updating...', description: 'Applying changes to your article.' });
    } else {
      const colRef = collection(db, 'blogs');
      addDoc(colRef, blogData)
        .catch(async () => {
          const permissionError = new FirestorePermissionError({
            path: colRef.path,
            operation: 'create',
            requestResourceData: blogData,
          } satisfies SecurityRuleContext);
          errorEmitter.emit('permission-error', permissionError);
        });
      toast({ title: 'Publishing...', description: 'Your new article is being live-synced.' });
    }

    setIsEditing(false);
    setCurrentBlog(null);
  }

  function handleDeleteBlog(id: string) {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    const docRef = doc(db, 'blogs', id);
    deleteDoc(docRef)
      .catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      });
    toast({ title: 'Removing...', description: 'Deleting article from database.' });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <Newspaper className="text-primary h-8 w-8" />
            Blog & News Manager
          </h1>
          <p className="text-muted-foreground mt-1 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="h-3 w-3" /> Secure Admin Control
          </p>
        </div>
        <Dialog open={isEditing} onOpenChange={(open) => {
          setIsEditing(open);
          if (!open) setCurrentBlog(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 font-black uppercase text-xs tracking-widest px-6 h-12 shadow-lg">
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSaveBlog}>
              <DialogHeader>
                <DialogTitle className="font-black uppercase tracking-tight text-xl">
                  {currentBlog?.id ? 'Edit Article' : 'Create New Article'}
                </DialogTitle>
                <DialogDescription className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                  Fill in the details for your blog post. Changes are live-synced to Firestore.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-6">
                <div className="grid gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Article Title</label>
                  <Input 
                    name="title" 
                    defaultValue={currentBlog?.title} 
                    placeholder="e.g. Why Nakuru is the Next Real Estate Frontier" 
                    required 
                    className="h-12 border-gray-200 font-bold"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</label>
                    <Select name="category" defaultValue={currentBlog?.category || 'Market Trends'}>
                      <SelectTrigger className="h-12 border-gray-200 font-bold">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Market Trends" className="font-bold">Market Trends</SelectItem>
                        <SelectItem value="Investment Tips" className="font-bold">Investment Tips</SelectItem>
                        <SelectItem value="Company News" className="font-bold">Company News</SelectItem>
                        <SelectItem value="Land Ownership" className="font-bold">Land Ownership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Author Name</label>
                    <Input 
                      name="author" 
                      defaultValue={currentBlog?.author || 'Sunpak Estate'} 
                      className="h-12 border-gray-200 font-bold"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Featured Image</label>
                  <Select name="imageId" defaultValue={currentBlog?.imageId || 'land-1'}>
                    <SelectTrigger className="h-14 border-gray-200">
                      <SelectValue placeholder="Select image" />
                    </SelectTrigger>
                    <SelectContent>
                      {PlaceHolderImages.map(img => (
                        <SelectItem key={img.id} value={img.id} className="py-2">
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded border">
                              <Image src={img.imageUrl} alt="" fill className="object-cover" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-tighter truncate">{img.imageHint}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Excerpt (Short Preview)</label>
                  <Textarea 
                    name="excerpt" 
                    defaultValue={currentBlog?.excerpt} 
                    placeholder="Summarize the article in 2 sentences..." 
                    required 
                    className="border-gray-200 font-medium"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Full Content</label>
                  <Textarea 
                    name="content" 
                    defaultValue={currentBlog?.content} 
                    placeholder="Write your article here..." 
                    className="min-h-[250px] border-gray-200 font-medium"
                    required 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full h-12 bg-primary font-black uppercase tracking-widest">
                  {currentBlog?.id ? 'Update Article' : 'Publish Article'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : blogs && blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => {
            const bgImage = PlaceHolderImages.find(img => img.id === blog.imageId);
            
            return (
              <AnimatedSection key={blog.id}>
                <Card className="overflow-hidden border-none shadow-xl h-full flex flex-col group bg-card">
                  <div className="relative h-48 w-full">
                    {bgImage && (
                      <Image 
                        src={bgImage.imageUrl} 
                        alt={blog.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <Badge className="absolute top-2 right-2 bg-primary/90 font-black uppercase text-[10px]">
                      {blog.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6 flex-1">
                    <h3 className="font-black text-lg mb-3 line-clamp-2 leading-tight uppercase tracking-tight">{blog.title}</h3>
                    <div className="flex items-center gap-4 text-[9px] text-muted-foreground uppercase tracking-widest font-black mb-4 bg-muted/50 p-2 rounded">
                      <span className="flex items-center gap-1"><User className="h-3 w-3 text-primary" /> {blog.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-primary" /> {blog.createdAt ? format(new Date(blog.createdAt), 'MMM d, yyyy') : 'N/A'}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3 font-medium leading-relaxed">{blog.excerpt}</p>
                  </CardContent>
                  <CardFooter className="bg-muted/30 p-4 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 font-black uppercase text-[10px] tracking-widest border-gray-200"
                      onClick={() => {
                        setCurrentBlog(blog);
                        setIsEditing(true);
                      }}
                    >
                      <Pencil className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive hover:bg-destructive/10 border-destructive/20"
                      onClick={() => handleDeleteBlog(blog.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </CardFooter>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center bg-card rounded-2xl border-2 border-dashed border-muted shadow-inner">
          <div className="bg-muted p-6 rounded-full mb-6">
            <Newspaper className="h-12 w-12 text-muted-foreground/30" />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tight">No Blog Posts Yet</h3>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-2 font-bold uppercase tracking-widest">
            Click "New Article" to start sharing insights and news with your visitors.
          </p>
        </div>
      )}
    </div>
  );
}
