export enum ReviewerKey {
  LLAMA_3_3_70B_VERSATILE = 'llama-3.3-70b-versatile',
  QWEN_QWEN3_32B = 'qwen/qwen3-32b',
}

export type ReviewerInitConfig = {
  model: string;
  temperature: number;
  max_completion_tokens: number;
  top_p: number;
};

export const reviewerInitConfigs: Record<ReviewerKey, ReviewerInitConfig> = {
  [ReviewerKey.LLAMA_3_3_70B_VERSATILE]: {
    model: 'llama-3.3-70b-versatile',
    temperature: 0,
    max_completion_tokens: 1024,
    top_p: 0.95,
  },
  [ReviewerKey.QWEN_QWEN3_32B]: {
    model: 'qwen/qwen3-32b',
    temperature: 0,
    max_completion_tokens: 1024,
    top_p: 0.95,
  },
};
