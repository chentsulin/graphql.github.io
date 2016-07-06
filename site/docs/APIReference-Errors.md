---
title: Errors
layout: ../_core/DocsLayout
category: API Reference
permalink: /docs/api-reference-errors/
next: /docs/api-reference-utilities/
---

`graphql/error` module 是負責建立和格式化 GraphQL 錯誤。

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
      產生一個 GraphQLError 表示語法的錯誤。
    </a>
  </li>
  <li>
    <a href="#locatedError">
      <pre>function locatedError</pre>
      產生一個新的 GraphQLError 負責已知的錯誤位置。
    </a>
  </li>
  <li>
    <a href="#formaterror">
      <pre>function formatError</pre>
      根據 Response Format 規則描述來格式化一個錯誤。
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

在 GraphQL 發生錯誤的表達形式。包含哪裡的查詢發生錯誤的資訊，有助於 debug。大部分普遍採用下面的 `locatedError`。

### syntaxError

```js
function syntaxError(
  source: Source,
  position: number,
  description: string
): GraphQLError;
```

產生一個 GraphQLError 表示一個語法的錯誤，包含在 source 中發生語法錯誤的位置的描述資訊。

### locatedError

```js
function locatedError(error: ?Error, nodes: Array<any>): GraphQLError {
```

當給定一個任意的錯誤，嘗試執行一個 GraphQL 操作想必會拋出錯誤，則產生一個新的 GraphQLError 在 document 負責原來錯誤已知的位置。

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

給定一個 GraphQLError，在 GraphQL 規範的 Errors 部份，根據 Response Format 規則描述來格式化一個錯誤。
