---
title: win10系统UWP应用自启动设置
date: 2019-03-13 21:18:41
tags: [win10, 自启动, UWP]
categories: [其它]
---
1. win+R输入“shell:appsfolder”
2. 找到“邮件”这个应用
3. 右键“邮件”并创建快捷方式，会提示无法在当前目录创建，会创建到桌面
4. win+E打开资源管理器进入到“%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup”
5. 把桌面的快捷方式放入到“启动”这个目录