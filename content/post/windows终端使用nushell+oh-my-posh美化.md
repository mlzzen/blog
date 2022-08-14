---
title: "Windows终端使用nushell+oh My Posh美化"
date: 2022-08-14T22:42:39+08:00
slug: 65d9b04c
categories: 开发工具
tags: [terminal, nushell, oh-my-posh]
---

先看效果图

![1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfad52c6272b41f28eecd429506f3d7f~tplv-k3u1fbpfcp-watermark.image?)

步骤如有错误请指出。

## 从github安装nushell
从github release下载 [Release 0.66.2 · nushell/nushell (github.com)](https://github.com/nushell/nushell/releases/tag/0.66.2)

github release下载速度可能会很慢，可以在这里下载[下载 (serctl.com)](https://d.serctl.com/)

## 在微软商店安装windows terminal

## 在微软商店安装oh-my-posh
也可以使用winget，不过需要正确的上网方式。

## 初始化oh-my-posh
```powershell
oh-my-posh init nu --print | save %USERPROFILE%\\.config\\nu\\init.nu
```
使用上面的命令会生成一个init.nu脚本

## nushell启动的时候执行init.nu
把下面添加到config.nu文件最后
```
source %USERPROFILE%\\.config\\nu\\init.nu
```

到此结束
