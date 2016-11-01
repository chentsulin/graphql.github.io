---
title: Validation
layout: ../_core/DocsLayout
category: Walkthrough
permalink: /docs/validation/
next: /docs/introspection/
---

透過使用類型系統，可以預先知道 GraphQL 查詢是否有效。當一個無效的查詢被建立時，允許伺服器和客戶端可以有效的通知開發者，不需要依靠任何在 runtime 的檢查。

在我們的 Star Wars 範例中，[starWarsValidation-test.js](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsValidation-test.js) 檔案包含一些查詢的展示和各種驗證，測試檔案可以執行參考實作的 validator。

首先，讓我們看一個有效的複雜查詢。這是一個巢狀的查詢，類似先前部分的範例，但是重複的欄位被分解成 fragment：

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  hero {
    ...NameAndAppearances
    friends {
      ...NameAndAppearances
      friends {
        ...NameAndAppearances
      }
    }
  }
}

fragment NameAndAppearances on Character {
  name
  appearsIn
}
`} />);
</script>

這個查詢是有效的。讓我們看一些無效的查詢...

fragment 不能引用本身或建立一個週期，這可能會造成無窮的結果！這裡與以上的查詢相同，但沒有明顯的三層巢狀：

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  hero {
    ...NameAndAppearancesAndFriends
  }
}

fragment NameAndAppearancesAndFriends on Character {
  name
  appearsIn
  friends {
    ...NameAndAppearancesAndFriends
  }
}
`} />);
</script>

當我們對欄位查詢時，我們必須對於一個欄位從給定的類型作查詢。所以像是 `hero` 回傳一個 `Character`，我們必須對一個在 `Character` 的欄位做查詢。類型沒有一個 `favoriteSpaceship` 欄位，所以這個查詢是無效的：

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
# INVALID: favoriteSpaceship does not exist on Character
{
  hero {
    favoriteSpaceship
  }
}
`} />);
</script>

每當我們對一個欄位查詢，它回傳 scala 或 enum 以外的東西，我們需要從欄位指定我們想要回傳的資料。Hero 回傳一個 `Character`，然後我們在這也要求像是 `name` 和 `appearsIn` 的欄位；如果我們忽略的話，查詢將不會有效：

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
# INVALID: hero is not a scalar, so fields are needed
{
  hero
}
`} />);
</script>

同樣的，如果欄位是一個 scalar，對於額外欄位的查詢沒有什麼意義，而且這麼做也會使查詢無效：

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
# INVALID: name is a scalar, so fields are not permitted
{
  hero {
    name {
      firstCharacterOfName
    }
  }
}
`} />);
</script>

之前有人指出，一個查詢只能對於在這個類型的欄位做查詢的問題；當我們對 `hero` 查詢回傳一個 `Character`，我們可以只能對存在於 `Character` 的欄位查詢。如果我們想要查詢 R2-D2 的主要功能，會發生什麼事？

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
# INVALID: primaryFunction does not exist on Character
{
  hero {
    name
    primaryFunction
  }
}
`} />);
</script>

查詢是無效的，因為 `primaryFunction` 不是一個在 `Character` 的欄位。我們想要一些表明的方式來取得我們我們想要的 `primaryFunction`，如果 `Character` 欄位不是一個 `Droid` 則忽略該欄位。我們可以使用我們先前介紹的 fragment 來做。透過設定一個 fragment 定義在 `Droid` 並 include 它，我們確保我們在對 `primaryFunction` 查詢時已經被定義。

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  hero {
    name
    ...DroidFields
  }
}

fragment DroidFields on Droid {
  primaryFunction
}
`} />);
</script>

這個查詢是有效的，但是它有點冗長；在上方為 fragment 命名，當我們使用它們多次時，是非常有幫助的，但我們使用它只有一次。不使用一個命名的 fragment，我們可以使用一個 inline fragment；這允許我們來表明我們要查詢的類型，但沒有命名一個獨立的 fragment：

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  hero {
    name
    ... on Droid {
      primaryFunction
    }
  }
}
`} />);
</script>

這只是驗證系統的表面而已；有大量的驗證規則，確保 GraphQL 查詢在語義上是有意義的。在「驗證」部份進入更多關於這個主題的規範，和在 GraphQL.js [validation](https://github.com/graphql/graphql-js/blob/master/src/validation) 目錄包含的程式碼實作規範相容於 GraphQL 驗證。
