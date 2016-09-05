---
title: GraphQL
layout: ../_core/DocsLayout
category: API Reference
permalink: /docs/api-reference-graphql/
next: /docs/api-reference-language/
---

`graphql` module 輸出一個 GraphQL 核心功能的子集來建立 GraphQL 類型系統和伺服器。

```js
import { ... } from 'graphql'; // ES6
var GraphQL = require('graphql'); // CommonJS
```

## 概觀

*Entry Point*

<ul class="apiIndex">
  <li>
    <a href="#graphql">
      <pre>function graphql</pre>
      Lexes、解析、驗證和在一個 schema 執行一個 GraphQL 請求。
    </a>
  </li>
</ul>

*Schema*

<ul class="apiIndex">
  <li>
    <a href="../api-reference-type-system/#graphqlschema">
      <pre>class GraphQLSchema</pre>
      GraphQL 伺服器的表達功能。
    </a>
  </li>
</ul>

*Type Definitions*

<ul class="apiIndex">
  <li>
    <a href="../api-reference-type-system/#graphqlscalartype">
      <pre>class GraphQLScalarType</pre>
      GraphQL 的 scalar 類型。
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlobjecttype">
      <pre>class GraphQLObjectType</pre>
      在 GraphQL 中包含欄位的物件類型。
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlinterfacetype">
      <pre>class GraphQLInterfaceType</pre>
      在 GraphQL 包含一個介面類別型內定義欄位的實作。
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqluniontype">
      <pre>class GraphQLUnionType</pre>
      在 GraphQL 定義一個實作的關聯類型清單。
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlenumtype">
      <pre>class GraphQLEnumType</pre>
      在 GraphQL 內定義 enum 類型的有效值清單。
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlinputobjecttype">
      <pre>class GraphQLInputObjectType</pre>
      在 GraphQL 內表示結構化輸入的輸入的物件類型。
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqllist">
      <pre>class GraphQLList</pre>
      一個類型 wrapper 包裝其他類型來表示這些類型的列表。
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlnonnull">
      <pre>class GraphQLNonNull</pre>
      一個類型 wrapper 包裝其他類型來表示非 null 版本的類型。
    </a>
  </li>
</ul>

*Scalars*

<ul class="apiIndex">
  <li>
    <a href="../api-reference-type-system/#graphqlint">
      <pre>var GraphQLInt</pre>
      A scalar type representing integers.
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlfloat">
      <pre>var GraphQLFloat</pre>
      一個 scalar 類型來表達 float。
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlstring">
      <pre>var GraphQLString</pre>
      一個 scalar 類型來表達 string。
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlboolean">
      <pre>var GraphQLBoolean</pre>
      一個 scalar 類型來表達 boolean。
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlid">
      <pre>var GraphQLID</pre>
      一個 scalar 類型來表達 ID。
    </a>
  </li>
</ul>

*Errors*

<ul class="apiIndex">
  <li>
    <a href="../api-reference-errors/#formaterror">
      <pre>function formatError</pre>
      根據回應格式的規則描述，格式化一個錯誤。
    </a>
  </li>
</ul>

## Entry Point

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

`graphql` 的功能：lexes、parses、validates 和執行一個 GraphQL 請求。它要求一個 `schema` 和一個 `requestString`。可選的參數包含一個 `rootValue`，它可以取得並作為 root 的參數被傳送到 executor，`contextValue` 將取得所有被傳送到 resolve 的 function，`variableValues` 將取得被傳送到 executor，對所有在 `requestString` 內的變數提供值，`operationName` 允許 caller 去指定在 `requestString` 那些操作要執行，在這個情況下 `requestString` 包含多個頂層的操作。

## Schema

參閱 [Type System API Reference](../api-reference-type-system#schema)。

## Type Definitions

參閱 [Type System API Reference](../api-reference-type-system#definitions)。

## Scalars

參閱 [Type System API Reference](../api-reference-type-system#scalars)。

## Errors

參閱 [Errors API Reference](../api-reference-errors)。
