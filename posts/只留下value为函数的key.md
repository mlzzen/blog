---
title: 只留下value为函数的key
date: 2020-09-05 19:11:00
tags: [typescript]
category: 前端
---

# 只留下value为函数的key

```typescript
type FK = {
    fn: (n: string) => {}
    na: string
}

type PickByValue<T, P> = {
    [K in
    {
        [K in keyof T]: T[K] extends P ? K : never
    }[keyof T]
    ]: T[K]
}

type Fn = PickByValue<FK, Function>
```