---
title: graphql/validation
layout: ../_core/GraphQLJSLayout
category: API Reference
permalink: /graphql-js/validation/
sublinks: specifiedRules,validate
---

<<<<<<< HEAD:site/docs/APIReference-Validation.md
`graphql/validation` module 實踐滿足一個 GraphQL 結果的驗證階段。
=======
The `graphql/validation` module fulfills the Validation phase of fulfilling a
GraphQL result. You can import either from the `graphql/validation` module, or from the root `graphql` module. For example:
>>>>>>> upsteam/source:site/graphql-js/APIReference-Validation.md

```js
import { validate } from 'graphql/validation'; // ES6
var { validate } = require('graphql/validation'); // CommonJS
```

## 概觀

<ul class="apiIndex">
  <li>
    <a href="#validate">
      <pre>function validate</pre>
      針對提供的 Schema 驗證一個 AST。
    </a>
  </li>
  <li>
    <a href="#specifiedrules">
      <pre>var specifiedRules</pre>
      在 GraphQL 規範中所描述的標準驗證規則列表。
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

實作規範中的「驗證」章節。

驗證是同步執行的，回傳一個發生的錯誤組成的陣列，或是如果沒有錯誤且 document 是有效的的話，回傳一個空陣列。

可以提供一個特定驗證規則的列表。如果沒有提供，將會使用 GraphQL 規範所定義的預設規則列表。

每個驗證規則都是一個回傳 visitor（參考 language/visitor）的 function。當驗證失敗時，Visitor 方法預期會回傳 GraphQLErrors，或是 GraphQLErrors 的陣列。

Visitors 也可以提供 `visitSpreadFragments: true`，它將改變 visitor 的行為以跳過頂層所定義的 fragment，取而代之訪問那些在遇到 spread 的每個點的 fragment。

### specifiedRules

```js
var specifiedRules: Array<(context: ValidationContext): any>
```

這個組合包含由 GraphQL 規範所定義的所有驗證規則
