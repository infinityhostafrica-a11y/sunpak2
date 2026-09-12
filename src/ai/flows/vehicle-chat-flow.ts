'use server';
/**
 * @fileOverview A vehicle chat AI agent.
 *
 * - vehicleChat - A function that handles the vehicle chat process.
 * - VehicleChatInput - The input type for the vehicleChat function.
 * - VehicleChatOutput - The return type for the vehicleChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { Vehicle } from '@/types';

const VehicleChatInputSchema = z.object({
  question: z.string().describe('The question from the user about the vehicle.'),
  vehicle: z.any().describe('The vehicle object with all its details.'),
});
export type VehicleChatInput = z.infer<typeof VehicleChatInputSchema>;

const VehicleChatOutputSchema = z.object({
  answer: z.string().describe("The AI assistant's answer to the question."),
  showContactButton: z
    .boolean()
    .optional()
    .describe(
      'Set to true if the user wants to order, make an inquiry, or talk to a dealer.'
    ),
});
export type VehicleChatOutput = z.infer<typeof VehicleChatOutputSchema>;

export async function vehicleChat(
  input: VehicleChatInput
): Promise<VehicleChatOutput> {
  return vehicleChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'vehicleChatPrompt',
  input: { schema: VehicleChatInputSchema },
  output: { schema: VehicleChatOutputSchema },
  prompt: `You are a professional, friendly, and knowledgeable car dealer assistant. Your goal is to answer questions about a specific vehicle based on the provided data.

Be helpful and provide clear, concise answers. If the information is not available in the provided data, say that you don't have that information. Do not make up information.

If the user expresses intent to buy, order, make a formal inquiry, or speak directly with a dealer (using keywords like "buy", "order", "inquire", "purchase", "interested in buying"), set the 'showContactButton' field to true in your response in addition to providing a helpful text answer.

Vehicle Details:
Name: {{vehicle.name}}
Category: {{vehicle.categoryDisplayName}}
Price: Ksh {{vehicle.price}}
Year: {{vehicle.year}}
Mileage: {{vehicle.mileage}} Km
Description: {{vehicle.description}}

Specifications:
{{#each vehicle.specs}}
**{{groupName}}**
{{#each specs}}
- {{name}}: {{value}}
{{/each}}
{{/each}}

Features:
{{#each vehicle.features}}
- {{this}}
{{/each}}

User's Question:
"{{question}}"

Your Answer:
`,
});

const vehicleChatFlow = ai.defineFlow(
  {
    name: 'vehicleChatFlow',
    inputSchema: VehicleChatInputSchema,
    outputSchema: VehicleChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
