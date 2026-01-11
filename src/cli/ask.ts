#!/usr/bin/env node

import { Command } from 'commander';
import { askQuestion, indexRepo } from '../index.js';
const program = new Command();

program
  .name('ask')
  .description('Chat with your codebase using Gemini')
  .version('1.0.0');

program
  .command('index')
  .argument('<repoPath>', 'Path to local repo')
  .description('Index a repo')
  .action(async (repoPath) => {
    console.log('Indexing repo...');
    await indexRepo(repoPath);
    console.log('Indexing complete');
  });

program
  .argument('<question>')
  .description('Ask a question about the indexed codebase')
  .action(async (question) => {
    console.log('Thinking...\n');
    const answer = await askQuestion(question);
    console.log(answer);
  });

program.parse();
