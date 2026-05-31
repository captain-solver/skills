import { type GroqModelKey, groqModelInitConfigs } from './config';
import GroqModels from './groq/groq-models';
import GROQ_REVIEW_PROMPT from './prompts/GROQ_REVIEW_PROMPT.txt';

export async function getFinalReview(content: string) {
  const groqModels = new GroqModels<GroqModelKey>(groqModelInitConfigs);

  return groqModels.getFinalReview([
    { role: 'system', content: GROQ_REVIEW_PROMPT },
    { role: 'user', content },
  ]);
}
