// src/ai/flows/suggest-restock.ts
'use server';

/**
 * @fileOverview A product restock suggestion AI agent.
 *
 * - suggestRestock - A function that suggests restock quantities for products.
 * - SuggestRestockInput - The input type for the suggestRestock function.
 * - SuggestRestockOutput - The return type for the suggestRestock function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRestockInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  currentStock: z.number().describe('The current stock level of the product.'),
  minimumStock: z.number().describe('The minimum stock level of the product.'),
  averageDailySales: z.number().describe('The average daily sales of the product.'),
  reorderCycleDays: z.number().describe('The reorder cycle in days.'),
});
export type SuggestRestockInput = z.infer<typeof SuggestRestockInputSchema>;

const SuggestRestockOutputSchema = z.object({
  reorderQuantity: z.number().describe('The suggested reorder quantity for the product.'),
  reasoning: z.string().describe('The reasoning behind the suggested reorder quantity.'),
});
export type SuggestRestockOutput = z.infer<typeof SuggestRestockOutputSchema>;

export async function suggestRestock(input: SuggestRestockInput): Promise<SuggestRestockOutput> {
  return suggestRestockFlow(input);
}

const suggestRestockPrompt = ai.definePrompt({
  name: 'suggestRestockPrompt',
  input: {schema: SuggestRestockInputSchema},
  output: {schema: SuggestRestockOutputSchema},
  prompt: `You are a pharmacy inventory management expert.

You will analyze the product stock levels and suggest optimal reorder quantities to avoid stockouts and minimize excess inventory.

Consider the following factors:
- Current stock level: {{{currentStock}}}
- Minimum stock level: {{{minimumStock}}}
- Average daily sales: {{{averageDailySales}}}
- Reorder cycle (in days): {{{reorderCycleDays}}}
- Product name: {{{productName}}}

Suggest a reorder quantity and explain your reasoning.
`,
});

const suggestRestockFlow = ai.defineFlow(
  {
    name: 'suggestRestockFlow',
    inputSchema: SuggestRestockInputSchema,
    outputSchema: SuggestRestockOutputSchema,
  },
  async input => {
    const {output} = await suggestRestockPrompt(input);
    return output!;
  }
);
