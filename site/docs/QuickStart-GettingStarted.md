---
title: 入門
layout: ../_core/DocsLayout
category: Quick Start
permalink: /docs/getting-started/
next: /docs/videos/
---

讓我們從頭開始使用 **[graphql-js](https://github.com/graphql/graphql-js)** 來建構一個基本的 GraphQL 伺服器。

我們的伺服器 schema 將會很簡單：它只有一個 type，一個 `User`，它有兩個欄位，`id` 和 `name`。
(想看更複雜的伺服器範例，請查看 **[Walkthrough](../intro)**。)

## 設置

從建一個資料夾給你的 demo 伺服器開始：

```sh
mkdir graphql-demo
cd graphql-demo
```

這個範例伺服器需要 **[Node.js](https://nodejs.org/en/)**
以及三個額外的 package 給我們的伺服器使用：

1. **[graphql](https://github.com/graphql/graphql-js)**，用 JavaScript 撰寫的 GraphQL 的參考實作。
2. **[express](https://github.com/strongloop/express)**，一個基本的 web framework。
3. **[express-graphql](https://github.com/graphql/express-graphql)**，產生一個 GraphQL 伺服器的 express middleware。

透過 **[npm](https://docs.npmjs.com/getting-started/installing-node)** 安裝這三個 package：

```sh
npm init -f
npm install graphql express express-graphql --save
```

## 資料

我們的伺服器會包含兩個檔案，`data.json` 和 `index.js`。
執行以下指令來建立這些檔案

```sh
touch data.json
touch index.js
```

現在在 `data.json` 中定義使用者資料：

```json
{
  "1": {
    "id": "1",
    "name": "Dan"
  },
  "2": {
    "id": "2",
    "name": "Marie"
  },
  "3": {
    "id": "3",
    "name": "Jessie"
  }
}
```

## 伺服器

接下來你會建立一個非常基本的 GraphQL schema 來描述這些資料；
結著你可以讓這個 schema 可以透過 HTTP 被 query。

把以下程式碼插入到 `index.js` (並且一定要閱讀註解！):

```js
// import 需要的 library
var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');

// import 你前面建立的資料
var data = require('./data.json');

// 用兩個字串欄位：`id` 和 `name`，來定義 User type。
// User 的 type 是 GraphQLObjectType，它有子欄位
// 都有它們各自的 type (在這個案例中，是 GraphQLString)。
var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

// 定義 schema 有一個頂層欄位 `user`，它
// 接收一個 `id` 參數並回傳該 ID 的 User。
// 要注意 `query` 是一個 GraphQLObjectType，就像 User。
// 不過，`user` 欄位是一個我們在上面定義的 userType。
var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        // `args` 描述 `user` query 接受的參數
        args: {
          id: { type: graphql.GraphQLString }
        },
        // resolve function 描述如何去「resolve」或滿足
        // 進來的 query。
        // 在這個案例中，我們使用從上面來的 `id` 參數作為鍵
        // 去從 `data` 取得 User
        resolve: function (_, args) {
          return data[args.id];
        }
      }
    }
  })
});

express()
  .use('/graphql', graphqlHTTP({ schema: schema, pretty: true }))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');
```

<script data-inline>
var graphql = require('graphql');

var data = {
  "1": {
    "id": "1",
    "name": "Dan"
  },
  "2": {
    "id": "2",
    "name": "Marie"
  },
  "3": {
    "id": "3",
    "name": "Jessie"
  }
};

var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: function (_, args) {
          return data[args.id];
        }
      }
    }
  })
});

global.schema = schema;
</script>

就這樣而已 - 你的基礎 GraphQL 伺服器已經完成！透過執行以下指令來啟動它

```sh
node index.js
```

這個伺服器應該會宣布它執行在
[localhost:3000/graphql](http://localhost:3000/graphql)。
如果你 navigate 到這個位址，你會收到這個通知：

```javascript
{
  "errors": [
    {
      "message": "Must provide query string."
    }
  ]
}
```

我們知道伺服器已經在跑了 - 現在我們只需要發出 query 給它！

## Query

下面是你可以針對你的 schema 做的一個非常簡單的 query。右邊是
你的伺服器應該回傳的結果。花點時間去閱讀 query 和
結果。請記得結果和 query 有一樣的基本「形狀」：
結果是 JSON 鍵值對，而 query 是只有 key。

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  renderHere(<MiniGraphiQL schema={global.schema} query={ `
{
  user(id: "1") {
    name
  }
}
`} />);
</script>

你可以編輯上面這個 query；結果會在你做的時候自動地更新。
如果你犯了一個語法錯誤它會用紅色的下劃線標示。試著
用 `id: "2"` 取代 `id: "1"`；用 `id` 或用 `name id` 取代 `name`。

現在你知道 GraphQL query 的樣貌了，你可以 query 你自有的伺服器。
讓我們用簡單的 query 開始

```
{
  user(id: "1") {
    name
  }
}
```

移除在 query 中所有的空白：`{user(id:"1"){name}}` (空白在 GraphQL 是選擇性的)。
你可以藉由一個 GET 請求伴隨一個 URL 查詢字串把這個傳到你的伺服器：
**http://localhost:3000/graphql?query={user(id:"1"){name}}**
- 伺服器應該回應

```javascript
{
  "data": {
    "user": {
      "name": "Dan"
    }
  }
}
```

為了符合標準，這個 query 本身應該被 URL-encode。
如果你從上面的 query 收到一個 GraphQL Syntax Error，試著用被
URL-encode 的版本來取代它：`%7Buser(id:%221%22)%7Bname%7D%7D`。
(你可以在 JavaScript 中用全域的 `encodeURI` function 去 URL-encode 任何字串。)

恭喜！你已經建好了你的第一個 GraphQL 伺服器。試試不同的 query，
或是改變資料，或甚至還可以添加新的欄位到 schema。
