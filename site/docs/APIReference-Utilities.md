---
title: Utilities
layout: ../_core/DocsLayout
category: API Reference
permalink: /docs/api-reference-utilities/
---

`graphql/utilities` module 在 GraphQL 語言和類型物件包含常見有用的計算和使用。

```js
import { ... } from 'graphql/utilities'; // ES6
var GraphQLUtilities = require('graphql/utilities'); // CommonJS
```

## 概觀

*Introspection*

<ul class="apiIndex">
  <li>
    <a href="#introspectionquery">
      <pre>var introspectionQuery</pre>
      GraphQL 自我檢查查詢包含足夠的資訊來重現類型系統。
    </a>
  </li>
  <li>
    <a href="#buildclientschema">
      <pre>function buildClientSchema</pre>
      查詢 `introspectionQuery` schema 的結果產生一個客戶端的 schema。
    </a>
  </li>
</ul>

*Schema Language*

<ul class="apiIndex">
  <li>
    <a href="#printschema">
      <pre>function printSchema</pre>
      在一個標準的格式列印 schema。
    </a>
  </li>
  <li>
    <a href="#printintrospectionschema">
      <pre>function printIntrospectionSchema</pre>
      在一個標準的格式列印 schema 的自我檢查功能。
    </a>
  </li>
  <li>
    <a href="#buildastschema">
      <pre>function buildASTSchema</pre>
      從一個解析的 AST Schema 建立一個 schema。
    </a>
  </li>
  <li>
    <a href="#typefromast">
      <pre>function typeFromAST</pre>
      在 GraphQLSchema 的 AST 查詢一個類型參考。
    </a>
  </li>
  <li>
    <a href="#astfromvalue">
      <pre>function astFromValue</pre>
      給定 JavaScript 的值產生一個 GraphQL 輸入值 AST 。
    </a>
  </li>
</ul>

*Visitors*

<ul class="apiIndex">
  <li>
    <a href="#typeinfo">
      <pre>class TypeInfo</pre>
      在一個 visitor AST 遍歷 Tracks 類型和欄位定義..
    </a>
  </li>
</ul>

*Value Validation*

<ul class="apiIndex">
  <li>
    <a href="#isvalidjsvalue">
      <pre>function isValidJSValue</pre>
      如果 JavaScript 值是有效的，定義 GraphQL 類型。
    </a>
  </li>
  <li>
    <a href="#isvalidliteralvalue">
      <pre>function isValidLiteralValue</pre>
      如果來自 AST 的文字值是有效的，定義 GraphQL 類型。
    </a>
  </li>
</ul>

## Introspection

### introspectionQuery

```js
var introspectionQuery: string
```

GraphQL 查詢伺服器的自我檢查系統有足夠的資訊可以複製伺服器的類型系統。

### buildClientSchema

```js
function buildClientSchema(
  introspection: IntrospectionQuery
): GraphQLSchema
```

透過客戶端工具來產生一個 GraphQLSChema。

給予客戶端執行自我檢查的查詢的結果，建立並回傳一個 GraphQLSchema instance，然後就可以用於所有的 graphql-js 工具，但不能用於執行查詢，因為自我檢查並不代表「resolver」，「parse」或「serialize」function 或其他任何伺服器內部的機制。

## Schema Representation

### printSchema

```js
function printSchema(schema: GraphQLSchema): string {
```

在 Schema Language 格式列印提供的 schema。

### printIntrospectionSchema

```js
function printIntrospectionSchema(schema: GraphQLSchema): string {
```

在 Schema Language 格式列印內建的自我檢查 schema。

### buildASTSchema

```js
function buildASTSchema(
  ast: SchemaDocument,
  queryTypeName: string,
  mutationTypeName: ?string
): GraphQLSchema
```

在 `graphql/language/schema` 和建構一個 GraphQLSchema instance，藉由 `parseSchemaIntoAST` 產生的 AST 的 Schema Document，可以用於所有的 graphql-js 工具，但不能用於執行查詢，因為自我檢查並不代表「resolver」，「parse」或「serialize」function 或其他任何伺服器內部的機制。

### typeFromAST

```js
function typeFromAST(
  schema: GraphQLSchema,
  inputTypeAST: Type
): ?GraphQLType
```

給定一個類型的名稱，因為出現在 GraphQL AST 和 Schema，從 schema 回傳對應的 GraphQLType。

### astFromValue

```js
function astFromValue(
  value: any,
  type?: ?GraphQLType
): ?Value
```
給定 JavaScript 的值產生一個 GraphQL 輸入值 AST 。

可能提供一個 GraphQL 類型，將被用於值和 primitive 兩者間的歧義。

## Visitors

### TypeInfo

```js
class TypeInfo {
  constructor(schema: GraphQLSchema)
  getType(): ?GraphQLOutputType {
  getParentType(): ?GraphQLCompositeType {
  getInputType(): ?GraphQLInputType {
  getFieldDef(): ?GraphQLFieldDefinition {
  getDirective(): ?GraphQLDirective {
  getArgument(): ?GraphQLArgument {
}
```

TypeInfo 是一個 utility 類別，給予了 GraphQL schema，在藉由呼叫 `enter(node)` 和 `leave(node)` 通過遞迴方式，可以保持追蹤在任何 GraphQL document AST 的點目前欄位和類型定義。

## Value Validation

### isValidJSValue

```js
function isValidJSValue(value: any, type: GraphQLInputType): string[]
```

給予一個 JavaScript 的值和 GraphQL 類型，如果該值將接受該類型則定義。這主要是用於驗證 runtime 時查詢變數的值。

### isValidLiteralValue

```js
function isValidLiteralValue(
  type: GraphQLInputType,
  valueAST: Value
): string[]
```

Utility 用於驗證 AST 的文字值是否是有效的給定輸入類型。

注意，這只驗證文字值，變數被假設都提供正確類型的值。
