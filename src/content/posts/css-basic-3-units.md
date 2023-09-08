---
title: "CSS 基礎系列 3 - 單位"
description: "深入了解 CSS 的單位分類，包括絕對和相對單位。從常見的 px 到相對於字體大小的 em 和 rem，以及基於 viewport 的 vw 和 vh，本文詳細解釋了各單位的特性和計算方式，並提供實用的應用建議，如 RWD 設計和文字排版。"
date: 2022-12-17T00:00:00Z
image: "../../assets/images/posts/css-basic-3-units.jpg"
categories: ["CSS"]
authors: ["Morty"]
tags: ["CSS", "CSS Units"]
draft: false
---

深入了解 CSS 的單位分類，包括絕對和相對單位。從常見的 px 到相對於字體大小的 em 和 rem，以及基於 viewport 的 vw 和 vh，本文詳細解釋了各單位的特性和計算方式，並提供實用的應用建議，如 RWD 設計和文字排版。

## Absolute

最常見的 `Absolute` 單位就是 `px`，這個值也是 web 上 唯一會用到的絕對單位，其餘的絕對單位(cm, mm, Q, in, pc, pt)大多用於列印等其他用途。

## Relative

- **em**: `em` 是根據 `font-size` 進行運算，如果目前元素的 `font-size` 是 16px 的話， `line-height` 設為`1.5em` 就會是 `24px` (16*1.5)，若 `em` 已經被用來設為這個元素的 `font-size`，則他會相對於父元素去計算，以設定當前元素為 `font-size` 為 `1.5em` 為例，他會根據父元素的 `font-size` * `1.5` 去作為我們設置的值。

- **rem**: 計算上與 `em` 類似，不過差別是 `rem` 只根據 root element 的大小去作計算，通常我們在做 RWD 時，會將 `html` 的 `font-size` 依據螢幕寬度去作設置，而其他的元素用 `rem` 做切版，當畫面變動時，我們只需要去更新 `html` 的 `font-size`，其他元素就會相對更動，達到很好的 RWD 效果。

- **%**: 百分比，通常會依照父元素的相對應屬性來進行計算，如我們把 `width` 設為 `90%`，他就會根據父元素的 `width` \* 90% 進行渲染。

- **vw**: 整個 `viewport` 的寬度百分比，如 `100vw` 就是 100% `viewport`，我們常常以 100vw 來做一些全屏的操作。

- **vh**: 與 `vw` 類似，整個 `viewport` 的高度百分比。

- **ch**: 很酷的一個單位，他是根據一行幾個字進行設置，如設置 `width: 60ch;`，則寬度就是 60 個字的寬度，用來排版文字閱讀有奇效。

## 參考文件

[MDN CSS values and units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#lengths)
