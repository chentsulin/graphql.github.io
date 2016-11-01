---
title: Language
layout: ../_core/DocsLayout
category: API Reference
permalink: /docs/api-reference-language/
next: /docs/api-reference-type-system/
---

在 GraphQL language 的 `graphql/language` module 負責解析和操作。

```js
import { ... } from 'graphql/language'; // ES6
var GraphQLLanguage = require('graphql/language'); // CommonJS
```

## 概觀

*Source*

<ul class="apiIndex">
  <li>
    <a href="#source">
      <pre>class Source</pre>
      代表輸入的字串到 GraphQL 伺服器
    </a>
  </li>
  <li>
    <a href="#getlocation">
      <pre>function getLocation</pre>
      在 Source 轉換一個字元偏移量（offset）到一個行（row）或列（column）
    </a>
  </li>
</ul>

*Lexer*

<ul class="apiIndex">
  <li>
    <a href="#lex">
      <pre>function lex</pre>
      根據 GraphQL 語法 lexes 一個 GraphQL Source
    </a>
  </li>
</ul>

*Parser*

<ul class="apiIndex">
  <li>
    <a href="#parse">
      <pre>function parse</pre>
      根據 GraphQL 語法解析一個 GraphQL Source
    </a>
  </li>
  <li>
    <a href="#parseValue">
      <pre>function parseValue</pre>
      根據 GraphQL 語法解析一個值
    </a>
  </li>
  <li>
    <a href="#kind">
      <pre>var Kind</pre>
      代表各種被解析的 AST（抽象語法樹）節點。
    </a>
  </li>
</ul>

*Visitor*

<ul class="apiIndex">
  <li>
    <a href="#visit">
      <pre>function visit</pre>
      一個 general-purpose visitor 遍歷解析 GraphQL AST
    </a>
  </li>
  <li>
    <a href="#break">
      <pre>var BREAK</pre>
      一個 token 允許突然出現的 visitor。
    </a>
  </li>
</ul>

*Printer*

<ul class="apiIndex">
  <li>
    <a href="#print">
      <pre>function print</pre>
      在一個標準的格式列印一個 AST。
    </a>
  </li>
</ul>

## Source

### Source

```js
export class Source {
  constructor(body: string, name?: string)
}
```

一個表示輸入的來源 GraphQL，名稱是可選的，在 source 檔案對於誰在客戶端儲存了 GraphQL document 是相當有用的；例如，如果 GraphQL 輸入是在一個 Foo.graphql 的檔案中，命名為「Foo.graphql」是相當有用的。

### getLocation

```js
function getLocation(source: Source, position: number): SourceLocation

type SourceLocation = {
  line: number;
  column: number;
}
```

接受一個 Source 和一個 UTF-8 字元 offset，並回傳對應的行和欄位作為一個 SourceLocation。

## Lexer

### lex

```js
function lex(source: Source): Lexer;

type Lexer = (resetPosition?: number) => Token;

export type Token = {
  kind: number;
  start: number;
  end: number;
  value: ?string;
};
```

給定一個 Source 物件，回傳一個 Lexer 給 source。一個 Lexer 是一個 function，在每次 Lexer 被呼叫時，它的行為像是一個 generator，在 Source 回傳下一個 token。假設 source lexes 由 lexer 將各個 EOF 最後的 Token 發出，之後每當 lexer 被呼叫時，將重複回傳 EOF token。

lexer function 的參數是可選的，而且在 source 可以用於倒帶或快轉 lexer 的新位置。

## Parser

### parse

```js
export function parse(
  source: Source | string,
  options?: ParseOptions
): Document
```

給定一個 GraphQL source，解析成一個 Document。

如果發生語法錯誤，拋出 GraphQLError。

### parseValue

```js
export function parseValue(
  source: Source | string,
  options?: ParseOptions
): Value
```

給定一個 String 包含一個 GraphQL 的值，解析該值的 AST。

如果遇到語法錯誤，拋出 GraphQLError。

在直接操作 GraphQL Values 和完整獨立的 GraphQL documents 的工具內是有用的。

### Kind

描述了不同種類的 AST 節點枚舉。

## Visitor

### visit

```js
function visit(root, visitor, keyMap)
```

visit() 將優先使用深層遍歷來走過整個 AST，在遍歷時在每個節點呼叫 visitor 的進入 function，在拜訪所有子節點後，並呼叫離開的 function。

從進入和離開的 function 透過回傳不同的值，訪客的行為可以被改變，包含跳過 AST（透過回傳 false）的 sub-tree，透過回傳的值或是 null 來移除值編輯 AST，或是透過 BREAK 來停止整個遍歷。

當使用 visit() 來編輯一個 AST，原始的 AST 不會被修改，而且從 visit function 回傳一個新版本的應用更改 AST。

```js
var editedAST = visit(ast, {
  enter(node, key, parent, path, ancestors) {
    // @return
    //   undefined: 沒有 action
    //   false: 跳過拜訪這個節點
    //   visitor.BREAK: 停止所有拜訪
    //   null: 刪除這個節點
    //   any value: 替換此節點的回傳值
  },
  leave(node, key, parent, path, ancestors) {
    // @return
    //   undefined: 沒有 action
    //   false: 沒有 action
    //   visitor.BREAK: 停止所有拜訪
    //   null: 刪除這個節點
    //   any value: 替換此節點的回傳值
  }
});
```

另外提供了 enter() 和 leave() function，相反的 visitor 可以提供像是 AST 節點的 function 命名，或是進入或離開 visitor 命名的 key，導致四個 visitor API 的排列：

1) 觸發時進入某種特定的節點的命名的 visitors。

```js
visit(ast, {
  Kind(node) {
    // 進入「Kind」節點
  }
})
```

2) 在進入和離開特定的節點觸發被命名的 visitors。

```js
visit(ast, {
  Kind: {
    enter(node) {
      // 進入「Kind」節點
    }
    leave(node) {
      // 離開「Kind」節點
    }
  }
})
```

3) 在進入和離開任何節點觸發通用 visitors。

```js
visit(ast, {
  enter(node) {
    // 進入任何節點
  },
  leave(node) {
    // 離開任何節點
  }
})
```

4) 在進入和離開特定的節點的平行 visitors。

```js
visit(ast, {
  enter: {
    Kind(node) {
      // 進入「Kind」節點
    }
  },
  leave: {
    Kind(node) {
      // 離開「Kind」節點
    }
  }
})
```

### BREAK

Sentinel `BREAK` 描述在 `visitor` 的文件。

## Printer

### print

```js
function print(ast): string
```

使用一套合理的格式規則，轉換一個 AST 成一個 string。
