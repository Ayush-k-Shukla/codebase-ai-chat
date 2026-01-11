import { chunkCode } from './chunker/code-chunker.js';
import { answerQuestion } from './qa/ai-answer.js';
import { scanRepo } from './scanner/repo-scanner.js';
import { searchSimilarChunks } from './vector/search.js';

const repoPath = process.argv[2];
const question = process.argv[3];

if (!repoPath) {
  console.error('Please provide repo path');
  process.exit(1);
}

const files = scanRepo(repoPath);
console.log(`Scanned ${files.length} source files`);

const chunks = await chunkCode(files);
console.log(`Chunked ${chunks.length} source files`);

// running only once when file changes or inital run
// await indexChunks(chunks);
// console.log('Embedding done and Vector store created');

if (question) {
  const relevantChunks = await searchSimilarChunks(question, 2);
  console.log('Top matches:', relevantChunks.length);

  relevantChunks.map((r) => console.log(r.content));

  const answer = await answerQuestion(question, relevantChunks);
  console.log('\n🧠 Answer:\n');
  console.log(answer);
}
