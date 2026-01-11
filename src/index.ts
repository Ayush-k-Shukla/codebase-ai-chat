import { chunkCode } from './chunker/code-chunker.js';
import { indexChunks } from './embedder/indexer.js';
import { answerQuestion } from './qa/ai-answer.js';
import { scanRepo } from './scanner/repo-scanner.js';
import { searchSimilarChunks } from './vector/search.js';

const repoPath = process.argv[2];
const question = process.argv[3];

if (!repoPath) {
  console.error('Please provide repo path');
  process.exit(1);
}

export const indexRepo = async (repoPath: string) => {
  const files = scanRepo(repoPath);
  const chunks = await chunkCode(files);
  await indexChunks(chunks);
};

export const askQuestion = async (question: string) => {
  const relevantChunks = await searchSimilarChunks(question); // default topK: 5
  return answerQuestion(question, relevantChunks);
};
