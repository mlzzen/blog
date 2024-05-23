---
title: 安装最新版powershell
date: 2018-08-17 20:27:31
tags: [powershell]
category: 开发工具
---

# 安装最新版powershell


## 安装最新版powershell
微软把powershell开源了很久了，最新版要在github上面下载
https://github.com/PowerShell/PowerShell/releases

## 把以admin启动最新版powershell添加进注册表
1. win+R 输入regedit打开注册表。
2. 来到路径 HKEY_CLASSES_ROOT\Directory\Background\shell 里面。
3. 右键shell新建项，取名叫“PWSHAsAdmin”，名字随便取的。
4. 给右侧的的（默认）赋值为“PWSH Admin”。
5. 在右侧新建字符串Extended，类型为REG_SZ。
6. 在右侧新建字符串HasLUAShield，类型为REG_SZ。

1. 右键点击“PWSHAsAdmin”,新建项“command”。
2. 在右侧把默认值改为pwsh -windowstyle hidden -Command "Start-Process cmd -ArgumentList '/s,/k,pushd,%V && start pwsh && exit' -Verb RunAs"



