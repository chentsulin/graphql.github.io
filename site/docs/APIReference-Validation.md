---
title: Validation
layout: ../_core/DocsLayout
category: API Reference
permalink: /docs/api-reference-validation/
next: /docs/api-reference-execution/
---

`graphql/validation` module 實踐並滿足 GraphQL 在驗證階段的結果。
```js
import { validate } from 'graphql/validation'; // ES6
var GraphQLValidator = require('graphql/validation'); // CommonJS
```

## 概觀

<ul class="apiIndex">
  <li>
    <a href="#validate">
      <pre>function validate</pre>
      驗證一個針對 AST 提供的 Schema。
    </a>
  </li>
  <li>
    <a href="#specifiedrules">
      <pre>var specifiedRules</pre>
      GraphQL 規範中描述的標準驗證規則列表。
    </a>
  </li>
</ul>

## 驗證

### validate

```js
function validate(
  schema: GraphQLSchema,
  ast: Document,
  rules?: Array<any>
): Array<GraphQLError>
```

實作「驗證」規範。

驗證是同步執行的，如果發生錯誤回傳一個陣列，如果沒有發生錯誤且 document 已驗證，回傳一個空的陣列。

可能會提供一系列特定的驗證規則。如果沒有提供驗證規則，將使用預設 GraphQL 規範所定義的規則列表。

每個驗證規則是一個 function 且回傳一個 visitor（參考 language/visitor）。Visitor 方法預期回傳一個 GraphQLErrors，或是當驗證失敗時，回傳一個 GraphQLErrors 的陣列。
Visitors 還可以提供 `visitSpreadFragments: true` 將可以改變 visitor 跳過頂層所定義的 fragments 的行為，而是拜訪那些在 spread 中遇到的每個點。

### specifiedRules

```js
var specifiedRules: Array<(context: ValidationContext): any>
```

這個設定包含由 GraphQL 定義的規範所有驗證規則
