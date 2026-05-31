import { Groq } from 'groq-sdk';

export type GroqModelInitConfig = {
  model: string;
  temperature: number;
  max_completion_tokens: number;
  top_p: number;
};

export type ReviewResult = {
  reviewer: string;
  metrics: Record<string, { score: number; description: string }>;
  summary: string;
  totalScore: number;
};

export class GroqModel {
  private static groqClient: Groq;
  private groqModelInitConfig: GroqModelInitConfig;

  constructor(groqModelInitConfig: GroqModelInitConfig) {
    try {
      GroqModel.groqClient ??= new Groq();
    } catch (e) {
      throw new Error(
        'The GROQ_API_KEY environment variable is missing or empty; Please visit https://console.groq.com/ to obtain one and set it in the environment variable.'
      );
    }
    this.groqModelInitConfig = groqModelInitConfig;
  }

  async getFinalReview(messages: Groq.Chat.ChatCompletionMessageParam[]): Promise<ReviewResult> {
    const completion = (await GroqModel.groqClient.chat.completions.create({
      messages,
      ...this.groqModelInitConfig,
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
      reviewer: this.groqModelInitConfig.model,
      ...parsed,
      totalScore:
        Object.values(parsed.metrics).reduce((acc: number, curr: any) => acc + curr.score, 0) /
        Object.values(parsed.metrics).length,
    };
  }
}
