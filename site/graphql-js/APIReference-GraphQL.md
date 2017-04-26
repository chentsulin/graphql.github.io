---
title: graphql
layout: ../_core/GraphQLJSLayout
category: API Reference
permalink: /graphql-js/graphql/
sublinks: graphql
next: /graphql-js/error/
---

`graphql` module 輸出一個 GraphQL 核心功能的子集來建立 GraphQL 類型系統和伺服器。

```js
import { graphql } from 'graphql'; // ES6
var { graphql } = require('graphql'); // CommonJS
```

## 概觀

*進入點*

<ul class="apiIndex">
  <li>
    <a href="#graphql">
      <pre>function graphql</pre>
      在一個 schema 上，斷字、解析、驗證並執行一個 GraphQL 請求。
    </a>
  </li>
</ul>

*Schema*

<ul class="apiIndex">
  <li>
    <a href="../type/#graphqlschema">
      <pre>class GraphQLSchema</pre>
      代表一個 GraphQL 伺服器的所有功能。
    </a>
  </li>
</ul>

*類型定義*

<ul class="apiIndex">
  <li>
    <a href="../type/#graphqlscalartype">
      <pre>class GraphQLScalarType</pre>
      GraphQL 中的 scalar 類型。
    </a>
  </li>
  <li>
    <a href="../type/#graphqlobjecttype">
      <pre>class GraphQLObjectType</pre>
      GraphQL 中包含數個欄位的物件類型。
    </a>
  </li>
  <li>
    <a href="../type/#graphqlinterfacetype">
      <pre>class GraphQLInterfaceType</pre>
      GraphQL 中定義將會包含的欄位實作的介面類型。
    </a>
  </li>
  <li>
    <a href="../type/#graphqluniontype">
      <pre>class GraphQLUnionType</pre>
     	GraphQL 中定義一個實作的列表的集合類型。
    </a>
  </li>
  <li>
    <a href="../type/#graphqlenumtype">
      <pre>class GraphQLEnumType</pre>
      GraphQL 中定義一個有效值的列表的列舉類型。
    </a>
  </li>
  <li>
    <a href="../type/#graphqlinputobjecttype">
      <pre>class GraphQLInputObjectType</pre>
      GraphQL 中表示結構化輸入的輸入物件類型。
    </a>
  </li>
  <li>
    <a href="../type/#graphqllist">
      <pre>class GraphQLList</pre>
      一個包裝其他類型來表示這些類型的列表的類型。
    </a>
  </li>
  <li>
    <a href="../type/#graphqlnonnull">
      <pre>class GraphQLNonNull</pre>
      一個包裝其他類型來表示這些類型的 non-null 版本的類型。
    </a>
  </li>
</ul>

*Scalars*

<ul class="apiIndex">
  <li>
    <a href="../type/#graphqlint">
      <pre>var GraphQLInt</pre>
      一個代表 integer 的 scalar 類型。
    </a>
  </li>
  <li>
    <a href="../type/#graphqlfloat">
      <pre>var GraphQLFloat</pre>
      一個代表 float 的 scalar 類型。
    </a>
  </li>
  <li>
    <a href="../type/#graphqlstring">
      <pre>var GraphQLString</pre>
      一個代表 string 的 scalar 類型。
    </a>
  </li>
  <li>
    <a href="../type/#graphqlboolean">
      <pre>var GraphQLBoolean</pre>
      一個代表 boolean 的 scalar 類型。
    </a>
  </li>
  <li>
    <a href="../type/#graphqlid">
      <pre>var GraphQLID</pre>
      一個代表 ID 的 scalar 類型。
    </a>
  </li>
</ul>

*錯誤*

<ul class="apiIndex">
  <li>
    <a href="../error/#formaterror">
      <pre>function formatError</pre>
      根據回應格式描述的規則，來格式化一個錯誤。
    </a>
  </li>
</ul>

## 進入點

### graphql

```js
graphql(
  schema: GraphQLSchema,
  requestString: string,
  rootValue?: ?any,
  contextValue?: ?any,
  variableValues?: ?{[key: string]: any},
  operationName?: ?string
): Promise<GraphQLResult>
```

`graphql` function 斷字、解析、驗證並執行一個 GraphQL 請求。它需要一個 `schema` 和一個 `requestString`。可選的參數包含 `rootValue`，它會作為 root 值被傳送到 executor，`contextValue` 會被傳送到所有的 resolve function，`variableValues` 會被傳送到 executor，以提供值給所有在 `requestString` 內的變數，`operationName` 在 `requestString` 包含多個頂層的操作的情況下，允許 caller 去指定要執行 `requestString` 的那個操作。

## Schema

<<<<<<< HEAD:site/docs/APIReference-GraphQL.md
參閱[類型系統 API 參考](../api-reference-type-system#schema)。
=======
See the [Type System API Reference](../type#schema).
>>>>>>> upsteam/source:site/graphql-js/APIReference-GraphQL.md

## 類型定義

<<<<<<< HEAD:site/docs/APIReference-GraphQL.md
參閱[類型系統 API 參考](../api-reference-type-system#definitions)。

## Scalars

參閱[類型系統 API 參考](../api-reference-type-system#scalars)。
=======
See the [Type System API Reference](../type#definitions).

## Scalars

See the [Type System API Reference](../type#scalars).
>>>>>>> upsteam/source:site/graphql-js/APIReference-GraphQL.md

## 錯誤

<<<<<<< HEAD:site/docs/APIReference-GraphQL.md
參閱[錯誤 API 參考](../api-reference-errors)。
=======
See the [Errors API Reference](../error)
>>>>>>> upsteam/source:site/graphql-js/APIReference-GraphQL.md
