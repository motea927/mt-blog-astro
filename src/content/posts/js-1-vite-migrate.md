---
title: "Vue CLI 無痛轉換 Vite 紀錄"
description: "在 Vue CLI 的舊架構下，如何無痛轉換 Vite，同時保有抽換成 Webpack 5 的彈性"
date: 2022-11-26T00:00:00Z
image: "/images/posts/js-1-vite-migrate.jpg"
categories: ["JavaScript"]
authors: ["Morty"]
tags: ["Vue", "Vite", "JavaScript", "Webpack", "Rollup"]
draft: false
---

由於前陣子我們團隊遇到一個 @vue/cli-plugin-babel 的 cache 命中問題，也因此檢視了一下我們目前專案使用 vue cli + Webpack 4 似乎已經有點老舊了，因此協助團隊測試及評估升級 Vite。

由於我們團隊有上千個專案，因此希望盡量維持與原本的架構一致，一方面是萬一我們想要抽換回 Webpack 5 不必更動過多，另一方面是我們在升級舊專案時可以不更改專案程式碼直接移植，減少不必要的問題。

經過整理思考後有以下主要問題需要解決：

1. 環境變數
2. val-loader
3. Index.html 變數注入

## 環境變數

### 注入環境變數

我們團隊在 Webpack 時期已有自行封裝環境變數的 function ，且封裝的功能性非常多，但 Vite 使用 `import.meta.env` 來取得環境變數，因此首要解決問題是維持 `process.env.XXX` 在專案中的寫法。

Vite 有提供 [define](https://vitejs.dev/config/shared-options.html#define) 讓我們自行注入環境變數，因此可以借助 define 來實現這個功能。

```ts
// public env
import envObject from "XXXX";

export default defineConfig(() => {
  const define = {
    "process.env": { ...envObject },
  };

  return {
    define,
  };
});
```

### 撰寫 rollup plugin

雖然此舉已經可以在專案中取得 `process.env` ，但卻沒有 `TypeScript` 的自動提示，因此我們透過撰寫 `rollup plugin` 來自動產生型別定義檔案。

```ts
// public env
import envObject from "XXXX";

import path from "path";
import { rm, existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";

function autoGenerateProcessEnv() {
  const filepath = path.resolve("./src/process.env.d.ts");

  const getDeclaration = () => {
    const typeCodeLists = extendEnv.env.map((envKey) => {
      return `${envKey}: ${typeof process.env[envKey]};`;
    });

    if (typeCodeLists.length === 0) return "";

    const code = `declare namespace NodeJS {
  export interface ProcessEnv {
    ${typeCodeLists.join("\n    ")}
  }
}
`;
    return code;
  };

  return {
    name: "auto-generate-process-env",
    configResolved: async () => {
      const originalContent = existsSync(filepath)
        ? await readFile(filepath, "utf-8")
        : "";

      const code = getDeclaration();
      if (!code) return;

      if (code === originalContent) return;
      await writeFile(filepath, code, "utf-8");
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [autoGenerateProcessEnv()],
  };
});
```

如此一來在開發時也能獲得自動提示，增加開發體驗及品質。

## val-loader

許多開發者常常使用 `Webpack Modules` + `val-loader` 來打包一些資源，在 Vite 與 Rollup 中可以使用 [Virtual Modules](https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention) 來達成。

以下 plugin 範例有簡化過，可參考概念，值得注意的是路徑方面 `Virtual Modules` 是以 `vite.config.ts` 的所在目錄(project root)為主，而不是你的 plugin 檔案所在目錄。

```ts
const fetchData = () => {
  //  fetch data and return
  return data;
};

export default function myPlugin() {
  const virtualModuleId = "virtual:fetch-data";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "fetch-data", // required, will show up in warnings and errors
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id: string) {
      if (id !== resolvedVirtualModuleId) return null;

      // development return local data
      if (process.env.NODE_ENV !== "production") {
        return `
          import localData from './src/...';
          export const data = localData;
        `;
      }

      // production

      const data = await fetchData();
      return `
        export const data = ${JSON.stringify(data)};
      `;
    },
  };
}
```

接著將 plugin 檔案引入 vite.config.ts 並於 plugins 呼叫即可

```ts
import fetchPlugin from './src/plugin/fetch';
export default defineConfig(() => {
  return {
    plugins: [
      fetchPlugin()
    ],
  }
}
```

並於 `src/vite-env.d.ts` 進行型別的宣告

```ts
// src/vite-env.d.ts
declare module "virtual:fetch-data" {
  const data: {
    // some type
  };

  export const messages;
}
```

最後就可以在需要的地方引入了

```ts
import { data } from "virtual:fetch-data";
```

## Index.html 變數注入

為了避免更改 index.html，我們將注入的規則寫成跟原先 webpack 一樣

```ts
/**
 * Replace env variables in index.html
 * @see https://github.com/vitejs/vite/issues/3105#issuecomment-939703781
 * @see https://vitejs.dev/guide/api-plugin.html#transformindexhtml
 */
function htmlPlugin() {
  return {
    name: "html-transform",
    transformIndexHtml: {
      enforce: "pre" as const,
      transform: (html: string): string => {
        return html.replace(/<%= (.*?) %>/g, (match, envKey) => {
          const htmlEnv = {
            // some env
          };
          return htmlEnv[envKey] ?? "";
        });
      },
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [htmlPlugin()],
  };
});
```

## 結論

經過以上更動，我們幾乎可以在不更動專案程式碼時完成舊專案移植，尤其我們團隊因為 Webpack Modules 轉換上的一些困難所以一直沒有升級，也希望此文章可以幫助一些團隊更容易進行遷移升級 Vite 的測試及評估。

## 參考文件

- [Vite define](https://vitejs.dev/config/shared-options.html#define)
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- [val-loader alternative solution](https://github.com/vitejs/vite/discussions/9921)
- [Vite virtual-modules-convention](https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention)
- [Rollup Plugin Development](https://rollupjs.org/guide/en/#a-simple-example)
- [Vite transformIndexHtml](https://vitejs.dev/guide/api-plugin.html#transformindexhtml)
- [Accessing env variables from index.html](https://github.com/vitejs/vite/issues/3105)
