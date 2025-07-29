'use server';

/**
 * @fileOverview Provides personalized safety tips and alerts based on user location and preferences.
 *
 * - getPersonalizedTipsAndAlerts - A function that retrieves personalized tips and alerts.
 * - PersonalizedTipsAndAlertsInput - The input type for the getPersonalizedTipsAndAlerts function.
 * - PersonalizedTipsAndAlertsOutput - The return type for the getPersonalizedTipsAndAlerts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTipsAndAlertsInputSchema = z.object({
  location: z
    .string()
    .describe('The current location of the user (e.g., street address, landmark).'),
  preferences: z
    .string()
    .describe(
      'User preferences for types of alerts (e.g., traffic, crime, weather).' + ' Format as a comma separated string'
    ),
});
export type PersonalizedTipsAndAlertsInput = z.infer<
  typeof PersonalizedTipsAndAlertsInputSchema
>;

const PersonalizedTipsAndAlertsOutputSchema = z.object({
  safetyTips: z
    .array(z.string())
    .describe('A list of personalized safety tips based on location and preferences.'),
  alerts: z
    .array(z.string())
    .describe('A list of relevant alerts based on location and preferences.'),
});
export type PersonalizedTipsAndAlertsOutput = z.infer<
  typeof PersonalizedTipsAndAlertsOutputSchema
>;

export async function getPersonalizedTipsAndAlerts(
  input: PersonalizedTipsAndAlertsInput
): Promise<PersonalizedTipsAndAlertsOutput> {
  return personalizedTipsAndAlertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedTipsAndAlertsPrompt',
  input: {schema: PersonalizedTipsAndAlertsInputSchema},
  output: {schema: PersonalizedTipsAndAlertsOutputSchema},
  prompt: `You are Rosa, a helpful AI assistant for the city of Santa Rosa.  A user is at the following location: {{{location}}}.\nTheir alert preferences are: {{{preferences}}}.\n\nProvide a list of safety tips and alerts that are relevant to the user's current location and preferences. Format the output as a JSON object with 'safetyTips' and 'alerts' keys.  Each key should have a list of strings.  Each tip and alert should be concise and informative.\n`,
});

const personalizedTipsAndAlertsFlow = ai.defineFlow(
  {
    name: 'personalizedTipsAndAlertsFlow',
    inputSchema: PersonalizedTipsAndAlertsInputSchema,
    outputSchema: PersonalizedTipsAndAlertsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
