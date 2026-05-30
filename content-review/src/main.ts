import fs from 'fs';
import Reviewers from './reviewers';
import SYSTEM_PROMPT from './SYSTEM_PROMPT.txt';

async function promptAllReviews() {
  const filePath = process.argv[2];
  if (!filePath) {
    throw new Error('No file path provided');
  }
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const reviewers = new Reviewers();

  return reviewers.allReviews([
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: fileContent },
  ]);
}

async function main() {
  try {
    const reviewsAll = await promptAllReviews();
    console.log(JSON.stringify(reviewsAll, null, 2));
  } catch (error) {
    console.log(
      JSON.stringify({
        status: 'ERROR',
        error: error instanceof Error ? error.message : String(error),
      })
    );
  }
}

main();
