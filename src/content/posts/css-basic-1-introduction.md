---
title: "CSS 基礎系列 1 - 基礎介紹"
description: "深入探討 CSS 的核心原理，從 Cascading 的三種類別到 CSS 的宣告方式，並解釋如何使用 link tag 引入外部 CSS。此系列偏向理論，旨在幫助讀者更深入理解 CSS 背後的運作機制。"
date: 2022-11-30T00:00:00Z
image: "/images/posts/css-basic-1-introduction.jpg"
categories: ["CSS"]
authors: ["Morty"]
tags: ["CSS", "Cascading", "JavaScript", "Webpack", "Rollup"]
draft: false
---

深入探討 CSS 的核心原理，從 Cascading 的三種類別到 CSS 的宣告方式，並解釋如何使用 link tag 引入外部 CSS。此系列偏向理論，旨在幫助讀者更深入理解 CSS 背後的運作機制。

## CSS

CSS 全名為 Cascading Style Sheets，主要是用來描述如何在裝置上渲染資源。

## Cascading

在瀏覽器上 Cascading (層疊、聯級) 主要有三種類別，分別是

1. **User Agent Stylesheets**: 主要是瀏覽器本身的預設 styles，樣式層級最低。
2. **User Stylesheets**: 使用者在瀏覽器上設定的 styles，會覆寫掉第一點的 `User Agent Stylesheets`。
3. **Author Stylesheets**:我們所寫的 CSS Code，層級最高。

參考文件:

- [CSS: Cascading Style Sheets
  ](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade)

## Declaration

CSS 的 Declaration (宣告)方式是 成對的 `property-value`，如 `property: value;`

參考文件:

- [CSS declarations](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#css_declarations)
- [CSS rulesets](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#css_rulesets)

## Link

使用 `link` tag 來引用外部的 CSS，共有兩個屬性

- rel: 全寫為 `relationship`，用來形容這個連結的關係，在引入 CSS 時應該永遠為 `stylesheet`
- href: CSS 的連結，可以是絕對或相對路徑

範例：

```html
<link href="/media/examples/link-element-example.css" rel="stylesheet" />
```

參考文件:

- [The External Resource Link element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)
