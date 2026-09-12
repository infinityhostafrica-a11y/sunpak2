'use client';

import React from 'react';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { AnimatedSection } from '@/components/animated-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, User, ArrowLeft, Loader2, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

export default function BlogDetailPage({ params: paramsProp }: { params: Promise<{ id: string }> }) {
  const params = React.use(paramsProp);
  const db = useFirestore();
  const blogRef = useMemoFirebase(() => doc(db, 'blogs', params.id), [db, params.id]);
  const { data: blog, isLoading } = useDoc(blogRef);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!blog) {
    notFound();
  }

  const bgImage = PlaceHolderImages.find(img => img.id === blog.imageId);

  return (
    <article className="bg-background min-h-screen pb-24">
      {/* Header / Hero */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        {bgImage && (
          <Image 
            src={bgImage.imageUrl} 
            alt={blog.title} 
            fill 
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div className="container mx-auto max-w-4xl">
            <AnimatedSection>
              <Badge className="mb-6 bg-accent text-accent-foreground font-bold px-4 py-1">
                {blog.category}
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8">
                {blog.title}
              </h1>
              <div className="flex items-center justify-center gap-6 text-xs text-white/80 font-black uppercase tracking-widest">
                <span className="flex items-center gap-2"><User className="h-4 w-4 text-accent" /> {blog.author}</span>
                <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" /> {blog.createdAt ? format(new Date(blog.createdAt), 'MMMM d, yyyy') : 'N/A'}</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-3xl mx-auto">
          {/* Action Bar */}
          <div className="flex items-center justify-between border-b pb-8 mb-12">
            <Button variant="ghost" asChild className="font-bold text-xs uppercase tracking-widest pl-0">
              <Link href="/blogs">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <AnimatedSection delay={0.2}>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl font-bold text-foreground/80 leading-relaxed mb-8 italic border-l-4 border-primary pl-6">
                {blog.excerpt}
              </p>
              
              <div className="text-foreground/70 leading-relaxed whitespace-pre-wrap text-lg space-y-6">
                {blog.content}
              </div>
            </div>
          </AnimatedSection>

          {/* Bottom CTA */}
          <div className="mt-20 pt-12 border-t text-center">
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Interested in land ownership?</h3>
            <p className="text-muted-foreground mb-8 font-medium">Talk to one of our land experts today and start your investment journey.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary font-bold px-8">
                <Link href="https://wa.me/254790611601">Contact an Agent</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-bold px-8">
                <Link href="/plots-for-sale">View Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
