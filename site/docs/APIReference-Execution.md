---
title: Execution
layout: ../_core/DocsLayout
category: API Reference
permalink: /docs/api-reference-execution/
next: /docs/api-reference-errors/
---

`graphql/execution` module 負責滿足 GraphQL 請求的執行階段。

```js
import { execute } from 'graphql/execution'; // ES6
var GraphQLExecution = require('graphql/execution'); // CommonJS
```

## 概觀

<ul class="apiIndex">
  <li>
    <a href="#execute">
      <pre>function execute</pre>
      在提供的 schema 上執行一個 GraphQL 請求。
    </a>
  </li>
</ul>

## 執行

### execute

```js
export function execute(
  schema: GraphQLSchema,
  documentAST: Document,
  rootValue?: mixed,
  contextValue?: mixed,
  variableValues?: ?{[key: string]: mixed},
  operationName?: ?string
): Promise<ExecutionResult>

type ExecutionResult = {
  data: ?Object;
  errors?: Array<GraphQLError>;
}
```

實作 GraphQL 規範的「評估請求」部份。

回傳一個最終將會被 resolve 而且永遠不會被 reject 的 Promise。

如果這個 function 的參數不是一個合法的執行 context，將立即拋出一個 GraphQLError 說明無效的 input。

`ExecutionResult` 代表執行的結果。`data` 是執行查詢的結果，如果沒有發生錯誤 `error` 是 null，而如果發生錯誤，則是一個非空的陣列。
