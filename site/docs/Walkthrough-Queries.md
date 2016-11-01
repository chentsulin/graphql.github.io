---
title: Queries
layout: ../_core/DocsLayout
category: Walkthrough
permalink: /docs/queries/
next: /docs/validation/
---

GraphQL 查詢是宣告描述發行人希望那些資料可以從被滿足的 GraphQL 查詢中取得。

在我們的 Star Wars 範例中，在 GraphQL.js repository 的 [starWarsQuery-test.js](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsQuery-test.js) 檔案包含一些查詢和 response。這個檔案位於 [starWarsData.js](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsData.js) 是一個測試檔案，在「類型系統」使用 schema 逐步審查和一組樣本資料。這個測試檔案可以執行應用參考實現。

這個 schema 範例查詢會是：

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
query HeroNameQuery {
  hero {
    name
  }
}
`} />);
</script>

在初始化 `query HeroNameQuery`，定義一個查詢操作叫做 `HeroNameQuery`，在這個 `Query` 的情況下，啟動與 schema 的根查詢類型。根據上面的定義，`Query` 有一個 `hero` 欄位會回傳一個 `Character`，所以我們可以為此查詢。`Character` 有一個 `name` 欄位會回傳一個 `String`，所以我們可以完成我們的查詢。

當一個 GraphQL 文件定義多個操作時，指定 `query` keyword 和一個操作名稱是唯一被要求的。因此我們可以撰寫先前的查詢與簡寫的查詢方式：

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  hero {
    name
  }
}
`} />);
</script>

假設回傳給 GraphQL 伺服器的資料確認 R2-D2 作為英雄。response 依然取決於 request；如果我們在這個查詢請求 R2-D2 的 ID 和朋友，然後我們取得一個 response 會像是：

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  hero {
    id
    name
    friends {
      id
      name
    }
  }
}
`} />);
</script>

GraphQL 其中一個關鍵點就是它有能力接受巢狀的查詢。在上方的查詢我們請求 R2-D2 的朋友，但我們可以請求關於每個物件更詳細的資訊。所以讓我們建構一個查詢請求 R2-D2 的朋友，取得他們的名稱和出現的章節，然後請求*他們*每位的朋友，請求結果會在巢狀的 response 中。

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  hero {
    name
    friends {
      name
      appearsIn
      friends {
        name
      }
    }
  }
}
`} />);
</script>

`Query` 類型定義一種方式來取得一個 human 給定他們的 ID。我們可以透過使用 hardcoding 來查詢 ID：

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  human(id: "1000") {
    name
  }
}
`} />);
</script>

另外，我們可以定義查詢所需要的查詢參數：

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
query FetchSomeIDQuery($someId: String!) {
  human(id: $someId) {
    name
  }
}
`} values={{someId: `1000`}} />);
</script>

這個查詢現在透過被參數化的 `$someId`；如果要執行，我們必須提供ID。如果們執行以 `$someId` 作為「1000」執行它，我們可以取得 Luke；提供「1002」，我們可以取得 Han。如果我們在這裡傳送一個無效的 ID，我們會取得 `null` 給 `human`，說明沒有這個物件的存在。如果我們沒有提供 `$someId` 的話，會回傳一個錯誤。在上面的範例，我們設定 `$someId` 為 「1000」執行查詢。

預設上，注意在 response 的欄位名稱的 key。有時候改變這個 key 是相當有用的，當取得帶有不同參數的相同欄位可以更清楚或避免 key 的碰撞。

我們可以做欄位的別名，像是以下的查詢範例：我們將 `human` 欄位的結果別名到 `luke` 這個 key。

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  luke: human(id: "1000") {
    name
  }
}
`} />);
</script>

注意在 response 中的 key 是「luke」而不是「human」，是在我們先前的範例，在這裡我們沒有使用別名。

如果我們想要在相同欄位而且兩次都使用不同參數，這是非常有用的，在下面的查詢我們第一個 key 是 `luke` 而欄位是 `human`，第二個 key 則是 `leia`：

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  luke: human(id: "1000") {
    name
  }
  leia: human(id: "1003") {
    name
  }
}
`} />);
</script>

現在想像我們想要請求 Luke 和 Leia 的家鄉星球。我們可以這麼查詢：

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  luke: human(id: "1000") {
    name
    homePlanet
  }
  leia: human(id: "1003") {
    name
    homePlanet
  }
}
`} />);
</script>

一旦我們新增欄位到這兩個部份的查詢，我們可以看到這可能已經變得難以處理。相反的，我們可以提取共同的欄位到一個 fragment，並在 fragment include fragment，來取得相同的結果。

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  luke: human(id: "1000") {
    ...HumanFragment
  }
  leia: human(id: "1003") {
    ...HumanFragment
  }
}

fragment HumanFragment on Human {
  name
  homePlanet
}
`} />);
</script>

兩個先前的的查詢都取得相同的結果，但是使用 fragment 較不累贅或零碎；如果我們想要增加更多欄位，我們可以加入共同 fragment 而不是複製它到更多地方。

我們在上面定義類型系統，所以我們知道在輸出的每個物件的類型；查詢可以請求該類型使用指定欄位 `__typename`，定義在每個物件。由於 R2-D2 是一個 droid，它將會回傳 `Droid`。

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  hero {
    __typename
    name
  }
}
`} />);
</script>

這是相當有用的，因為 `hero` 被定義回傳一個 `Character`，它是一個 interface；我們或許想要知道實際回傳的具體類型。如果我們不是請求章節五的英雄我們可以找到 Luke，他是一個 `Human`。

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  hero(episode: EMPIRE) {
    __typename
    name
  }
}
`} />);
</script>

隨著類型系統，這個範例只是查詢語言的表面而已。進入更多有關本主題的「Language」部份的詳細規範，和在 GraphQL.js [language](https://github.com/graphql/graphql-js/blob/master/src/language) 目錄包含使用程式碼實作一個符合規範的 GraphQL 查詢語言 parser 和 lexer。
