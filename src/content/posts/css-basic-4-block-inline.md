---
title: "CSS 基礎系列 4 - Block & Inline"
description: "CSS 基礎系列文章，區塊元素以及行內元素差異"
date: 2022-12-20T00:00:00Z
image: "/images/posts/css-basic-4-block-inline.jpg"
categories: ["CSS"]
authors: ["Morty"]
tags: ["CSS", "CSS Display"]
draft: false
---

HTML 的元素主要被歸類為兩種顯示方式，一種是 `block`，一種則是 `inline`，我們可以透過 CSS 的 `display` 去更改元素的顯示方式，兩者在顯示及佈局上有著許多不停之處，以下詳細比較。

## Block Element (區塊元素)

區塊元素的特色為

1. 透過 `display: block;` 進行設置，以下由範例會選一個預設就是區塊元素的 `p` tag 進行示範。
2. 佔滿整行，也就是說一個區塊級元素會從新的一行開始，如三個 `p` tag 會分別佔滿三行。

---

<p>我是第一行</p>
<p>我是第二行</p>
<p>我是第三行</p>

```html
<p>我是第一行</p>
<p>我是第二行</p>
<p>我是第三行</p>
```

---

3. 我們也可以給予區塊級元素指定寬度，但他還是會佔滿整行，現實中常給予區塊級元素一個寬度並用 `margin: 0 auto;` 來進行水平置中。

---

<p style="width: 50px; background-color: #aaa; margin: 0 auto;">
  我是第一行
</p>

```html
<p style="width: 50px; background-color: #aaa; margin: 0 auto;">我是第一行</p>
```

---

## Inline Element (行內元素)

行內元素的特色為

1. 透過 `display: inline;` 進行設置，以下由範例會選一個預設就是行內元素的 `span` tag 進行示範。
2. 行內元素緊鄰著前後的元素

---

<span>我是第一個 span</span>
<span>我是第二個 span，我會僅跟著前面的元素喔！！</span>

```html
<span>我是第一個span</span>
<span>我是第二個span，我會僅跟著前面的元素喔！！</span>
```

---

3. 行內元素的寬度是根據他的內容決定
4. 行內元素的 `width` 及 `height` 是沒有效的

---

<span style="width: 100vw;">100vw span</span>
<span style="height: 100vh;">100vh span</span>

```html
<span style="width: 100vw;">100vw span</span>
<span style="height: 100vh;">100vh span</span>
```

---

## Inline Block Element

Inline Block 是一個特殊的存在，結合了上述兩者的一些特性，常常有一種情形是我們需要 行內元素的特性，又希望可以指定行內元素的寬高，因此 Inline Block 是非常好的一個解決方案。

1. 透過 `display: inline-block;` 進行設置。

---

<span style="width: 100%; background-color: #aaa; display: inline-block">
  100vw span
</span>

```html
<span style="width: 100%; background-color: #aaa; display: inline-block">
  100vw span
</span>
```

---

## 參考文件

- [MDN Block-level elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)
- [MDN Inline elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements)
- [MDN CSS Display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)