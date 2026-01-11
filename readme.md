# codebase-ai-chat

A small tool to chat with a local codebase using Google Gemini for embeddings and responses. It scans a repository, chunks source files, creates a local JSON vector store, and lets you ask natural language questions about the indexed code.

---

## Prerequisites

- A Google Gemini API key (set as `GEMINI_API_KEY`)

---

## Quick Setup

1. Clone the repo:

```bash
git clone https://github.com/Ayush-k-Shukla/codebase-ai-chat.git
cd codebase-ai-chat
```

2. Install dependencies:

```bash
npm install
```

3. Add your API key (create a `.env` file at project root):

```env
GEMINI_API_KEY=...
```

4. Build the project:

```bash
npm run build
```

---

## Run

- Start in production mode (run):

```bash
npm run start -- <repoPath>  # not required for CLI commands below
```

- Development (live reload with `tsx`):

```bash
npm run dev
```

---

## CLI Usage

The repository exposes a small CLI via the `ask` binary (after build).

- Index a local repository:

```bash
npm run build
ask index <repoPath>
```

- Ask a question about the indexed codebase:

```bash
ask <question>
```

- Notes:
  - `ask index <repoPath>` will scan, chunk, and embed the repo files into the local vector store.
  - `ask "<your question>"` queries the vector store for relevant chunks and returns an AI-generated answer.

## Vector Store

- The project stores embeddings in `vector-store.json` at the project root.
- If you want a fresh index, delete `vector-store.json` and re-run indexing.
