import { Groq } from 'groq-sdk';
import { type ReviewerKey, reviewerInitConfigs } from './config';
import Reviewer, { type ReviewResult } from './reviewer';

export default class Reviewers {
  private reviewers: Map<ReviewerKey, Reviewer> = new Map();

  constructor() {
    Object.entries(reviewerInitConfigs).forEach(([reviewerKey, reviewerInitConfig]) => {
      this.reviewers.set(reviewerKey as ReviewerKey, new Reviewer(reviewerInitConfig));
    });
  }

  async allReviews(messages: Groq.Chat.ChatCompletionMessageParam[]): Promise<ReviewResult[]> {
    return Promise.all(
      Array.from(this.reviewers.values()).map(async (reviewer) => {
        return reviewer.review(messages);
      })
    );
  }
}
