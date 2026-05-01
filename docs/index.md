---
layout: home

hero:
  name: "U-Probe"
  text: "Agentic Probe Design Platform"
  tagline: Design spatial-omics probes with configurable workflows, AI agents, and automated quality control.
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
  - title: 🤖 AI-Guided Design
    details: Turn natural language goals into probe design workflows with LLM-based agents.
  - title: 🧬 Custom Probe Architecture
    details: Define MERFISH, seqFISH, RCA-based, or custom structures through declarative configs.
  - title: ⚡ Automated Workflow
    details: Run target extraction, construction, filtering, and report generation end to end.
  - title: 🔍 Quality Control
    details: Evaluate GC, Tm, secondary structure, off-target risk, and k-mer frequency.
  - title: 📊 Visual Reports
    details: Review interactive HTML and PDF reports for fast probe set comparison.
  - title: 🌐 Flexible Interfaces
    details: Use U-Probe through the Web UI, CLI, or Python API.
---

<script setup>
import { withBase } from 'vitepress'

const tutorialVideos = [
  {
    title: 'Workflow Overview',
    description: 'Design probes with the built-in workflow: choose genome and method, enter targets, submit tasks, and retrieve results.',
    video: '/video/worklfow.mp4',
    poster: '/video/worklfow.jpg'
  },
  {
    title: 'Custom Probe Architecture',
    description: 'Customize probe components, structure rules, and design settings for different experimental strategies.',
    video: '/video/custom.mp4',
    poster: '/video/custom.jpg'
  },
  {
    title: 'Agent-Guided Interaction',
    description: 'Describe design goals in natural language, refine requests, and use AI guidance through the workflow.',
    video: '/tutorials/tutorial-3.mp4',
    poster: '/tutorials/tutorial-3-cover.jpg'
  }
]
</script>

## Tutorial Videos

Watch three focused tutorials for the main workflow, custom probe structures, and agent interaction.

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
  background: #000;
  object-fit: contain;
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
