---
title: "在 Nuxt3 中透過 Module 及 Plugin 更方便的使用 gtag 吧"
description: "本文詳細指導如何在 Nuxt3 中自行撰寫 Module 以整合 Google gtag 功能。從引入 gtag script 到利用 Plugin 注入 gtag 方法，並提供了完整的程式碼範例和相關設定。讓您能夠在 Nuxt3 專案中輕鬆使用 Google gtag 進行數據追踪。"
date: 2022-12-17T00:00:00Z
image: "/images/posts/js-3-nuxt3-gtag.jpg"
categories: ["JavaScript"]
authors: ["Morty"]
tags: ["Nuxt3", "Module", "Plugin", "gtag.js"]
draft: false
---

本文詳細指導如何在 Nuxt3 中自行撰寫 Module 以整合 Google gtag 功能。從引入 gtag script 到利用 Plugin 注入 gtag 方法，並提供了完整的程式碼範例和相關設定。讓您能夠在 Nuxt3 專案中輕鬆使用 Google gtag 進行數據追踪。

在 Nuxt2 中有相關的 Module [google-gtag-module
](https://github.com/nuxt-community/google-gtag-module) 可以使用，但看起來在 Nuxt3 並未打算更新，因此我們可以參考源碼在 Nuxt3 中自行撰寫 Module 達成。

## Step 1. 利用 Nuxt Module 引入 gtag script

我們可以參考 [Module Anatomy](https://nuxt.com/docs/guide/going-further/modules#module-anatomy) 撰寫將 `gtag` script 引入 head 並放置於最前方，並看 GAID 要用什麼方式引入(範例中是用 [runtimeConfig](https://nuxt.com/docs/migration/runtime-config#runtime-config))。

```ts
// nuxt.config.ts:
export default defineNuxtConfig({
  modules: [
    (_inlineOptions, nuxt) => {
      const { GA_ID = "" } = nuxt.options.runtimeConfig.public;
      nuxt.options.app.head.script = nuxt.options.app.head.script || [];
      nuxt.options.app.head.script.unshift({
        src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
        async: true,
      });
    },
  ],
});
```

## Step 2. 利用 Plugin 注入 `gtag` method

我們可以新增一個 `plugins/gtag.client.ts` 檔案，利用 `plugin` 的 `provide` 注入 gtag 方法，同時也在 `router` 更新時自動送出相關事件。

```ts
// plugins/gtag.client.ts
export default defineNuxtPlugin(({ provide }) => {
  const { GA_ID } = useRuntimeConfig().public;
  if (process.env.NODE_ENV !== "production") {
    provide("gtag", () => {});
    return;
  }

  window.dataLayer = window.dataLayer || [];

  function gtag(..._args: any) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  }

  provide("gtag", gtag);
  gtag("js", new Date());
  gtag("config", GA_ID, JSON.stringify({}, null, 2));

  useRouter().afterEach((to) => {
    gtag("config", GA_ID, {
      page_path: to.fullPath,
      location_path: window.location.origin + to.fullPath,
    });
  });
});
```

要注意的一點是 `window.dataLayer` 會報錯，因此我們要聲明 global type

```ts
// global.d.ts
export {};

declare global {
  interface Window {
    dataLayer: any[];
  }
}
```

## 在你的專案中盡情使用吧

接著我們就可以在 Nuxt 專案中像原本的方式去使用

```vue
<script setup lang="ts">
// gtag usage
const { $gtag } = useNuxtApp();
onMounted(() => {
  $gtag("event", "login", { method: "Google" });
});
</script>
```

## 參考 Repo

- [motea927/example-nuxt3](https://github.com/motea927/example-nuxt3/commit/32cbcf44a635c3a5628d6aace99ca134a1a7603a)

## 參考文件

- [Nuxt2 google-gtag-module
  ](https://github.com/nuxt-community/google-gtag-module)
- [Module Anatomy](https://nuxt.com/docs/guide/going-further/modules#module-anatomy)
- [runtimeConfig](https://nuxt.com/docs/migration/runtime-config#runtime-config)
- [plugins-directory](https://nuxt.com/docs/guide/directory-structure/plugins#plugins-directory)
