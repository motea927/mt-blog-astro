---
title: "CSS 基礎系列 2 - CSS 選擇器"
description: "CSS 基礎系列文章， CSS 選擇器介紹"
date: 2022-11-30T00:00:00Z
image: "/images/posts/css-basic-2-selectors.jpg"
categories: ["CSS"]
authors: ["Morty"]
tags: ["CSS", "CSS Selector"]
draft: false
---

## Basic Selector Type 基本選擇器

### Type selector (標籤)

使用 element 的 node name 來選擇所有的 html element，例如 `p` 可以選擇所有 `<p></p>` 的 element。

### Class selector (類別)

使用 class 來選擇所有的符合的 element，在類別選擇器中需要加上 `.` 的前綴，如 `.card` 就會選擇所有 `class="card"` 的 element。

### ID selector

使用 id 來選擇所有的符合的 element，在 id 選擇器中需要加上 `#` 的前綴，如 `#app` 就會選擇 `id="app"` 的 element，而通常 `id` 是獨一無二的。

### Attribute selector (屬性)

選取屬性符合的 element，在 Attribute 選擇器中需要用 `[]` 包覆起來，如 `[type="submit"]` 就會選擇屬性中 `type="submit"` 的元素，另外這個選擇器有很多進階的用法，如用超連結的前綴判斷，更多可以參考 [MDN Attribute](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)。

## Combinator 組合選擇器

### Descendant combinator (後代)

使用空格來選擇後代，如 `div p` 就會選擇所有 `<div>` 內的 `<p>`。

```html
<div>
  <!-- 所有p都會被選到 -->
  <p>Descendant</p>
  <div>
    <p>Descendant</p>
  </div>
</div>
```

### Child combinator (子)

使用 `>` 來選擇子元素，如 `div > p` 只會選擇第一層(子元素)而不是所有後代。

```html
<div>
  <!-- Child 會選到 -->
  <p>Child</p>
  <div>
    <!-- 這個不是 Child -->
    <p>Descendant</p>
  </div>
</div>
```

### Sibling combinator (兄弟)

使用 `~` 來選擇兄弟，如 `p ~ span`，兄弟不一定要緊鄰，只要同一層即可。

```html
<!-- 這個不會選到 -->
<span>This is not select</span>
<p>some text</p>
<!-- 會選到這個 span -->
<span>sibling</span>
<br />
<div>something</div>
<!-- 會選到這個 span -->
<span>sibling</span>
```

### Adjacent sibling combinator (緊鄰兄弟)

使用 `+` 來選擇緊鄰的兄弟， 如 `p + span`，就會選擇緊靠著 `p` 後的 `span`， [Tailwind CSS](https://tailwindcss.com/docs/divide-width#add-borders-between-stacked-children) 的 Divider 就是使用 `* + *` 來達成的。

### Column Combinator

`Column combinator` 比較特殊，通常用來選擇表格的同一列，因為還在 [Experimental](https://developer.mozilla.org/en-US/docs/Web/CSS/Column_combinator) 階段，要謹慎使用。

## 參考文件

[MDN CSS Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
