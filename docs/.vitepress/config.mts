import { defineConfig } from 'vitepress'

const base = process.env.VERCEL ? '/' : '/uprobe-official/';

export default defineConfig({
  title: "U-Probe",
  description: "Universal Agentic Probe Design Platform",
  head: [['link', { rel: 'icon', href: `${base}uprobe.svg` }]],

  base: base,

  themeConfig: {
    logo: { light: '/uprobe.svg', dark: '/uprobe_dark.svg' },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/docs/index' },
      { text: 'Launch App', link: 'https://app.u-probe.org/' },
      { text: 'bioRxiv', link: 'https://u-probe.org/' }
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