'use server';

/**
 * @fileOverview AI companion for answering questions about Santa Rosa.
 *
 * - askRosa - A function that allows users to ask questions about Santa Rosa.
 * - AskRosaInput - The input type for the askRosa function.
 * - AskRosaOutput - The return type for the askRosa function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskRosaInputSchema = z.object({
  query: z.string().describe('The question to ask Rosa about Santa Rosa.'),
});
export type AskRosaInput = z.infer<typeof AskRosaInputSchema>;

const AskRosaOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about Santa Rosa.'),
});
export type AskRosaOutput = z.infer<typeof AskRosaOutputSchema>;

export async function askRosa(input: AskRosaInput): Promise<AskRosaOutput> {
  return askRosaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askRosaPrompt',
  input: {schema: AskRosaInputSchema},
  output: {schema: AskRosaOutputSchema},
  prompt: `You are Rosa, a helpful AI companion for the city of Santa Rosa.
  Answer the following question about Santa Rosa:
  {{{query}}}`,
});

const askRosaFlow = ai.defineFlow(
  {
    name: 'askRosaFlow',
    inputSchema: AskRosaInputSchema,
    outputSchema: AskRosaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
