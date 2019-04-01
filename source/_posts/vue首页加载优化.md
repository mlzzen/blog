---
title: vue首页加载优化
date: 2019-04-01 23:20:53
tags: [vue, 首页, 优化]
---
> 参考自https://juejin.im/entry/5bc7ccefe51d450e543ecfac

可以使用Webpack Bundle Analyzer分析所依赖的包大小以及所生成包

## 引入CDN
在html中使用script标签引入几个比较大的公共库，然后在webpack.conf.js里面增加配置
```
externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex'
}
```

## 代码分割

## 开启gzip压缩
可以使用CompressionWebpackPlugin插件提前压缩文件

## 使用缓存
nginx默认会开启缓存，对静态文件的响应加上Etag，二次加载就会从缓存中读取。

## 使用SSR（服务端渲染）



