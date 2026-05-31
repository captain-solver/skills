import fs from 'fs';
import { getFinalReview } from './lib';

async function main() {
  try {
    const filePath = process.argv[2];
    if (!filePath) {
      throw new Error('No file path provided');
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const reviewsAll = await getFinalReview(fileContent);

    console.log(JSON.stringify(reviewsAll, null, 2));
  } catch (error) {
    console.error(
      JSON.stringify({
        status: 'ERROR',
        error: error instanceof Error ? error.message : String(error),
      })
    );
  }
}

main();
