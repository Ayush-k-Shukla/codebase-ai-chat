import { chunkCode } from './chunker/code-chunker.js';
import { indexChunks } from './embedder/indexer.js';
import { scanRepo } from './scanner/repo-scanner.js';

const repoPath = process.argv[2];

if (!repoPath) {
  console.error('Please provide repo path');
  process.exit(1);
}

const files = scanRepo(repoPath);
console.log(`Scanned ${files.length} source files`);

const chunks = await chunkCode(files);
console.log(`Chunked ${chunks.length} source files`);

await indexChunks(chunks);
console.log('Embedding done and Vector store created');

// console.log(chunks[0]);
// console.log(files[0]); // preview first
