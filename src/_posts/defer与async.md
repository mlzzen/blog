---
title: defer与async
date: 2019-03-30 22:53:52
tags: [html, defer, async]
---

1. defer延迟脚本并不一定会按照顺序执行，也不一定会在DOMContentLoaded事件触发前执行，因此最好只包含一个defer延迟的脚本。defer属性只适用于外部脚本文件。
2. script标签的async属性目的是不让页面等待两个脚本下载和执行，从而异步加载页面其他内容，建议异步脚本不要在加载期间修改DOM。异步脚本一定会在页面的load事件前执行，但可能会在DOMContentLoaded事件触发之前或之后执行。
3. defer与async不同：defer要页面解析完了，才执行defer的脚本，而async是按顺序加载，只是不等待。