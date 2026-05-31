import { Groq } from 'groq-sdk';
import { type GroqModelInitConfig, type ReviewResult, GroqModel } from './groq-model';

export default class GroqModels<GroqModelKey extends string> {
  private groqModels: Map<GroqModelKey, GroqModel> = new Map();

  constructor(groqModelInitConfigs: Record<GroqModelKey, GroqModelInitConfig>) {
    Object.entries(groqModelInitConfigs).forEach(([groqModelKey, groqModelInitConfig]) => {
      this.groqModels.set(
        groqModelKey as GroqModelKey,
        new GroqModel(groqModelInitConfig as GroqModelInitConfig)
      );
    });
  }

  async getFinalReview(messages: Groq.Chat.ChatCompletionMessageParam[]): Promise<ReviewResult[]> {
    return Promise.all(
      Array.from(this.groqModels.values()).map(async (groqModel) => {
        return groqModel.getFinalReview(messages);
      })
    );
  }
}
