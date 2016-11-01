---
title: Type System
layout: ../_core/DocsLayout
category: API Reference
permalink: /docs/api-reference-type-system/
next: /docs/api-reference-validation/
---

`graphql/type` module 負責定義 GraphQL 類型和 schema。

```js
import { ... } from 'graphql/type'; // ES6
var GraphQLType = require('graphql/type'); // CommonJS
```

## 概觀

*Schema*

<ul class="apiIndex">
  <li>
    <a href="#graphqlschema">
      <pre>class GraphQLSchema</pre>
      代表的 GraphQL 伺服器的功能。
    </a>
  </li>
</ul>

*定義*

<ul class="apiIndex">
  <li>
    <a href="#graphqlscalartype">
      <pre>class GraphQLScalarType</pre>
      在 GraphQL 內的 scalar 類型。
    </a>
  </li>
  <li>
    <a href="#graphqlobjecttype">
      <pre>class GraphQLObjectType</pre>
      在 GraphQL 包含欄位的物件類型。
    </a>
  </li>
  <li>
    <a href="#graphqlinterfacetype">
      <pre>class GraphQLInterfaceType</pre>
      在 GraphQL 包含一個介面類別型內定義欄位的實作。
    </a>
  </li>
  <li>
    <a href="#graphqluniontype">
      <pre>class GraphQLUnionType</pre>
      在 GraphQL 定義一個實作的關聯類型清單。
    </a>
  </li>
  <li>
    <a href="#graphqlenumtype">
      <pre>class GraphQLEnumType</pre>
      在 GraphQL 內定義有效的 enum 類型清單。
    </a>
  </li>
  <li>
    <a href="#graphqlinputobjecttype">
      <pre>class GraphQLInputObjectType</pre>
      在 GraphQL 內表示結構化輸入的輸入的物件類型。
    </a>
  </li>
  <li>
    <a href="#graphqllist">
      <pre>class GraphQLList</pre>
      一個類型 wrapper 包裝其他類型來表示這些類型的列表。
    </a>
  </li>
  <li>
    <a href="#graphqlnonnull">
      <pre>class GraphQLNonNull</pre>
      一個類型 wrapper 包裝其他類型來表示非 null 版本的類型。
    </a>
  </li>
</ul>

*Predicates*

這些類型可作為輸出類型的欄位結果
這些類型可描述可能是 leaf 值的類型
這些類型可描述一個選擇集合的 parent context
這些類型可描述一個物件類型的組合

<ul class="apiIndex">
  <li>
    <a href="#isinputtype">
      <pre>function isInputType</pre>
      回傳如果一個類型可以用參數和指令作為輸入類型。
    </a>
  </li>
  <li>
    <a href="#isoutputtype">
      <pre>function isOutputType</pre>
      回傳如果一個類型可以作為輸出類型欄位的結果。
  </li>
  <li>
    <a href="#isleaftype">
      <pre>function isLeafType</pre>
      回傳如果一個類型在一個 response 是一個 leaf 值。
    </a>
  </li>
  <li>
    <a href="#iscompositetype">
      <pre>function isCompositeType</pre>
      回傳如果一個類型可以是一個選擇集合的 parent context。
    </a>
  </li>
  <li>
    <a href="#isabstracttype">
      <pre>function isAbstractType</pre>
      回傳如果一個類型是一個物件類型的組合。
    </a>
  </li>
</ul>

*Un-modifiers*

<ul class="apiIndex">
  <li>
    <a href="#getnullabletype">
      <pre>function getNullableType</pre>
      從一個類型剔除任何非 null 的 wrapper。
    </a>
  </li>
  <li>
    <a href="#getnamedtype">
      <pre>function getNamedType</pre>
      從一個類型剔除任何非 null 或 list 的 wrapper。
    </a>
  </li>
</ul>

*Scalars*

<ul class="apiIndex">
  <li>
    <a href="#graphqlint">
      <pre>var GraphQLInt</pre>
      一個 scalar 類型表達 intergers。
    </a>
  </li>
  <li>
    <a href="#graphqlfloat">
      <pre>var GraphQLFloat</pre>
      一個 scalar 類型表達 floats。
    </a>
  </li>
  <li>
    <a href="#graphqlstring">
      <pre>var GraphQLString</pre>
      一個 scalar 類型表達 strings。
    </a>
  </li>
  <li>
    <a href="#graphqlboolean">
      <pre>var GraphQLBoolean</pre>
      一個 scalar 類型表達 booleans。
    </a>
  </li>
  <li>
    <a href="#graphqlid">
      <pre>var GraphQLID</pre>
      一個 scalar 類型表達 IDs。
    </a>
  </li>
</ul>

## Schema

### GraphQLSchema

```js
class GraphQLSchema {
  constructor(config: GraphQLSchemaConfig)
}

type GraphQLSchemaConfig = {
  query: GraphQLObjectType;
  mutation?: ?GraphQLObjectType;
}
```

透過每種類型的操作提供的根類型建立的 Schema，查詢和修改（可選的）。根據分配的 validator 和 executor 定義 shema。

#### 範例

```js
var MyAppSchema = new GraphQLSchema({
  query: MyAppQueryRootType
  mutation: MyAppMutationRootType
});
```

## 定義

### GraphQLScalarType

```js
class GraphQLScalarType<InternalType> {
  constructor(config: GraphQLScalarTypeConfig<InternalType>)
}

type GraphQLScalarTypeConfig<InternalType> = {
  name: string;
  description?: ?string;
  serialize: (value: mixed) => ?InternalType;
  parseValue?: (value: mixed) => ?InternalType;
  parseLiteral?: (valueAST: Value) => ?InternalType;
}
```

任何請求和輸入參數值的 leaf 值都是 Scalars（或 Enums），且它們被定義有一個名稱和一系列的序列化 function 被用來確保驗證性。

#### 範例

```js
var OddType = new GraphQLScalarType({
  name: 'Odd',
  serialize: oddValue,
  parseValue: oddValue,
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return oddValue(parseInt(ast.value, 10));
    }
    return null;
  }
});

function oddValue(value) {
  return value % 2 === 1 ? value : null;
}
```

### GraphQLObjectType

```js
class GraphQLObjectType {
  constructor(config: GraphQLObjectTypeConfig)
}

type GraphQLObjectTypeConfig = {
  name: string;
  interfaces?: GraphQLInterfacesThunk | Array<GraphQLInterfaceType>;
  fields: GraphQLFieldConfigMapThunk | GraphQLFieldConfigMap;
  isTypeOf?: (value: any, info?: GraphQLResolveInfo) => boolean;
  description?: ?string
}

type GraphQLInterfacesThunk = () => Array<GraphQLInterfaceType>;

type GraphQLFieldConfigMapThunk = () => GraphQLFieldConfigMap;

type GraphQLFieldResolveFn = (
  source?: any,
  args?: {[argName: string]: any},
  context?: any,
  info?: GraphQLResolveInfo
) => any

type GraphQLResolveInfo = {
  fieldName: string,
  fieldASTs: Array<Field>,
  returnType: GraphQLOutputType,
  parentType: GraphQLCompositeType,
  schema: GraphQLSchema,
  fragments: { [fragmentName: string]: FragmentDefinition },
  rootValue: any,
  operation: OperationDefinition,
  variableValues: { [variableName: string]: any },
}

type GraphQLFieldConfig = {
  type: GraphQLOutputType;
  args?: GraphQLFieldConfigArgumentMap;
  resolve?: GraphQLFieldResolveFn;
  deprecationReason?: string;
  description?: ?string;
}

type GraphQLFieldConfigArgumentMap = {
  [argName: string]: GraphQLArgumentConfig;
};

type GraphQLArgumentConfig = {
  type: GraphQLInputType;
  defaultValue?: any;
  description?: ?string;
}

type GraphQLFieldConfigMap = {
  [fieldName: string]: GraphQLFieldConfig;
};
```

你定義的大部分 GraphQL 類型都將為物件類型。物件類型有一個名稱，但是最重要的是名數它們的欄位。

當兩個類型需要互相參考，或是一個類型需要參考本身的欄位，你可以使用一個 function 表達式（稱作 closure 或 thunk）來提供欄位的延遲。

#### 範例

```js
var AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: {
    street: { type: GraphQLString },
    number: { type: GraphQLInt },
    formatted: {
      type: GraphQLString,
      resolve(obj) {
        return obj.number + ' ' + obj.street
      }
    }
  }
});

var PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    name: { type: GraphQLString },
    bestFriend: { type: PersonType },
  })
});
```

### GraphQLInterfaceType

```js
class GraphQLInterfaceType {
  constructor(config: GraphQLInterfaceTypeConfig)
}

type GraphQLInterfaceTypeConfig = {
  name: string,
  fields: GraphQLFieldConfigMapThunk | GraphQLFieldConfigMap,
  resolveType?: (value: any, info?: GraphQLResolveInfo) => ?GraphQLObjectType,
  description?: ?string
};
```

當一個欄位可以回傳一組不同的類型，一個 Interface 類型被用來描述什麼類型是可行的，哪些欄位是共同跨越所有類型的，以及一個 function 來確定當欄位被 resolve 時，哪些類型實際被使用。

#### 範例

```js
var EntityType = new GraphQLInterfaceType({
  name: 'Entity',
  fields: {
    name: { type: GraphQLString }
  }
});
```

### GraphQLUnionType

```js
class GraphQLUnionType {
  constructor(config: GraphQLUnionTypeConfig)
}

type GraphQLUnionTypeConfig = {
  name: string,
  types: Array<GraphQLObjectType>,
  resolveType?: (value: any, info?: GraphQLResolveInfo) => ?GraphQLObjectType;
  description?: ?string;
};
```

當一個欄位可以回傳一組不同的類型，一個 Union 類型被用來描述什麼類型是可行的，以及一個 function 來確定當欄位被 resolve 時，哪些類型實際被使用。

### 範例

```js
var PetType = new GraphQLUnionType({
  name: 'Pet',
  types: [ DogType, CatType ],
  resolveType(value) {
    if (value instanceof Dog) {
      return DogType;
    }
    if (value instanceof Cat) {
      return CatType;
    }
  }
});
```

### GraphQLEnumType

```js
class GraphQLEnumType {
  constructor(config: GraphQLEnumTypeConfig)
}

type GraphQLEnumTypeConfig = {
  name: string;
  values: GraphQLEnumValueConfigMap;
  description?: ?string;
}

type GraphQLEnumValueConfigMap = {
  [valueName: string]: GraphQLEnumValueConfig;
};

type GraphQLEnumValueConfig = {
  value?: any;
  deprecationReason?: string;
  description?: ?string;
}

type GraphQLEnumValueDefinition = {
  name: string;
  value?: any;
  deprecationReason?: string;
  description?: ?string;
}
```

有些 request 的 leaf 值和輸入值都是 Enums。GraphQL 將 Enum 值作為字串序列化，但是內部 Enums 可以用任何一種類型表示，通常是 integers。

注意：如果在一個定義沒有提供值，enum 值的名稱將作為內部值使用。

#### 範例

```js
var RGBType = new GraphQLEnumType({
  name: 'RGB',
  values: {
    RED: { value: 0 },
    GREEN: { value: 1 },
    BLUE: { value: 2 }
  }
});
```

### GraphQLInputObjectType

```js
class GraphQLInputObjectType {
  constructor(config: GraphQLInputObjectTypeConfig)
}

type InputObjectConfig = {
  name: string;
  fields: InputObjectConfigFieldMapThunk | InputObjectConfigFieldMap;
  description?: ?string;
}

type InputObjectConfigFieldMapThunk = () => InputObjectConfigFieldMap;

type InputObjectFieldConfig = {
  type: GraphQLInputType;
  defaultValue?: any;
  description?: ?string;
}

type InputObjectConfigFieldMap = {
  [fieldName: string]: InputObjectFieldConfig;
};

type InputObjectField = {
  name: string;
  type: GraphQLInputType;
  defaultValue?: any;
  description?: ?string;
}

type InputObjectFieldMap = {
  [fieldName: string]: InputObjectField;
};
```

一個輸入物件定義一個結構的欄位集合，可能為欄位提供參數。

使用 `NonNull` 將確保查詢的值必須提供。

#### 範例

```js
var GeoPoint = new GraphQLInputObjectType({
  name: 'GeoPoint',
  fields: {
    lat: { type: new GraphQLNonNull(GraphQLFloat) },
    lon: { type: new GraphQLNonNull(GraphQLFloat) },
    alt: { type: GraphQLFloat, defaultValue: 0 },
  }
});
```

### GraphQLList

```js
class GraphQLList {
  constructor(type: GraphQLType)
}
```

清單是一種類型標記，一個 wrap 類型可以指出另一個類型。清單通常是定義物件類型的欄位的 context 中建立的。

#### 範例

```js
var PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    parents: { type: new GraphQLList(Person) },
    children: { type: new GraphQLList(Person) },
  })
});
```

### GraphQLNonNull

```js
class GraphQLNonNull {
  constructor(type: GraphQLType)
}
```

一個非 null 是一種類型的標記，一個 wrap 類型可以指出另一個類型。非 null 類型強制該值永遠不為空，並可以確保如果在 request 過程中引發錯誤。對於欄位是非常有用的，你可以在非 null 加強保證，例如在資料庫的 id 欄位通常不為 null。

#### 範例

```js
var RowType = new GraphQLObjectType({
  name: 'Row',
  fields: () => ({
    id: { type: new GraphQLNonNull(String) },
  })
});
```

## Predicates

### isInputType

```js
function isInputType(type: ?GraphQLType): boolean
```

這些類型可作為輸出類型的欄位結果

### isOutputType

```js
function isOutputType(type: ?GraphQLType): boolean
```

這些類型可作為輸出類型的欄位結果

### isLeafType

```js
function isLeafType(type: ?GraphQLType): boolean
```

這些類型可描述可能是 leaf 值的類型

### isCompositeType

```js
function isCompositeType(type: ?GraphQLType): boolean
```

這些類型可描述一個選擇集合的 parent context

### isAbstractType

```js
function isAbstractType(type: ?GraphQLType): boolean
```

這些類型可描述一個物件類型的組合

## Un-modifiers

### getNullableType

```js
function getNullableType(type: ?GraphQLType): ?GraphQLNullableType
```

如果一個給定的類型是非 null 的，這條非 null 的並回傳基礎類型。

### getNamedType

```js
function getNamedType(type: ?GraphQLType): ?GraphQLNamedType
```

如果一個給定的類型是非 null 的或是一個清單，這個重複的非 null 和清單 wrapper 回傳基礎類型。

## Scalars

### GraphQLInt

```js
var GraphQLInt: GraphQLScalarType;
```

一個 `GraphQLScalarType` 表示一個 int。

### GraphQLFloat

```js
var GraphQLFloat: GraphQLScalarType;
```

一個 `GraphQLScalarType` 表示一個 float。

### GraphQLString

```js
var GraphQLString: GraphQLScalarType;
```

一個 `GraphQLScalarType` 表示一個 string。

### GraphQLBoolean

```js
var GraphQLBoolean: GraphQLScalarType;
```

一個 `GraphQLScalarType` 表示一個 boolean。

### GraphQLID

```js
var GraphQLID: GraphQLScalarType;
```

一個 `GraphQLScalarType` 表示一個 ID。
