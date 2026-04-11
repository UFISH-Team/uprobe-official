# 🧬 U-Probe Official Website

[![License](https://img.shields.io/github/license/UFISH-Team/U-Probe)](https://github.com/UFISH-Team/U-Probe/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-latest-blue.svg)](https://ufish-team.github.io/uprobe-official/)

This repository contains the source code for the official website and documentation of **U-Probe**, a universal agentic probe design platform for imaging-based spatial-omics.

🌐 **Website Link:** [https://ufish-team.github.io/uprobe-official/](https://ufish-team.github.io/uprobe-official/)

## 📖 About U-Probe

U-Probe enables the design of arbitrary probe architectures via declarative configurations and executes end-to-end multi-step design pipelines guided by LLM-based AI agents. It supports both DNA and RNA FISH probe design workflows.

For the main U-Probe tool repository, please visit: [https://github.com/UFISH-Team/U-Probe](https://github.com/UFISH-Team/U-Probe)

## 🛠️ Local Development

This website is built with [VitePress](https://vitepress.dev/). To run it locally:

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn

### Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the local development server:
   ```bash
   pnpm run docs:dev
   ```

3. Build for production:
   ```bash
   pnpm run docs:build
   ```

## 📝 Contributing to Documentation

Contributions to the documentation are welcome! The documentation files are written in Markdown and located in the `docs/` and `docs/docs/` directories.

- `docs/index.md`: The landing page of the website.
- `docs/docs/`: Contains all the detailed guides (Installation, CLI, Configuration, Examples, etc.).

When updating the documentation, please ensure that your changes align with the latest U-Probe features and maintain a clear, professional tone.

## 📄 License

The documentation and website content are released under the MIT License.