'use server';

/**
 * @fileOverview Summarizes key information about government services available on the Santa Rosa city website.
 *
 * - summarizeGovernmentServices - A function that summarizes government services.
 * - SummarizeGovernmentServicesInput - The input type for the summarizeGovernmentServices function.
 * - SummarizeGovernmentServicesOutput - The return type for the summarizeGovernmentServices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeGovernmentServicesInputSchema = z.object({
  url: z.string().url().describe('The URL of the Santa Rosa city government service page to summarize.'),
});
export type SummarizeGovernmentServicesInput = z.infer<typeof SummarizeGovernmentServicesInputSchema>;

const SummarizeGovernmentServicesOutputSchema = z.object({
  summary: z.string().describe('A summary of the government services available on the page.'),
});
export type SummarizeGovernmentServicesOutput = z.infer<typeof SummarizeGovernmentServicesOutputSchema>;

export async function summarizeGovernmentServices(input: SummarizeGovernmentServicesInput): Promise<SummarizeGovernmentServicesOutput> {
  return summarizeGovernmentServicesFlow(input);
}

const summarizeGovernmentServicesPrompt = ai.definePrompt({
  name: 'summarizeGovernmentServicesPrompt',
  input: {schema: SummarizeGovernmentServicesInputSchema},
  output: {schema: SummarizeGovernmentServicesOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing the key government services described on a webpage.
  The URL of the page is: {{{url}}}
  Please provide a concise summary of the services offered and how citizens can access them.
  Focus on practical information such as application processes, eligibility criteria, and contact details.
`,
});

const summarizeGovernmentServicesFlow = ai.defineFlow(
  {
    name: 'summarizeGovernmentServicesFlow',
    inputSchema: SummarizeGovernmentServicesInputSchema,
    outputSchema: SummarizeGovernmentServicesOutputSchema,
  },
  async input => {
    const {output} = await summarizeGovernmentServicesPrompt(input);
    return output!;
  }
);
