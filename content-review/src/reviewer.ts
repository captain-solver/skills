import { Groq } from 'groq-sdk';

import { type ReviewerInitConfig } from './config';

export type ReviewResult = {
  reviewer: string;
  metrics: Record<string, { score: number; description: string }>;
  summary: string;
  totalScore: number;
};

export default class Reviewer {
  private static groq: Groq;
  private reviewerInitConfig: ReviewerInitConfig;

  constructor(reviewerInitConfig: ReviewerInitConfig) {
    try {
      Reviewer.groq ??= new Groq();
    } catch (e) {
      throw new Error(
        'The GROQ_API_KEY environment variable is missing or empty; Please visit https://console.groq.com/ to obtain one and set it in the environment variable.'
      );
    }
    this.reviewerInitConfig = reviewerInitConfig;
  }

  async review(messages: Groq.Chat.ChatCompletionMessageParam[]): Promise<ReviewResult> {
    const completion = (await Reviewer.groq.chat.completions.create({
      messages,
      ...this.reviewerInitConfig,
      stream: false,
    })) as Groq.Chat.ChatCompletion;

    const raw = completion.choices[0]?.message?.content ?? '';
    const cleaned = raw
      .replace(/<think>[\s\S]*?<\/think>/gi, '')
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    let parsed: any;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      throw new Error(`Model returned invalid JSON: ${cleaned.slice(0, 120)}`);
    }

    return {
      reviewer: this.reviewerInitConfig.model,
      ...parsed,
      totalScore:
        Object.values(parsed.metrics).reduce((acc: number, curr: any) => acc + curr.score, 0) /
        Object.values(parsed.metrics).length,
    };
  }
}
