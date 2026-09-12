'use server';
/**
 * @fileOverview A general site-wide real estate assistant for Sunpak Estate.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SiteAssistantChatInputSchema = z.object({
  chatHistory: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      })
    )
    .describe('The conversation history.'),
  listings: z.array(z.any()).describe('A list of all available land listings.'),
});
export type SiteAssistantChatInput = z.infer<typeof SiteAssistantChatInputSchema>;

const RecommendedListingSchema = z.object({
  id: z.string().describe('The listing ID.'),
  name: z.string().describe('The name of the property.'),
  location: z.string().describe('The location.'),
  price: z.number().describe('The price in Ksh.'),
  size: z.string().describe('The size of the plot.'),
  titleStatus: z.string().describe('Title deed status.'),
});

const SiteAssistantChatOutputSchema = z.object({
  answer: z.string(),
  recommendedListings: z.array(RecommendedListingSchema).optional(),
  showContactButton: z.boolean().optional(),
});
export type SiteAssistantChatOutput = z.infer<typeof SiteAssistantChatOutputSchema>;

export async function siteAssistantChat(input: SiteAssistantChatInput): Promise<SiteAssistantChatOutput> {
  return siteAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'siteAssistantChatPrompt',
  input: { schema: SiteAssistantChatInputSchema },
  output: { schema: SiteAssistantChatOutputSchema },
  prompt: `You are a professional, helpful real estate assistant for Sunpak Estate in Kenya.

You help users find plots of land for residential, commercial, or agricultural use.

Available Properties:
{{#each listings}}
- {{name}} in {{location}}, Size: {{size}}, Price: Ksh {{price}}, Title: {{titleStatus}}, ID: {{id}}
{{/each}}

Sunpak Estate Policies:
1. Title Deeds: All our plots have ready freehold title deeds.
2. Financing: We offer flexible payment plans (installments) over 12 months with a 10% deposit.
3. Site Visits: We organize site visits daily (Monday - Monday).
4. Locations: We focus on Juja, Kitengela, Kisaju, Isinya, Mwea, Konza, and Ruiru.

If the user wants to book a visit, inquire about a specific plot, or speak to an agent, set 'showContactButton' to true.

{{#each chatHistory}}
**{{role}}**: {{content}}
{{/each}}
`,
});

const siteAssistantFlow = ai.defineFlow(
  {
    name: 'siteAssistantFlow',
    inputSchema: SiteAssistantChatInputSchema,
    outputSchema: SiteAssistantChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
