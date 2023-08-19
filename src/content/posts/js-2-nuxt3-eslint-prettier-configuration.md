---
title: "Nuxt3 ESLint + Prettier 配置"
description: "Nuxt3 ESLint + Prettier 配置，讓你更快開始開發！"
date: 2022-12-02T00:00:00Z
image: "/images/posts/js-2-nuxt3-eslint-prettier-configuration.jpg"
categories: ["JavaScript"]
authors: ["Morty"]
tags: ["Nuxt3", "ESLint", "Prettier"]
draft: false
---

由於 `Nuxt3` 已經是 stable 了，接下來預計會發布一系列文章包含 ESLint + Prettier、搭配 `ofetch` 封裝自己的 API、 使用 `MSW` 做 `Mock Data` 及 `Proxy` 等，讓你即刻使用 `Nuxt3` 開發出 production 等級的 `project`。

## Vue-tsc

為了讓開發時可以做 type check，需要先安裝 `vue-tsc`，另外這個 `type check` 只會在 `terminal` 顯示錯誤，要在網頁上顯示要在額外安裝 [vite-plugin-eslint](https://www.npmjs.com/package/vite-plugin-eslint)

```bash
yarn add -D vue-tsc
```

在 `nuxt.config.ts` 中 開啟 `typeCheck`

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },
});
```

## ESLint & Prettier

參考 [typescript.nuxtjs](https://typescript.nuxtjs.org/guide/lint) 及 [Nuxt ESLint Config](https://github.com/nuxt/eslint-config) 進行配置 ESLint

```bash
yarn add -D @nuxtjs/eslint-config-typescript eslint typescript vite-plugin-eslint
```

Prettier

```bash
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

依照需求新增 `.eslintrc.js`

```js
module.exports = {
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
  rules: {
    "vue/multi-word-component-names": "off",
  },
};
```

至 `nuxt.config.ts` 新增 `vite-plugin-eslint`

```ts
import eslint from "vite-plugin-eslint";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    plugins: [eslint()],
  },
});
```

另外 `plugin:prettier/recommended` 等同於以下，可以減少很多配置

````json
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off"
  }
}

依照需求新增 `.prettierrc`
```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 80
}
````

## 速寫及完整配置

```bash
yarn add -D @nuxtjs/eslint-config-typescript eslint typescript vite-plugin-eslint prettier eslint-config-prettier eslint-plugin-prettier
```

```ts
// nuxt.config.ts
import eslint from "vite-plugin-eslint";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },
  vite: {
    plugins: [eslint()],
  },
});
```

```js
// .eslintrc.js
module.exports = {
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
  rules: {
    "vue/multi-word-component-names": "off",
  },
};
```

```json
// .prettierrc (please remove this line)
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 80
}
```

## 參考 Repo

- [motea927/example-nuxt3](https://github.com/motea927/example-nuxt3/commit/ba52e33c43457024e270b318e97aff107a74ae17)

## 參考文件

- [typescript.nuxtjs](https://typescript.nuxtjs.org/guide/lint)
- [Nuxt ESLint Config](https://github.com/nuxt/eslint-config)
- [Nuxt 3 + TypeScript + ESLint + Prettier 環境建置 Ryan](https://ithelp.ithome.com.tw/articles/10293758)
- [Github Nuxt3 linting](https://github.com/nuxt/framework/discussions/2815)
