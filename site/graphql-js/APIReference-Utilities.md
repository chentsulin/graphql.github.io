---
title: graphql/utilities
layout: ../_core/GraphQLJSLayout
category: API Reference
permalink: /graphql-js/utilities/
sublinks: astFromValue,buildASTSchema,buildClientSchema,buildSchema,introspectionQuery,isValidJSValue,isValidLiteralValue,printIntrospectionSchema,printSchema,typeFromAST,TypeInfo
next: /graphql-js/validation/
---

<<<<<<< HEAD:site/docs/APIReference-Utilities.md
`graphql/utilities` module 包含一些常見且有用的運算可以伴隨著 GraphQL 語言與型別物件一起使用。
=======
The `graphql/utilities` module contains common useful computations to use with
the GraphQL language and type objects. You can import either from the `graphql/utilities` module, or from the root `graphql` module. For example:
>>>>>>> upsteam/source:site/graphql-js/APIReference-Utilities.md

```js
import { introspectionQuery } from 'graphql'; // ES6
var { introspectionQuery } = require('graphql'); // CommonJS
```

## 概觀

*Introspection*

<ul class="apiIndex">
  <li>
    <a href="#introspectionquery">
      <pre>var introspectionQuery</pre>
      一份包含足夠重現型別系統資訊的 GraphQL introspection 查詢。
    </a>
  </li>
  <li>
    <a href="#buildclientschema">
      <pre>function buildClientSchema</pre>
      藉由用 `introspectionQuery` 查詢 schema 的結果來產生一個客戶端的 schema。
    </a>
  </li>
</ul>

*Schema Language*

<ul class="apiIndex">
  <li>
    <a href="#buildschema">
      <pre>function buildSchema</pre>
      Builds a Schema object from GraphQL schema language.
    </a>
  </li>
  <li>
    <a href="#printschema">
      <pre>function printSchema</pre>
      用標準的格式列印 schema。
    </a>
  </li>
  <li>
    <a href="#printintrospectionschema">
      <pre>function printIntrospectionSchema</pre>
      用標準的格式列印 schema 的 introspection 功能。
    </a>
  </li>
  <li>
    <a href="#buildastschema">
      <pre>function buildASTSchema</pre>
      從一個解析後的 AST Schema 建立一個 schema。
    </a>
  </li>
  <li>
    <a href="#typefromast">
      <pre>function typeFromAST</pre>
      在 GraphQLSchema 的 AST 中查找一個被參考的型別。
    </a>
  </li>
  <li>
    <a href="#astfromvalue">
      <pre>function astFromValue</pre>
      給定 JavaScript 的值產生一個 GraphQL 輸入值 AST。
    </a>
  </li>
</ul>

*Visitors*

<ul class="apiIndex">
  <li>
    <a href="#typeinfo">
      <pre>class TypeInfo</pre>
      在一個 visitor AST 遍歷時追蹤型別和欄位定義..
    </a>
  </li>
</ul>

*Value Validation*

<ul class="apiIndex">
  <li>
    <a href="#isvalidjsvalue">
      <pre>function isValidJSValue</pre>
      判斷一個 JavaScript 值是否可以是有效的 GraphQL 型別。
    </a>
  </li>
  <li>
    <a href="#isvalidliteralvalue">
      <pre>function isValidLiteralValue</pre>
      判斷是否一個來自 AST 的字面值可以是有效的 GraphQL 型別。
    </a>
  </li>
</ul>

## Introspection

### introspectionQuery

```js
var introspectionQuery: string
```

一個 GraphQL 查詢，它查詢伺服器的 introspection 以得到足夠的資訊來重現伺服器的型別系統。

### buildClientSchema

```js
function buildClientSchema(
  introspection: IntrospectionQuery
): GraphQLSchema
```

透過客戶端工具產生一個 GraphQLSchema 來使用。

<<<<<<< HEAD:site/docs/APIReference-Utilities.md
給定客戶端執行 introspection 查詢的結果，建立並回傳一個 GraphQLSchema 實體，然後就可以用於所有的 graphql-js 工具，但不能用於執行查詢，因為 introspection 並沒有呈現「resolver」、「parse」或「serialize」function 以及其他任何伺服器內部的機制。
=======
Given the result of a client running the introspection query, creates and
returns a GraphQLSchema instance which can be then used with all GraphQL.js
tools, but cannot be used to execute a query, as introspection does not
represent the "resolver", "parse" or "serialize" functions or any other
server-internal mechanisms.
>>>>>>> upsteam/source:site/graphql-js/APIReference-Utilities.md

## 呈現 Schema

### buildSchema

```js
function buildSchema(source: string | Source): GraphQLSchema {
```

Creates a GraphQLSchema object from GraphQL schema language. The schema will use default resolvers. For more detail on the GraphQL schema language, see the [schema language docs](/learn/schema/) or this [schema language cheat sheet](https://wehavefaces.net/graphql-shorthand-notation-cheatsheet-17cd715861b6#.9oztv0a7n).

### printSchema

```js
function printSchema(schema: GraphQLSchema): string {
```

用 Schema Language 格式列印提供的 schema。

### printIntrospectionSchema

```js
function printIntrospectionSchema(schema: GraphQLSchema): string {
```

用 Schema Language 格式列印內建的 introspection schema。

### buildASTSchema

```js
function buildASTSchema(
  ast: SchemaDocument,
  queryTypeName: string,
  mutationTypeName: ?string
): GraphQLSchema
```

<<<<<<< HEAD:site/docs/APIReference-Utilities.md
這接收由 `graphql/language/schema` 中的 `parseSchemaIntoAST` 產生的 Schema 文件的 ast 並建構一個 GraphQLSchema 實體，它可以用於所有的 graphql-js 工具，但不能被用來執行查詢，因為 introspection 沒有呈現「resolver」、「parse」或「serialize」function 以及其他任何伺服器內部的機制。
=======
This takes the ast of a schema document produced by `parseSchemaIntoAST` in
`graphql/language/schema` and constructs a GraphQLSchema instance which can be
then used with all GraphQL.js tools, but cannot be used to execute a query, as
introspection does not represent the "resolver", "parse" or "serialize"
functions or any other server-internal mechanisms.
>>>>>>> upsteam/source:site/graphql-js/APIReference-Utilities.md

### typeFromAST

```js
function typeFromAST(
  schema: GraphQLSchema,
  inputTypeAST: Type
): ?GraphQLType
```

給定一個出現在 GraphQL AST 和 Schema 的型別名稱，從 schema 回傳對應的 GraphQLType。

### astFromValue

```js
function astFromValue(
  value: any,
  type?: ?GraphQLType
): ?Value
```
給定 JavaScript 的值產生一個 GraphQL 輸入值 AST。

可以選擇性地提供一個 GraphQL 型別，將被用於分辨 primitive 值。

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

TypeInfo 是一個 utility 類別，給定一個 GraphQL schema，藉由在遞迴分支時呼叫 `enter(node)` 以及 `leave(node)`，可以在任何 GraphQL 文件 AST 的節點持續追蹤目前欄位和型別定義。

## 值驗證

### isValidJSValue

```js
function isValidJSValue(value: any, type: GraphQLInputType): string[]
```

給定一個 JavaScript 的值和一個 GraphQL 型別，判斷是否該值會被型別接受。這主要是用於在執行期驗證查詢變數的值。

### isValidLiteralValue

```js
function isValidLiteralValue(
  type: GraphQLInputType,
  valueAST: Value
): string[]
```

用於判斷給定的字面值 AST 是否是有效的輸入型別的驗證器的 utility。

注意，這只驗證字面值，它假設變數都會提供正確型別的值。
