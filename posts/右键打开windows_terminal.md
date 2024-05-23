---
title: 把windows terminal添加到右键菜单
date: 2019-11-11 17:44:22
tags: [windows,terminal]
category: 开发工具
---

# 把windows terminal添加到右键菜单

1. 从"https://github.com/microsoft/terminal/blob/master/res/terminal.ico"下载图标(可省略)
2. 把图标放到某个文件夹内，比如"%%USERPROFILE%%\AppData\Local\terminal\"内
3. 新建.bat文件，并把下列代码拷贝进去保存
   ```
   @echo off

    reg.exe add "HKEY_CLASSES_ROOT\Directory\Background\shell\wt" /f /ve /d "Windows Terminal here"
    reg.exe add "HKEY_CLASSES_ROOT\Directory\Background\shell\wt" /f /v "Icon" /t REG_EXPAND_SZ /d "\"%%USERPROFILE%%\AppData\Local\terminal\tm.ico\""

    reg.exe add "HKEY_CLASSES_ROOT\Directory\Background\shell\wt\command" /f /ve /t REG_EXPAND_SZ /d "\"%%LOCALAPPDATA%%\Microsoft\WindowsApps\wt.exe\""

    pause
   ```
4. 以管理员运行脚本