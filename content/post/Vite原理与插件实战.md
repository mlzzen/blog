---
title: Vite原理与插件实战
date: 2021-12-25 16:50:00
tags: [Vite]
categories: [前端, 开发工具]
---

## Vite 是什么？

Vite 是一种新型前端构建工具，能够显著提升前端开发体验。
它主要由两部分组成：

-   一个开发服务器，它基于原生 ES 模块提供了丰富的内建功能。
-   一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

## Vite 的特点

-   在开发过程中，vite 是一个开发服务器，根据浏览器的请求编译源文件。
    无需捆绑，编译后真正做到按需使用。
    未修改的文件会返回 304，所以浏览器根本就不会请求。
    这就是它启动快、保持快的原因。

-   Vite 支持热模块替换，这和 "简单的重载页面 "有本质的区别。
    Vue 组件和 CSS HMR 是开箱即用的支持，第三方框架可以利用 HMR API。

-   Vite 通过`esbuild`支持`.(t|j)sx?`文件，开箱即用，速度快得惊人。

-   Vite 支持`.css`, `.less`, `.sass`等

## Vite 在开发中如何做到按需加载？

Vite 有一个开发服务器，它根据浏览器的请求编译源文件，不会加载无关的文件。


## 来看 Vite 是如何加载运行的一段简单的 Vue3 代码

### App.vue原代码

```html
<template>
    <div>
        <h1>{{ count }} * 2 = {{ double }}</h1>
        <button @click="add">click</button>
    </div>
</template>
<script>
    import { ref, computed } from 'vue'
    export default {
        setup() {
            const count = ref(1)
            function add() { count.value++ }
            const double = computed(() => count.value * 2)
            return { count, double, add }
        },
    }
</script>
<style>h1 { color: red }</style>
```

在浏览器中打开 localhost:3000/，会返回包含处理过的 index.html 中的内容

### index原代码：

```html
<!DOCTYPE html>
<html>
    <body>
        <div id="app"></div>
        <script type="module" src="/src/main.js"></script>
    </body>
</html>
```

### Vite 处理过后返回的代码：

```html
<!DOCTYPE html>
<html>
    <body>
        <div id="app"></div>
        <script>
            window.process = { env: { NODE_ENV: 'DEV' } }
        </script>
        <script type="module" src="/src/main.js"></script>
    </body>
</html>
```

### 后台中处理 HTML 中的代码

读取 HTML 文件，在字符串中插入 script 标签，定义 process 变量

```js
if (url == '/') {
    let content = fs.readFileSync('./index.html', 'utf-8')
    content = content.replace(
        '<script',
        `
        <script>
            window.process = {env:{NODE_ENV:'DEV'}}
        </script>
        <script`,
    )
    ctx.type = 'text/html'
    ctx.body = content
}
```

### 原 main.js 代码：

html 中的 script 标签会向后台请求/src/main.js 文件

```js {1}
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')
```

### 经过 Vite 处理后，main.js 代码：

```js {1}
import { createApp } from '/@modules/vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')
```

`import { createApp } from 'vue'` 被重新成 `import { createApp } from '/@modules/vue'`了

### 去请求node_modules中的文件

接着浏览器向后台请求/@modules/vue，./App.vue, ./index.css。 后台收到/@modules/vue这样的请求，会去读取 node_modules/vue/package.json 的 module 字段，
拿到 "dist/vue.runtime.esm-bundler.js"，接着去请求这个文件

```js
if (url.startsWith('/@modules/')) {
    const prefix = path.resolve(__dirname, 'node_modules', url.replace('/@modules/', ''))
    const module = require(prefix + '/package.json').module
    const p = path.resolve(prefix, module)
    const ret = fs.readFileSync(p, 'utf-8')
    ctx.type = 'application/javascript'
    ctx.body = rewriteImport(ret)
}
```

### App.vue 原代码：

main.js 里面还 import 了 App.vue，浏览器会向后台请求/src/App.vue

```html
<template>
    <div>
        <h1>{{ count }} * 2 = {{ double }}</h1>
        <button @click="add">click</button>
    </div>
</template>

<script>
    import { ref, computed } from 'vue'
    export default {
        setup() {
            const count = ref(1)
            function add() { count.value++ }
            const double = computed(() => count.value * 2)
            return { count, double, add }
        },
    }
</script>
<style>h1 { color: red }</style>
```

### 后台处理.vue的代码：

```js
if (url.indexOf('.vue') > -1) {
    const p = path.resolve(__dirname, url.split('?')[0].slice(1))
    const { descriptor } = compilerSfc.parse(fs.readFileSync(p, 'utf-8'))
    // ?type=template
    if (!query.type) {
        ctx.type = 'application/javascript'
        ctx.body = `
            ${rewriteImport(descriptor.script.content).replace(
                'export default',
                'const __script =',
            )}
            import { render as __render } from "${url}?type=template"
            __script.render = __render
            export default __script
        `
    } else if (query.type == 'template') {
        const template = descriptor.template
        const render = compileDom.compile(template.content, { mode: 'module' }).code
        ctx.type = 'application/javascript'
        ctx.body = rewriteImport(render)
    }
}
```

### Vite 处理过的 App.vue：

```js
import { ref, computed } from '/@modules/vue'
const __script = {
    setup() {
        const count = ref(1)
        function add() {
            count.value++
        }
        const double = computed(() => count.value * 2)
        return { count, double, add }
    },
}
import { render as __render } from '/src/App.vue?type=template'
__script.render = __render
export default __script
```

这里主要是请求 template 里面的内容，发送一个/src/App.vue?type=template 请求

### 经过后台处理过的App.vue的template：

/src/App.vue?type=template 请求返回的内容：
可以看到 compileDom.compile 函数把 App.vue 的 template 编译成一个 render 函数了

```js
export function render(_ctx, _cache) {
    return (
        _openBlock(),
        _createElementBlock('div', null, [
            _createElementVNode(
                'h1',
                null,
                _toDisplayString(_ctx.count) + ' * 2 = ' + _toDisplayString(_ctx.double),
                1 /* TEXT */,
            ),
            _createElementVNode('button', { onClick: _ctx.add }, 'click', 8 /* PROPS */, [
                'onClick',
            ]),
        ])
    )
}
```

### 后台处理style的代码：

```js
if (url.endsWith('.css')) {
    const p = path.resolve(__dirname, url.slice(1))
    const file = fs.readFileSync(p, 'utf-8')
    const content = `
        const css = '${file.replace(/\n/g, '')}'
        let link = document.createElement('style')
        link.setAttribute('type','text/css')
        document.head.appendChild(link)
        link.innerHTML = css
        export default css
    `
    ctx.type = 'application/javascript'
    ctx.body = content
}
```

### ./index.css请求返回的内容：

```js
const css = 'h1 { color: red;}'
let link = document.createElement('style')
link.setAttribute('type','text/css')
document.head.appendChild(link)
link.innerHTML = css
export default css
```

因为请求/@modules/vue返回的内容中import了/@modules/@vue/runtime-dom，所以浏览器会向后台请求/@modules/@vue/runtime-dom，
直到把所有依赖请求加载完毕，然后页面才会渲染。

## 插件实战

### 插件代码：
```ts
export function filemanager(userOptions: UserOptions = {
    source: './dist',
    destination: './dist.zip',
}): PluginOption {
    const { source, destination } = userOptions;
    return {
        name: 'vite-plugin-file-manager',
        apply: 'build',
        closeBundle() {
            const output = fs.createWriteStream(destination as string)
            const archive = archiver('zip')
            output.on('close', function () {
                console.log('archiver done')
            })
            archive.on('error', function (err) {
                throw err
            })
            archive.pipe(output)
            archive.glob('**/*', {
                cwd: source,
            })
            archive.finalize()
        }
    }
}
```

### vite.config.ts中的配置：

```ts
import { defineConfig } from 'vite'
import { filemanager } from 'vite-plugin-filemanager'

export default defineConfig({
    plugins: [filemanager({
        source: './dist/',
        destination: './dist.zip',
    })],
})
```
