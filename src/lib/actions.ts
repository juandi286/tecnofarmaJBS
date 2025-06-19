// src/lib/actions.ts
'use server';
import { suggestRestock as suggestRestockFlow, type SuggestRestockInput, type SuggestRestockOutput } from '@/ai/flows/suggest-restock';

export async function getRestockSuggestion(input: SuggestRestockInput): Promise<SuggestRestockOutput> {
  try {
    // Add a small delay to simulate network latency for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    const suggestion = await suggestRestockFlow(input);
    return suggestion;
  } catch (error) {
    console.error("Error getting restock suggestion:", error);
    // It's better to throw a custom error or return a structured error response for the client to handle
    if (error instanceof Error) {
        throw new Error(`Failed to get restock suggestion: ${error.message}`);
    }
    throw new Error("An unknown error occurred while getting restock suggestion.");
  }
}
