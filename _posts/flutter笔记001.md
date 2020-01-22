---
title: flutter笔记001
date: 2019-08-04 22:03:00
tags: [flutter]
---

## 程序的入口

首先导入`package:flutter/material.dart`，然后在main方法里面调用flutter自带的`runApp`方法，鼠标放到`runApp`上面可以看到这是`package:flutter/src/widgets/binding.dart`里面的一个方法，整个APP的入口就是这里了。

然后调用`MaterialApp`方法，里面传入一个home: widget就能生成一个app了。

## Scaffold

`Scaffold`是flutter定义好的一个框架，包含顶栏，中间内容部分，底栏等。

### AppBar

`AppBar`是`Scaffold`定义好的顶栏，包含标题，`actions`等一些项。title配置标题，`actions`可以传入一些其它的`widget`。

### BottomNavigationBar

`BottomNavigationBar`是`Scaffold`定义好的底栏，包含当`currentIndex`，`items`，`onTap`等一些项。`currentIndex`一般传一个`state`，方便动态变化；`onTap`是切换tap时候的回调函数；`items`是定义底栏的图标，标题等内容。




