import { chunkCode } from './chunker/code-chunker.js';
import { scanRepo } from './scanner/repo-scanner.js';

const repoPath = process.argv[2];

if (!repoPath) {
  console.error('Please provide repo path');
  process.exit(1);
}

const files = scanRepo(repoPath);
const chunks = await chunkCode(files);

console.log(`Scanned ${files.length} source files`);
console.log(`Chunked ${chunks.length} source files`);

console.log(chunks[0]);
console.log(files[0]); // preview first
