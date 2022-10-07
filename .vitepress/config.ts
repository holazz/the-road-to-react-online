import { defineConfig } from 'vitepress'
import { codeBlockPlugin } from './plugins/codeBlock'
import { imageLinkPlugin } from './plugins/imageLink'
import sidebar from './sidebar.json'

export default defineConfig({
  title: 'The road to React',
  lastUpdated: true,
  cleanUrls: 'without-subfolders',
  markdown: {
    theme: {
      light: 'dark-plus',
      dark: 'dark-plus',
    },
    config: (md) => {
      md.use(codeBlockPlugin)
      md.use(imageLinkPlugin)
    },
  },
  themeConfig: {
    sidebar: [
      {
        items: sidebar,
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/holazz/the-road-to-react-online',
      },
    ],
  },
})
