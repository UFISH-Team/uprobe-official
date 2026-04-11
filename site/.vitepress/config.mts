import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "U-Probe",
  description: "Interactive Probe Design & Genome Management Platform",
  
  // 如果部署在 GitHub Pages 且仓库名为 uprobe-official，请保持此配置
  base: '/uprobe-official/',

  themeConfig: {
    // 网站 Logo，您可以把 logo.svg 放在 site/public/ 目录下
    // logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      // 这里的链接指向您用 Sphinx 编译生成的 HTML 文档地址
      // 假设部署后您的 Sphinx 文档放在 /docs/ 路径下
      { text: 'Documentation', link: '/docs/index.html' },
      { text: 'Launch App', link: 'https://your-uprobe-app-url.com' },
      { text: 'bioRxiv', link: 'https://biorxiv.org/' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-github-username/uprobe-official' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} U-Probe Team`
    }
  }
})