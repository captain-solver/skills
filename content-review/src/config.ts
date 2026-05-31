import { GroqModelInitConfig } from './groq/groq-model';

export enum GroqModelKey {
  LLAMA_3_3_70B_VERSATILE = 'llama-3.3-70b-versatile',
  QWEN_QWEN3_32B = 'qwen/qwen3-32b',
}

export const groqModelInitConfigs: Record<GroqModelKey, GroqModelInitConfig> = {
  [GroqModelKey.LLAMA_3_3_70B_VERSATILE]: {
    model: GroqModelKey.LLAMA_3_3_70B_VERSATILE,
    temperature: 0,
    max_completion_tokens: 1024,
    top_p: 0.95,
  },
  [GroqModelKey.QWEN_QWEN3_32B]: {
    model: GroqModelKey.LLAMA_3_3_70B_VERSATILE,
    temperature: 0,
    max_completion_tokens: 1024,
    top_p: 0.95,
  },
};
