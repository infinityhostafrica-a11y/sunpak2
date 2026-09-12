'use server';
/**
 * @fileOverview AI-powered land listing recommendation engine for Sunpak Estate.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendationInputSchema = z.object({
  query: z.string().describe('The search query from the user describing their ideal plot of land.'),
});
export type RecommendationInput = z.infer<typeof RecommendationInputSchema>;

const RecommendationOutputSchema = z.object({
  recommendations: z
    .array(
      z.object({
        listingType: z.string().describe('Type of the land recommended (Residential, Commercial, etc.)'),
        reasoning: z.string().describe('Why this type of land matches the user query.'),
        idealLocations: z.array(z.string()).describe('Suggested locations in Kenya for this type of plot.'),
      })
    )
    .describe('Array of recommended land types based on the search query.'),
});
export type RecommendationOutput = z.infer<typeof RecommendationOutputSchema>;

export async function getAIRecommendationsFromSearch(input: RecommendationInput): Promise<RecommendationOutput> {
  return recommendationFlow(input);
}

const recommendationPrompt = ai.definePrompt({
  name: 'recommendationPrompt',
  input: {schema: RecommendationInputSchema},
  output: {schema: RecommendationOutputSchema},
  prompt: `You are an expert real estate advisor for Sunpak Estate in Kenya.
  Based on the search query: "{{query}}", identify three types of land projects or specific land features that would suit the user.
  
  Consider Kenyan contexts:
  - High growth areas: Nakuru, Kajiado, Machakos.
  - Land uses: Agribusiness, building a family home, speculation, or commercial shops.
  - Financing: Users often look for installments.

  Provide strategic advice for each recommendation.
  `,
});

const recommendationFlow = ai.defineFlow(
  {
    name: 'recommendationFlow',
    inputSchema: RecommendationInputSchema,
    outputSchema: RecommendationOutputSchema,
  },
  async input => {
    const {output} = await recommendationPrompt(input);
    return output!;
  }
);
