---
layout: home

hero:
  name: "U-Probe"
  text: "Universal Agentic Probe Design Platform"
  tagline: A universal agentic probe design platform for imaging-based spatial-omics. Design arbitrary probe architectures via declarative configurations and execute end-to-end multi-step design pipelines guided by LLM-based AI agents.
  actions:
    - theme: brand
      text: Read Docs
      link: /docs/index
    - theme: alt
      text: Launch App
      link: https://app.u-probe.org/
    - theme: alt
      text: bioRxiv (Preprint)
      link: https://www.biorxiv.org/content/10.64898/2026.04.12.717982v1

features:
  - title: 🤖 AI-Driven Agentic Design
    details: A hierarchical team of LLM-based agents interprets natural language requests, analyzes scRNA-seq data to select marker genes, and autonomously constructs configurations, significantly lowering the expertise barrier.
  - title: 🧬 Universal Declarative Architecture
    details: A DAG-based assembly engine and declarative YAML configuration system resolve architectural fragmentation, enabling the design of arbitrary probe structures (e.g., MERFISH, seqFISH, RCA-based) without code modifications.
  - title: ⚡ End-to-End Automated Workflows
    details: Provides a complete automated design pipeline from target sequence extraction, probe construction, property calculation to off-target filtering, supporting both DNA and RNA modes.
  - title: 🔍 Advanced Specificity & Quality Filtering
    details: Computes GC, Tm, secondary structure stability (ViennaRNA), off-target mapping (Bowtie2), and k-mer frequency (Jellyfish). Supports overlap removal and equal spacing for tiling designs.
  - title: 📊 Rich Visual Reports
    details: Automatically generates interactive HTML reports and PDF files containing detailed statistics and visual charts, helping you quickly evaluate and select the best probes.
  - title: 🌐 Flexible Multi-Platform Interfaces
    details: Provides an easy-to-use Command Line Interface (CLI), Python API, and a modern Web UI based on FastAPI to meet usage requirements across different scenarios.
---
