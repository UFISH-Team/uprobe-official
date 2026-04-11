import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "U-Probe",
  description: "Interactive Probe Design & Genome Management Platform",
  
  base: '/uprobe-official/',

  themeConfig: {
    logo: '/uprobe.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/docs/index' },
      { text: 'Launch App', link: 'https://dyarchical-unrecuperative-corazon.ngrok-free.dev/' },
      { text: 'bioRxiv', link: 'https://biorxiv.org/' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/docs/index' },
          { text: 'Installation', link: '/docs/installation' },
          { text: 'Quickstart', link: '/docs/quickstart' },
          { text: 'Configuration', link: '/docs/configuration' }
        ]
      },
      {
        text: 'User Guide',
        items: [
          { text: 'CLI Reference', link: '/docs/cli' },
          { text: 'Python API', link: '/docs/python_api' },
          { text: 'Examples', link: '/docs/examples' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Troubleshooting', link: '/docs/troubleshooting' },
          { text: 'FAQ', link: '/docs/faq' }
        ]
      },
      {
        text: 'Development',
        items: [
          { text: 'Contributing', link: '/docs/contributing' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/UFISH-Team/U-Probe' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} U-Probe Team`
    }
  }
})