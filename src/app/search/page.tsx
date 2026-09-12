
'use client';
export const dynamic = 'force-dynamic';
import ListingCard from '@/components/listing-card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getFeaturedListings } from '@/lib/listings';
import { Sparkles, Map, SearchIcon, Bot } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';
import React from 'react';
import { getAIRecommendationsFromSearch, type RecommendationOutput } from '@/ai/ai-recommendations-from-search';
import { Card, CardContent } from '@/components/ui/card';
import type { LandListing } from '@/types';

export default function SearchPage() {
  const [query, setQuery] = React.useState('');
  const [recommendations, setRecommendations] = React.useState<RecommendationOutput['recommendations'] | null>(null);
  const [isSearching, setIsSearching] = React.useState(false);
  const [featuredPlots, setFeaturedPlots] = React.useState<LandListing[]>([]);

  React.useEffect(() => {
    // Populate featured plots only on client to avoid hydration mismatch from randomization
    setFeaturedPlots(getFeaturedListings(4));
  }, []);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query) return;
    setIsSearching(true);
    try {
      const result = await getAIRecommendationsFromSearch({ query });
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatedSection>
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
             <Map className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Find Your Future Plot
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Tell us about your plans. Are you building a retirement home in Nakuru? Looking for commercial land in Kajiado? Our AI will help you find the best location.
          </p>
          <form onSubmit={handleSearch} className="mt-8 space-y-4">
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'I want a 1/8 acre plot for a residential house in Nakuru near social amenities.' or 'Looking for affordable agricultural land in Kajiado with ready titles.'"
              className="min-h-[120px] text-base"
              rows={4}
            />
            <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSearching}>
              {isSearching ? <Sparkles className="mr-2 h-5 w-5 animate-spin" /> : <SearchIcon className="mr-2 h-5 w-5" />}
              {isSearching ? 'Analyzing Opportunities...' : 'Get Land Expert Advice'}
            </Button>
          </form>
        </div>
      </AnimatedSection>

      {recommendations && (
        <AnimatedSection className="mt-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <Bot className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Expert Recommendations</h2>
            </div>
            <div className="grid gap-6">
              {recommendations.map((rec, idx) => (
                <Card key={idx} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{rec.listingType}</h3>
                    <p className="text-muted-foreground mb-4">{rec.reasoning}</p>
                    <div className="flex flex-wrap gap-2">
                      {rec.idealLocations.map(loc => (
                        <span key={loc} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {loc}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection delay={0.2}>
        <div className="mt-20">
          <h2 className="font-headline text-2xl font-bold mb-8 text-center">
            Currently Available Projects
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPlots.map((plot) => (
              <ListingCard key={plot.id} listing={plot} />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
