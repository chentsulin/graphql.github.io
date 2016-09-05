---
title: 類型系統
layout: ../_core/DocsLayout
category: Walkthrough
permalink: /docs/typesystem/
next: /docs/queries/
---

任何 GraphQL 實作的核心，是它可以回傳什麼類型物件的描述，這被用 GraphQL 類型系統描述並在 GraphQL 的 Schema 中回傳。

例如我們的 Star Wars 範例，在 GraphQL.js 的 [starWarsSchema.js](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsSchema.js) 檔案定義了這個類型系統。

在系統中最基本的類型是 `Human`，用來代表像是 Like、Leia 和 Han 之類的角色。在我們的類型系統中的所有 human 都會有個 name，所以我們定義 `Human` 類型讓它有一個欄位叫做「name」。它會回傳一個 String，而且我們知道它不是 null（因為所有 `Human` 都有一個 name），所以我們將會定義「name」欄位為一個不允許空值的 String。我們將在規範和文件從頭到尾使用簡寫表示法，我們會把 human 的類型描述成：

```
type Human {
  name: String
}
```

這個簡寫是方便描述一個類型系統的基本形狀；JavaScript 的實作有更全面的功能，並允許類型和欄位可以被文件化。它也在建立了類型系統和底層資料之間的映射；在 GraphQL.js 的測試案例中，底層的資料是一[組 JavaScript 的物件](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsData.js)，但在大多數的情況下，背後的資料會透過一些服務來做存取，這個類型系統層會負責從類型和欄位映射到那些服務。

給予物件一個可以用來重新抓取物件的 ID 是許多 API 中的常見的模式，當然在 GraphQL 也是。因此讓我們把它加到我們的 Human 類型。我們也會為他們的 homePlanet 添加一個 String。

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

我們可能會問一個問題，那就是是否任何的欄位都可以回傳 `null`。預設情況下，在 GraphQL 中，`null` 對於任何的 type 是一個允許的值，因為從抓取資料到滿足一個 GraphQL 查詢經常需要與不同的服務溝通，而這些服務可能可以使用也可能無法使用。不過，如果類型系統可以保證類型永遠不會是 null，那我們可以在類型系統標記為 Non Null。我們透過在我們的簡寫類型後面加入一個「!」來表示它。我們可以更新我們的類型系統來標示 `id` 永遠不會是 null。

請注意在我們現在的實作中，我們可以保證許多欄位不為 null（因為我們目前的實作有寫死的資料），但我們不標記它們為 non-null。你可以想像一個我們最終會用後端服務取代我們的寫死的資料，而後端服務可能不是相當可靠的；藉由保留允許這些欄位可為空值，我們允許最後彈性的回傳 null 來表示後端錯誤，同時也告訴客戶端發生了錯誤。

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

當我們定義一個 schema，我們定義一個是所有 query 的基底的物件類型。習慣上，這個類型的名稱是 `Query`，它描述我們公開、頂層的 API。這個範例的 `Query` 類型看起來會像是這樣：

```
type Query {
  hero(episode: Episode): Character
  human(id: String!): Human
  droid(id: String!): Droid
}
```

這個範例中，在我們的 schema 上可以做三種頂層操作：

 - `hero` 回傳 Star Wars 三部曲的英雄 `Character`；它接受一個可選的參數，允許我們取得特定 episode 的英雄。
 - `human` 接收一個 non-null 的 string 做為一個查詢的參數，一個 human 的 ID 並回傳該 ID 的 human。
 - `droid` 對 droids 做一樣的事。

這些欄位示範了另一個類型系統的功能，對欄位指定參數功能來設定它們的行為。

當我們將整個類型系統包在一起時，定義上述的 `Query` 類型作為查詢的進入點，就可以建立一個 GraphQL Schema。

這個範例只是類型系統的表面而已。規範在「類型系統」部份進到更多關於這個主題的細節，以及在 GraphQL.js 中的 [type](https://github.com/graphql/graphql-js/blob/master/src/type) 目錄包含的程式碼實作了一個與規範相容的 GraphQL 類型系統。
