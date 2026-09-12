'use server';
/**
 * @fileOverview A property-specific chat AI agent for Sunpak Estate.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PropertyChatInputSchema = z.object({
  question: z.string().describe('The question from the user about the land plot.'),
  listing: z.any().describe('The land listing object with all its details.'),
});
export type PropertyChatInput = z.infer<typeof PropertyChatInputSchema>;

const PropertyChatOutputSchema = z.object({
  answer: z.string().describe("The AI assistant's answer to the question."),
  showContactButton: z
    .boolean()
    .optional()
    .describe(
      'Set to true if the user wants to book a visit, inquire about titles, or buy.'
    ),
});
export type PropertyChatOutput = z.infer<typeof PropertyChatOutputSchema>;

export async function propertyChat(
  input: PropertyChatInput
): Promise<PropertyChatOutput> {
  return propertyChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'propertyChatPrompt',
  input: { schema: PropertyChatInputSchema },
  output: { schema: PropertyChatOutputSchema },
  prompt: `You are a professional, friendly, and knowledgeable real estate advisor for Sunpak Estate. 
Your goal is to answer questions about a specific land property based on the provided data.

Be helpful and provide clear, concise answers. If the information is not available in the provided data, say that you don't have that information.

If the user expresses intent to book a site visit, buy, or talk to an agent (using keywords like "visit", "buy", "purchase", "interested", "how to pay"), set 'showContactButton' to true.

Property Details:
Name: {{listing.name}}
Category: {{listing.categoryDisplayName}}
Price: Ksh {{listing.price}}
Size: {{listing.size}}
Location: {{listing.location}}
Title Status: {{listing.titleStatus}}
Description: {{listing.description}}

Specifications:
{{#each listing.specs}}
**{{groupName}}**
{{#each specs}}
- {{name}}: {{value}}
{{/each}}
{{/each}}

Features:
{{#each listing.features}}
- {{this}}
{{/each}}

User's Question:
"{{question}}"

Your Answer:
`,
});

const propertyChatFlow = ai.defineFlow(
  {
    name: 'propertyChatFlow',
    inputSchema: PropertyChatInputSchema,
    outputSchema: PropertyChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
