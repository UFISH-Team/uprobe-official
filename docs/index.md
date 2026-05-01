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

<script setup>
import { withBase } from 'vitepress'

const tutorialVideos = [
  {
    title: 'Workflow Overview',
    description: 'This tutorial demonstrates how to design probes in U-Probe using the Design Workflow and a built-in probe type. It covers genome selection, method selection, target input, post-processing, task submission, and result retrieval.',
    video: '/video/worklfow.mp4',
    poster: '/video/worklfow.jpg'
  },
  {
    title: 'AI-Assisted Marker Selection',
    description: 'Learn how the agentic workflow interprets your request and prepares marker genes for design.',
    video: '/tutorials/tutorial-2.mp4',
    poster: '/tutorials/tutorial-2-cover.jpg'
  },
  {
    title: 'Review Reports and Export Results',
    description: 'Understand the visual reports, quality metrics, and export options after a design run.',
    video: '/tutorials/tutorial-3.mp4',
    poster: '/tutorials/tutorial-3-cover.jpg'
  }
]
</script>

## Learn U-Probe in Minutes

Explore the core workflow through three short tutorials.

<div class="tutorial-grid">
  <article v-for="tutorial in tutorialVideos" :key="tutorial.title" class="tutorial-card">
    <video
      class="tutorial-video"
      controls
      preload="metadata"
      :poster="withBase(tutorial.poster)"
    >
      <source :src="withBase(tutorial.video)" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="tutorial-content">
      <h3>{{ tutorial.title }}</h3>
      <p>{{ tutorial.description }}</p>
    </div>
  </article>
</div>

<style scoped>
.tutorial-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin: 32px 0;
}

.tutorial-card {
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 12px 32px rgb(0 0 0 / 8%);
}

.tutorial-video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, var(--vp-c-bg-soft), var(--vp-c-bg-alt));
  object-fit: cover;
}

.tutorial-content {
  padding: 18px 20px 22px;
}

.tutorial-content h3 {
  margin: 0 0 8px;
  font-size: 18px;
  line-height: 1.35;
}

.tutorial-content p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.65;
}

@media (max-width: 960px) {
  .tutorial-grid {
    grid-template-columns: 1fr;
  }
}
</style>
