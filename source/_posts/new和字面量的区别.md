---
title: new和字面量的区别
date: 2019-03-15 21:48:48
tags:

---

在调用new的过程会发生4件事情：

1. 新生成一个对象
2. 链接到原型
3. 绑定this
4. 返回新对象

试着自己实现一个new

```js
function create() {
    let obj = {};
    let Con = [].shift.call(arguments);
    obj.__proto__ = Con.apply(obj, arguments);
    let result = Con.apply(obj, arguments);
    return result instanceof Object ? result : obj;
}
```

对于对象来说，其实都是通过new产生的，无论是function Foo()还是let a = {}。

对于创建一个对象来说，更推荐实用字面量的方式创建对象，无论是性能上，还是可读性上。因为使用new Object()的方式创建对象需要通过作用域链一层层找到Object，但是字面量方式没有这个问题。

function Foo(){} function就是个语法糖，内部等同于new Function()；let a = {a:1}这个字面量内部也是使用了new Object()。