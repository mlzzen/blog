---
title: el-select性能问题
date: 2023-12-27 21:25:00
tags: [vue, element-ui]
categories: [前端]
---

```vue
<template>
    <div id="app">
        <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <el-input v-model="input"></el-input>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            value: '',
            input: '',
            options: [],
        };
    },
    created() {
        this.genOptions();
    },
    methods: {
        genOptions() {
            const result = [];
            for (let i = 0; i < 3000; i++) {
                result.push({
                    value: `${i}`,
                    label: `${i}`,
                });
            }
            this.options = Object.freeze(result);
        },
    },
};
</script>
```

el-select会影响页面上input输入框的输入

## 解决方案
目前使用的是显示下拉框的时候再给options赋值，其它时候，让它是个空数组。

也可以使用虚拟列表解决，但是我们项目暂时没使用这个组件，我们项目已经非常臃肿了，不想引入新的组件。