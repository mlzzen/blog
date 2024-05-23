---
title: yarn global安装的包在windows下无法运行
date: 2019-03-24 22:10:26
tags: [yarn]
category: 前端
---

# yarn global安装的包在windows下无法运行

## 起因
大概在2019年1月的时候，就遇到了使用yarn global安装包后运行报错的问题，看了一下大概是powershell相关的错误提示。然后去github上面看yarn的源码，yarn使用了cmd-shim来生成脚本，其中生成的powershell脚本有些问题，造成了此次yarn global安装包的问题。yarn的issues也有相关的bug反馈。

## 解决
这段时间一直没有关注这件事，暂时使用npm的全局包代替。今天偶然间用yarn global安装了一个包然后又遇到了这个问题，然后再去yarn的issues看，最新的1.15.2版本已经修复了这个问题。然后我赶紧安装了最新的yarn，并使用yarn global upgrade升级所有全局安装的包，然后就正常了。