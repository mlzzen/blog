const path = require('path')

module.exports = {
    // 网站 Title
    title: '从零开始的人生',
    // 网站描述
    description: '阿亮的胡诌乱语',

    // 网站语言
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },

    // 使用的主题
    theme: 'lomo',
    themeConfig: {
        nav: [
            {
                text: '博客',
                link: '/'
            },
            {
                text: '标签',
                link: '/tag/'
            },
            {
                text: '关于我',
                link: '/about_me/'
            },
            {
                text: '友链',
                link: '/friends_links/'
            }
        ]
        /**
         * Ref: https://vuepress-theme-blog.ulivz.com/#footer
         */
    },
    additionalPages: [
        {
            path: '/about_me/',
            filePath: path.resolve(__dirname, '../about_me.md')
        },
        {
            path: '/friends_links/',
            filePath: path.resolve(__dirname, '../friends_links.md')
        }
    ]
}
