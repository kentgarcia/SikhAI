'use server';
/**
 * @fileOverview A tutorial generation AI agent.
 *
 * - generateTutorial - A function that generates a tutorial.
 * - GenerateTutorialInput - The input type for the generateTutorial function.
 * - GenerateTutorialOutput - The return type for the generateTutorial function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTutorialInputSchema = z.object({
  topic: z
    .string()
    .describe('The topic of the tutorial, for example, applying for a permit.'),
});
export type GenerateTutorialInput = z.infer<typeof GenerateTutorialInputSchema>;

const GenerateTutorialOutputSchema = z.object({
  steps: z.array(
    z.object({
      stepNumber: z.number().describe('The step number in the tutorial.'),
      description: z.string().describe('The description of the step.'),
    })
  ).describe('The steps in the tutorial.'),
});
export type GenerateTutorialOutput = z.infer<typeof GenerateTutorialOutputSchema>;

export async function generateTutorial(input: GenerateTutorialInput): Promise<GenerateTutorialOutput> {
  return generateTutorialFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTutorialPrompt',
  input: {schema: GenerateTutorialInputSchema},
  output: {schema: GenerateTutorialOutputSchema},
  prompt: `You are an expert at creating simple tutorials for non-technical people.

  Create a numbered list of steps to accomplish the following task:

  {{topic}}

  The steps should be as simple as possible, and assume the user has no prior knowledge.
  Respond with the steps as an array of JSON objects.
  `,
});

const generateTutorialFlow = ai.defineFlow(
  {
    name: 'generateTutorialFlow',
    inputSchema: GenerateTutorialInputSchema,
    outputSchema: GenerateTutorialOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
