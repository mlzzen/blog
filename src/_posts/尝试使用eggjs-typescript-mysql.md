---
title: eggjs+typescript+mysql
date: 2018-06-13 17:44:52
tags: [eggjs, typescript, mysql, nodejs]
---

## 安装egg命令行工具
```
npm i egg-init -g
```
## 使用命令行工具新建项目
```
egg-init 项目名称
选择项目的类型为typescript
```
## 安装mysql的插件
```
yarn add egg-mysql
```
## 插件的配置
```
// config/plugin.ts
const plugin: EggPlugin = {
    static: true,
    nunjucks: {
        enable: true,
        package: 'egg-view-nunjucks'
    },
    mysql: {
        enable: true,
        package: 'egg-mysql'
    }
}

// config/config.local.ts
export default () => {
    const config: DefaultConfig = {
        mysql: {
            // 单数据库信息配置
            client: {
                // host
                host: '127.0.0.1',
                // 端口号
                port: '3306',
                // 用户名
                user: 'creanme',
                // 密码
                password: 'pwd123',
                // 数据库名
                database: 'test'
            },
            // 是否加载到 app 上，默认开启
            app: true,
            // 是否加载到 agent 上，默认关闭
            agent: false
        }
    }
    return config
}
```
## 未完待续


