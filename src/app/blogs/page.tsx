'use client';
export const dynamic = 'force-dynamic';

import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { AnimatedSection } from '@/components/animated-section';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, User, ArrowRight, Loader2, Newspaper } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export default function BlogsPage() {
  const db = useFirestore();
  const blogsQuery = useMemoFirebase(() => query(collection(db, 'blogs'), orderBy('createdAt', 'desc')), [db]);
  const { data: blogs, isLoading } = useCollection(blogsQuery);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 border-white/40 text-white font-bold uppercase tracking-widest px-4 py-1">
            News & Insights
          </Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-black mb-6">
            Sunpak Estate Blog
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-primary-foreground/80 font-medium">
            Expert advice, market trends, and company updates to help you navigate the Kenyan land investment landscape.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Loading insights...</p>
            </div>
          ) : blogs && blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, idx) => {
                const bgImage = PlaceHolderImages.find(img => img.id === blog.imageId);
                return (
                  <AnimatedSection key={blog.id} delay={idx * 0.1}>
                    <Card className="flex flex-col h-full overflow-hidden border-none shadow-md hover:shadow-xl transition-all group">
                      <Link href={`/blogs/${blog.id}`} className="relative h-64 w-full overflow-hidden">
                        {bgImage && (
                          <Image 
                            src={bgImage.imageUrl} 
                            alt={blog.title} 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                          {blog.category}
                        </Badge>
                      </Link>
                      <CardContent className="p-6 flex-1">
                        <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-4">
                          <span className="flex items-center gap-1"><User className="h-3 w-3" /> {blog.author}</span>
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {blog.createdAt ? format(new Date(blog.createdAt), 'MMM d, yyyy') : 'N/A'}</span>
                        </div>
                        <h2 className="text-xl font-black mb-3 line-clamp-2 leading-tight hover:text-primary transition-colors">
                          <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </h2>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 font-medium leading-relaxed">
                          {blog.excerpt}
                        </p>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button asChild variant="ghost" className="p-0 font-black uppercase text-[10px] tracking-widest hover:bg-transparent hover:text-primary group">
                          <Link href={`/blogs/${blog.id}`}>
                            Read Article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </AnimatedSection>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24">
              <Newspaper className="h-16 w-16 text-muted-foreground/20 mx-auto mb-6" />
              <h3 className="text-2xl font-black uppercase tracking-tight">No articles found</h3>
              <p className="text-muted-foreground mt-4 max-w-md mx-auto font-bold uppercase tracking-widest text-xs">
                We are currently preparing some insightful content for you. Check back soon!
              </p>
              <Button asChild className="mt-8 bg-primary">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
