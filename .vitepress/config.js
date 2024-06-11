import { defineConfig } from 'vitepress'
import { getPosts } from './theme/serverUtils'

//每页的文章数量
const pageSize = 10

export default defineConfig({
    title: 'Liang\'s Blog',
    base: '/blog/',
    cacheDir: './node_modules/vitepress_cache',
    description: 'vitepress,blog,blog-theme',
    ignoreDeadLinks: true,
    appearance: 'light',
    themeConfig: {
        posts: await getPosts(pageSize),
        website: 'https://github.com/mlzzen',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Category', link: '/pages/category' },
            { text: 'Archives', link: '/pages/archives' },
            { text: 'Tags', link: '/pages/tags' },
            { text: 'About', link: '/pages/about' }
        ],
        search: {
            provider: 'local',
        },
        outlineTitle: '文章摘要',
        socialLinks: [{ icon: 'github', link: 'https://github.com/mlzzen' }]
    },
    srcExclude: ['README.md'],

    vite: {
        server: { port: 5000 }
    }
})
