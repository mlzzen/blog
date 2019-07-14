---
title: react native小知识
date: 2018-05-13 20:38:54
tags: [react-native, react, 开发工具]
---
1. 执行react-native run-android命令后，开始下载gradle文件，速度非常慢。
    <pre>解决办法：
        1. 手动使用迅雷下载，迅雷下载好后，把文件放入到一个文件夹中，最好路径不带中文。
        2. 修改 项目名\android\gradle\wrapper 下的gradle-wrapper.properties，把下 载的地址改为自己已经下好的地址。distributionUrl=file\:///D:/gradle-2.14.1-all.zip  冒号要用\转
2. 执行react-native run-android命令后，使用的vs的模拟器，连接不上模拟器。
    <pre>解决办法： 参考的 http://www.cnblogs.com/tianma3798/p/5911395.html
        1. 打开模拟器的“工具”菜单。
        2. 选项卡切换到Network。
        3. 使用命令adb connect 169.254.138.177:5555就连接上了。
        4. 重新运行命令react-native run-android。
