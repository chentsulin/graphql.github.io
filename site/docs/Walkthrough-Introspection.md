---
title: Introspection
layout: ../_core/DocsLayout
category: Walkthrough
permalink: /docs/introspection/
next: /docs/api-reference-graphql/
---

關於查詢的資料是否支援，可以對 GraphQL schema 請求資訊，是相當有用的。GraphQL 允許我們這樣使用自我檢查系統！

在我們的 Star Wars 範例中，[starWarsIntrospection-test.js](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsIntrospection-test.js) 檔案包含一些查詢的展示和自我檢查系統，測試檔案可以執行參考實作的自我檢查系統。

我們設計類型系統，所以我們知道類型是可用的，如果我們沒這麼做的話，我們可以請求 GraphQL，透過查詢 `__schema` ，在一個 Query 的 root 類型總是可以使用。

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  __schema {
    types {
      name
    }
  }
}







`} />);
</script>

哇！有好多種類型！它們是哪一種？讓我們來分類它們：

 - **Query, Character, Human, Episode, Droid** - 這些是我們定義在我們的類型系統之一。
 - **String, Boolean** - 這些是類型系統提供的內建 scalar。
 - **__Schema, __Type, __TypeKind, __Field, __InputValue, __EnumValue,
__Directive** - 這些前面帶有雙底線的，宣告它們是自我檢查系統的一部份。

現在，讓我們嘗找出一個好的地方來探索那些查詢是可用的。當我們設計出類型系統，我們指定何種類型的所有查詢都將開始；讓我們詢問自我檢查系統吧！

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  __schema {
    queryType {
      name
    }
  }
}
`} />);
</script>

配合我們在類型系統部份說的，我們從 `Query` 類型開始！注意在這裡的命名只是慣例；我們可以命名任何我們的 `Query` 類型，它仍然回傳在這裡我們指定查詢的起始類型。命名 `Query` 是一個有用的習慣。

它在檢查一個指定的類型是相當有用的。讓我們看一下 `Droid` 類型：

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  __type(name: "Droid") {
    name
  }
}
`} />);
</script>

如果我們想知道更多關於 Droid，例如，它是一個介面或物件？

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  __type(name: "Droid") {
    name
    kind
  }
}
`} />);
</script>

`kind` 回傳一個 `__TypeKind` enum，其中一個值是 `OBJECT`。如果我們不是詢問關於 `Character`，我們會發現它是一個介面：

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  __type(name: "Character") {
    name
    kind
  }
}
`} />);
</script>

對於了解一個物件它的欄位是否可用是相當有用的，讓我們詢問自我檢查系統關於 `Droid`：

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  __type(name: "Droid") {
    name
    fields {
      name
      type {
        name
        kind
      }
    }
  }
}




`} />);
</script>

這些欄位是我們定義在 `Droid` 的！

`id` 在這看起來有點奇怪，它在類型沒有名稱。那是因為它是一個 `NON_NULL` wrapper。如果我們查詢 `ofType` 對該欄位的類型，我們會發現 `String` 類型，告訴我們它是一個 non-null 字串。

同樣的，`frineds` 和 `appearIn` 兩者都沒有名稱，雖然它們是 `LIST` wrapper 類型。我們可以查詢在那些類型的 `ofType`，將這些列出告訴我們。

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  __type(name: "Droid") {
    name
    fields {
      name
      type {
        name
        kind
        ofType {
          name
          kind
        }
      }
    }
  }
}





`} />);
</script>

讓我們結束自我檢查系統特別有用的功能；讓我們向系統請求文件！

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  __type(name: "Droid") {
    name
    description
  }
}
`} />);
</script>

所以我們可以使用自我檢查存取關於類型系統的文件，並建立文件瀏覽器，或是 rich IDE experiences。

這只是自我檢查系統的表面而已；我們可以對枚舉的值查詢，它的類型是實作哪個介面，甚至更多。我們甚至可以檢查自我檢查系統的本身。更多詳細關於「檢查」部份這個主題的規範，和在 GraphQL.js [introspection](https://github.com/graphql/graphql-js/blob/master/src/type/introspection.js) 目錄包含的程式碼實作規範相容於 GraphQL 自我檢查系統。
