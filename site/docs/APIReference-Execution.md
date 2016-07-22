---
title: Execution
layout: ../_core/DocsLayout
category: API Reference
permalink: /docs/api-reference-execution/
next: /docs/api-reference-errors/
---

`graphql/execution` module 是負責滿足 GraphQL 請求的執行階段。

```js
import { execute } from 'graphql/execution'; // ES6
var GraphQLExecution = require('graphql/execution'); // CommonJS
```

## 概觀

<ul class="apiIndex">
  <li>
    <a href="#execute">
      <pre>function execute</pre>
      在提供的 schema 執行一個 GraphQL 請求。
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

最終將回傳一個 Promise resolve 且永遠不會 reject。

如果這個 function 的參數在合法執行的 context 沒有結果，將立即拋出 GraphQLError 說明無效的欄位。

`ExecutionResult` 代表執行的結果。`data` 是執行查詢的結果，如果沒有發生錯誤 `error` 是 null，假設發生錯誤，是一個非空的陣列。
