import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "U-Probe",
  description: "Interactive Probe Design & Genome Management Platform",
  
  base: '/uprobe-official/',

  themeConfig: {
    logo: '/uprobe.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/uprobe-official/docs/index.html', target: '_self' },
      { text: 'Launch App', link: 'https://your-uprobe-app-url.com' },
      { text: 'bioRxiv', link: 'https://biorxiv.org/' }
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