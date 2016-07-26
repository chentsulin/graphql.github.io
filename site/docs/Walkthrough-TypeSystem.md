---
title: 類型系統
layout: ../_core/DocsLayout
category: Walkthrough
permalink: /docs/typesystem/
next: /docs/queries/
---

任何 GraphQL 實作的核心，是一個它可以回傳什麼類型物件的描述，這被用 GraphQL 類型系統描述並在 GraphQL 的 Schema 中回傳。

例如我們的 Star Wars 範例，在 GraphQL.js 的 [starWarsSchema.js](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsSchema.js) 檔案定義了這個類型系統。

在系統中最基本的類型是 `Human`，用來代表像是 Like、Leia 和 Han 之類的角色。在我們的類型系統中的所有 human 都會有個 name，所以我們定義 `Human` 類型讓它有一個欄位叫做「name」。它會回傳一個 String，而且我們知道它不是 null（因為所有 `Human` 都有一個 name），所以我們將會定義「name」欄位為一個不為空的 String。我們將在規範和文件從頭到尾使用簡寫表示法，我們會把 human 的類型描述成：

```
type Human {
  name: String
}
```

這個簡寫是方便描述一個類型系統的基本形狀；JavaScript 的實作有更全面的功能，並允許類型和欄位可以被記錄。它也在建立了類型系統和底層資料之間的映射；在 GraphQL.js 的測試案例中，底層的資料是一[組 JavaScript 的物件](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsData.js)，但在大多數的情況下，背後的資料會透過一些服務來做存取，這個類型系統層會負責從類型和欄位的 映射到該服務。

在許多 API 中有一個常見的模式，或甚至在 GraphQL 會給予物件一個可以用來重新抓取物件的 ID 。因此讓我們把它加到我們的 Human 類型。我們也會為他們的 homePlanet 添加一個字串。

```
type Human {
  id: String
  name: String
  homePlanet: String
}
```

因為我們正在談論 Start Wars 三部曲，描述每個角色在什麼情節出現會很有幫助。如果要這麼做，我們會先定義一個 enum，它列出在三部曲中的三個 episode：

```
enum Episode { NEWHOPE, EMPIRE, JEDI }
```

現在我們想要添加一個欄位到 `Human` 描述他們是出現在哪個 episode。它將會回傳一個 `Episode` 的列表：

```
type Human {
  id: String
  name: String
  appearsIn: [Episode]
  homePlanet: String
}
```

現在，讓我們來介紹另一個類型，`Droid`：


```
type Droid {
  id: String
  name: String
  appearsIn: [Episode]
  primaryFunction: String
}
```

現在我們有兩個類型了！讓我們添加一個在他們之間連結的方法：human 和 droid 都有朋友。但是 human 可以與 human 和 droid 成為朋友。我們要如何參考到 human 或是 droid？

如果我們仔細看，我們可以注意到在 human 和 droid 之間有共同的功能；他們都有 ID、name、以及出現的 episode。因此我們新增一個 interface，`Character`，並讓 `Human` 和 `Droid` 實作它。一旦我們有了 `Character`，我們可以新增 `friends` 欄位，並回傳一個 `Character` 的列表。

我們的類型系統到目前為止是這樣：

```
enum Episode { NEWHOPE, EMPIRE, JEDI }

interface Character {
  id: String
  name: String
  friends: [Character]
  appearsIn: [Episode]
}

type Human : Character {
  id: String
  name: String
  friends: [Character]
  appearsIn: [Episode]
  homePlanet: String
}

type Droid : Character {
  id: String
  name: String
  friends: [Character]
  appearsIn: [Episode]
  primaryFunction: String
}
```

我們可能會問一個問題，那就是任何的欄位是否會回傳 `null`。預設情況下，在 GraphQL 對於任何的 type，`null` 是一個合法的值，從取得資料到履行，一個 GraphQL 查詢經常需要與不同的服務溝通，這可能可以使用也可能無法使用。然而，如果類型系統可以保證類型永遠不會是 null，然後我們可以在類型系統標記為非 Null。我們透過宣告在我們的簡寫類型後面加入一個「!」。我們可以更新我們的類型系統來提醒 `id` 永遠不為 null。

請注意我們目前的實作，我們可以保證許多欄位不為 null（因為我們目前實作具有 hard-coded data），我們不需要標記它們為非 null。你可以想像一個後端服務最終會取代我們的 hardcoded data，這可能不是相當可靠的；通過將這些欄位為空，允許我們最終回傳的 null 可以更有彈性來宣告後端的錯誤，同時也告訴客戶端發生了錯誤。

```
enum Episode { NEWHOPE, EMPIRE, JEDI }

interface Character {
  id: String!
  name: String
  friends: [Character]
  appearsIn: [Episode]
}

type Human : Character {
  id: String!
  name: String
  friends: [Character]
  appearsIn: [Episode]
  homePlanet: String
}

type Droid : Character {
  id: String!
  name: String
  friends: [Character]
  appearsIn: [Episode]
  primaryFunction: String
}
```

我們還缺少了最後一塊拼圖：一個類型系統的進入點。

當我們定義一個 schema，我們定義成一個物件類型是所有物件類型的基礎。習慣上，這個類型的名稱是 `Query`，並描述我們公開、頂層的 API。我們在這個範例的 `Query` 類型看起來會像是這樣：

```
type Query {
  hero(episode: Episode): Character
  human(id: String!): Human
  droid(id: String!): Droid
}
```

這個範例中，在我們的 schema 可以對三個頂層做操作：

 - `hero` 回傳 `Character` 誰是 Star Wars 三部曲的英雄；它接受一個可選的參數，允許我們取得特定情節的英雄。
 - `human` 接收一個非 null 的 string 做為一個查詢的參數，一個 human 的 ID 並回傳該 human 的 ID。
 - `droid` 相同於 droids。

這些欄位示範了另一個類型系統的特色，對於欄位指定參數功能，設定它們的行為。

當我們將整個類型系統包裝一起時，將上面定義的 `Query` 類型作為查詢的進入點，可以建立一個 GraphQL Schema。

這個範例只是類型系統的表面而已。在「類型系統」部份進入更多關於這個主題的規範，和在 GraphQL.js [type](https://github.com/graphql/graphql-js/blob/master/src/type) 目錄包含的程式碼實作規範相容於 GraphQL 類型系統。
