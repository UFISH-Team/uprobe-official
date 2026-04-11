# 🧬 U-Probe: Universal Agentic Probe Design Platform

[![License](https://img.shields.io/github/license/UFISH-Team/U-Probe)](https://github.com/UFISH-Team/U-Probe/blob/main/LICENSE)
[![Python Version](https://img.shields.io/badge/python-3.8+-blue)](https://www.python.org/downloads/)

**U-Probe** is a universal and agentic probe design platform designed for imaging-based spatial-omics and various molecular biology applications (such as *in situ* hybridization, targeted sequencing, spatial transcriptomics, etc.). It provides a comprehensive automated workflow from target gene selection to final probe generation, with a special emphasis on **agentic intelligence, universal declarative architecture**, and **ease of use**.

::: info Note
U-Probe is developed and actively maintained by the UFISH Team. For the latest updates and source code, please visit our [GitHub Repository](https://github.com/UFISH-Team/U-Probe).
:::

## 🌟 Core Features & Advantages

🤖 **AI-Driven Agentic Design**
Integrates large language model (LLM)-based AI agents through a hierarchical team (Leader, Panel, and Probe agents). Users can describe experimental goals or novel probe architectures in plain language, and the agents autonomously construct configuration files, select appropriate parameters, and invoke the U-Probe engine. This bridges single-cell and spatial analyses, allowing researchers to provide scRNA-seq data directly for the agent to identify marker genes and design the corresponding probe panel.

🧬 **Universal Declarative Architecture**
U-Probe resolves the architectural fragmentation problem of existing probe design tools by using a declarative YAML configuration system combined with a directed acyclic graph (DAG)-based assembly engine. Users define probes as modular templates with named parts, enabling the design of arbitrarily complex multi-part probes (e.g., MERFISH, seqFISH, RCA-based, TDDN-FISH) without code modifications.

✨ **End-to-End Automated Workflow**
Automates the entire probe design process: from genomic target sequence extraction and probe structure assembly to final property calculation and multi-condition filtering. Supports both DNA and RNA design modes, automatically applying the most suitable evaluation criteria.

🔍 **Advanced Specificity & Off-Target Filtering**
Comprehensively evaluates probe quality, supporting the calculation of:
* **Basic Properties**: GC Content, Melting Temperature (Tm), Fold Score, Self Match
* **Secondary Structure**: Stability prediction via ViennaRNA
* **Specificity Assessment**: Seamlessly integrates Bowtie2 and Jellyfish, supporting off-target site analysis and K-mer frequency statistics based on whole-genome alignment to ensure extremely high probe specificity.
* **Post-processing**: Supports overlap removal and equal spacing for tiling designs.

📊 **Rich Visual Reporting**
Automatically generates interactive HTML reports and PDF files upon completion. Reports include detailed probe quality statistics, property distribution charts, and filtering result summaries, helping researchers intuitively evaluate and select the best probes.

🌐 **Flexible Multi-Platform Interfaces**
* **Command Line Interface (CLI)**: Fully featured command-line interface, ideal for integration into automated scripts.
* **Python API**: Clearly structured Python interface, convenient for calling in Jupyter Notebooks or other bioinformatics pipelines.
* **Web Service**: Built-in high-performance HTTP server based on FastAPI, providing a modern Web UI that supports task queues, genome management, conversational agent interface, and visual operations.

## 🚀 Quick Start

Install U-Probe using pip:

```bash
pip install uprobe
```

Run a complete probe design workflow:
```bash
uprobe run --protocol protocol.yaml --genomes genomes.yaml --output results/
```

Launch the AI assistant for interactive design:
```bash
uprobe agent
```

Start the Web server:
```bash
uprobe server --port 8000
```

For detailed installation instructions and usage examples, please refer to the [Installation Guide](./installation.md) and [Quickstart](./quickstart.md).

## 📚 Documentation Directory

### Getting Started
New to U-Probe? Start here:
* [Installation](./installation.md) - Install U-Probe on your system
* [Quickstart](./quickstart.md) - Get up and running in minutes
* [Configuration](./configuration.md) - Learn how to write configuration files

### User Guide
Learn how to use U-Probe efficiently:
* [CLI Reference](./cli.md) - Detailed instructions for the command-line tool
* [Python API](./python_api.md) - Guide for developing with the Python interface
* [Examples](./examples.md) - Probe design cases in real-world scenarios

### Reference
Detailed reference documentation:
* [Troubleshooting](./troubleshooting.md) - Common issues and solutions
* [FAQ](./faq.md) - Frequently asked questions

## 🤝 Community & Support
Contributions via Issues or Pull Requests are welcome! For more details, please refer to the [Contributing Guide](./contributing.md).

## 📄 License
U-Probe is released under the MIT License. For more details, please see the [LICENSE](https://github.com/UFISH-Team/U-Probe/blob/main/LICENSE) file.