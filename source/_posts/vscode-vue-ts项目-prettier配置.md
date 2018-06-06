---
title: vscode vue ts项目 prettier配置
date: 2018-05-24 23:17:37
tags: [vscode, vue, ts, prettier]
---
## 必装插件 Prettier - Code formatter

## 配置
### typescript 需要tslint和tslint-config-prettier

    yarn add -D tslint tslint-config-prettier

根目录添加tslint.json

    {
        "defaultSeverity": "warning",
        "extend": ["tslint:recommended", "tslint-config-prettier"],
        "linterOptions": {
            "exclude": ["node_modules/**"]
        },
        "rules": {
            "quotemark": [true, "single"],
            "indent": [true, "spaces", 4],
            "interface-name": false,
            "ordered-imports": false,
            "object-literal-sort-keys": false,
            "no-consecutive-blank-lines": false
        }
    }


### 样式部分需要stylint和prettier-stylelint

    yarn add -D stylelint prettier-stylelint stylelint-config-ydj

根目录添加.stylelintrc.js

    module.exports = {
        extends: [
            'stylelint-config-ydj/scss', // your stylint config
            './node_modules/prettier-stylelint/config.js'
        ],
        rules: {
            'string-quotes': 'double'
        }
    };

### prettier配置，在根目录添加.prettierrc

    {
        "eslintIntegration": true,
        "stylelintIntegration": true,
        "tabWidth": 4,
        "singleQuote": true,
        "semi": false
    }

编辑器配置里面需要加入

    // vetur configuration
    "vetur.format.defaultFormatter.html": "js-beautify-html",

    // prettier configuration
    "prettier.disableLanguages": [
        "vue"
    ],

    
参考[YDJFE的文章](https://juejin.im/post/5a791d566fb9a0634853400e)







