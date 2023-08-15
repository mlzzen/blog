import { defineConfig } from 'vitepress'
import { getPosts } from './theme/serverUtils'

//每页的文章数量
const pageSize = 10

export default defineConfig({
    title: 'Liang\'s Blog',
    base: '/',
    cacheDir: './node_modules/vitepress_cache',
    description: 'vitepress,blog,blog-theme',
    ignoreDeadLinks: true,
    appearance: 'light',
    themeConfig: {
        posts: await getPosts(pageSize),
        website: 'https://github.com/mlzzen', //copyright link
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Archives', link: '/pages/archives' },
            { text: 'Tags', link: '/pages/tags' },
            { text: 'About', link: '/pages/about' }
            // { text: 'Airene', link: 'http://airene.net' }  -- External link test
        ],
        search: {
            provider: 'local',
        },
        //outline:[2,3],
        outlineTitle: '文章摘要',
        socialLinks: [{ icon: 'github', link: 'https://github.com/mlzzen' }]
    },
    srcExclude: ['README.md'], // exclude the README.md , needn't to compiler

    vite: {
        //build: { minify: false }
        server: { port: 5000 }
    }
    /*
      optimizeDeps: {
          keepNames: true
      }
      */
})
