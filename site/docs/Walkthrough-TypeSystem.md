---
title: Type System
layout: ../_core/DocsLayout
category: Walkthrough
permalink: /docs/typesystem/
next: /docs/queries/
---

在任何位於 GraphQL 的實作中，是什麼樣的物件類型可以回傳說明，描述在一個 GraphQL 類型系統並回傳在 GraphQL 的 Schema。

例如我們的 Star Wars 範例，[starWarsSchema.js](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsSchema.js) 檔案在 GraphQL.js 定義這個類型系統。

在系統中最基本的類型是 `Human`，用來表達像是 Like、Leia 和 Han 的角色。所有人類在我們的類型系統會有個 name，所以我們定義在 `Human` 類型定義一個欄位叫做「name」。這裡會回傳一個 String，我們可以知道它不是 null（因為所有 `Human` 都有一個 name），所我們將會定義「name」欄位為一個不為空的 String。使用一個速記符號，我們將使用整個規範和文件，描述 human 的類型像是：

```
type Human {
  name: String
}
```

這個速記是方便描述一個類型系統的基本型態；JavaScript 執行更全面的功能，並允許類型和欄位可以被記錄。它也在類型系統和底層資料之間設定了 map；在 GraphQL.js 的測試案例中，底層的資料是一組 [JavaScript 的物件](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsData.js)，但在大多數的情況下，後端的資料會透過一些服務來做存取，這個類型系統層會負責從類型和欄位的 map 到該服務。

在許多 APIs 有一個常見的模式，事實上，在 GraphQL 是給予物件一個 ID 可以重新用來取得物件。以讓我們來新增我們的 Human 類型。我們也會為 homePlanet 加入一個字串。

```
type Human {
  id: String
  name: String
  homePlanet: String
}
```

既然我們談到了 Start Wars 三部曲，它會用來描述在每個字元出現的情節。如果要這麼做，我們將定義一個 enum，它列出三個在三部曲內的情節：

```
enum Episode { NEWHOPE, EMPIRE, JEDI }
```

現在我們想要加入一個欄位到 `Human` 描述他們是在哪個情節。它將會回傳一個 `Episode` 的列表：

```
type Human {
  id: String
  name: String
  appearsIn: [Episode]
  homePlanet: String
}
```

現在，讓我們介紹另一個類型，`Droid`：


```
type Droid {
  id: String
  name: String
  appearsIn: [Episode]
  primaryFunction: String
}
```

現在我們有兩個類型了！讓我們在他們之間加入一個方法：humans 和 droids 現在都有朋友了。但是 human 可以與 human 和 droids 成為朋友。我們要如何分辨他們是 human 或是 droid？

如果我們查看一下，我們可以注意到在 humans 和 droids 有共同的功能；他們都有 IDs、names、以及出現在哪個情節。所以我們新增一個 interface，`Character`，並讓 `Human` 和 `Droid` 實作它。一旦我們有了 `Character`，我們可以新增 `friends` 欄位，並回傳一個 `Character` 的列表。

我們的類型系統到目前為止是：

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

有一個問題我們可能會詢問，那就是任何的欄位是否會回傳 `null`。預設情況下，在 GraphQL 對於任何的 type，`null` 是一個合法的值，從取得資料到履行，一個 GraphQL 查詢經常需要與不同的服務溝通，這可能可以使用也可能無法使用。然而，如果類型系統可以保證類型永遠不會是 null，然後我們可以在類型系統標記為非 Null。我們透過宣告在我們的速記類型後面加入一個「!」。我們可以更新我們的類型系統來提醒 `id` 永遠不為 null。

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

我們缺少了最後一塊：一個類型系統的進入點。

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
