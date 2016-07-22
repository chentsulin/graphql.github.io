---
title: Errors
layout: ../_core/DocsLayout
category: API Reference
permalink: /docs/api-reference-errors/
next: /docs/api-reference-utilities/
---

`graphql/error` module 負責建立和格式化 GraphQL 錯誤。

```js
import { ... } from 'graphql/error'; // ES6
var GraphQLError = require('graphql/error'); // CommonJS
```

## 概觀

<ul class="apiIndex">
  <li>
    <a href="#graphqlerror">
      <pre>class GraphQLError</pre>
      在 GraphQL 發生錯誤的表達形式。
    </a>
  </li>
  <li>
    <a href="#syntaxerror">
      <pre>function syntaxError</pre>
      產生一個 GraphQLError 代表一個語法錯誤。
    </a>
  </li>
  <li>
    <a href="#locatedError">
      <pre>function locatedError</pre>
      產生一個知道錯誤位置的新 GraphQLError。
    </a>
  </li>
  <li>
    <a href="#formaterror">
      <pre>function formatError</pre>
      根據 Response Format 描述的規則來格式化一個錯誤。
    </a>
  </li>
</ul>

## 錯誤

### GraphQLError

```js
class GraphQLError extends Error {
 constructor(
   message: string,
   nodes?: Array<any>,
   stack?: ?string,
   source?: Source,
   positions?: Array<number>
 )
}
```

在 GraphQL 發生錯誤的表達形式。包含在查詢的哪裡發生錯誤的資訊，有助於 debug。大部分普遍用下面的 `locatedError` 來建構。

### syntaxError

```js
function syntaxError(
  source: Source,
  position: number,
  description: string
): GraphQLError;
```

產生一個 GraphQLError 表示一個語法錯誤，包含在 source 中發生語法錯誤的位置的有用描述資訊。

### locatedError

```js
function locatedError(error: ?Error, nodes: Array<any>): GraphQLError {
```

給定一個可能是在嘗試執行一個 GraphQL 操作時拋出的任意錯誤，產生一個知道原始錯誤在文件中位置的新 GraphQLError。

### formatError

```js
function formatError(error: GraphQLError): GraphQLFormattedError

type GraphQLFormattedError = {
  message: string,
  locations: ?Array<GraphQLErrorLocation>
};

type GraphQLErrorLocation = {
  line: number,
  column: number
};
```

給定一個 GraphQLError，根據 Response Format 描述的規則與 GraphQL 規範中的 Errors 部份來格式化一個錯誤。
