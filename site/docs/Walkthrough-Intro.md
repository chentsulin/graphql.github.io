---
title: Introduction
layout: ../_core/DocsLayout
category: Walkthrough
permalink: /docs/intro/
next: /docs/typesystem/
---

GraphQL 包括一個類型系統、查詢語言和執行語義、靜態驗證、類型自我檢查，每一個會都在後面概述。為了指導你完成這每個 component，我們撰寫了一個範例計畫來說明 GraphQL 的各個部分。這個範例包含在 [GraphQL.js](https://github.com/graphql/graphql-js) 參考實作，作為一組[端對端的測試](https://github.com/graphql/graphql-js/tree/master/src/__tests__)。

這個範例並不完整，不過它的設計是用來可以快速介紹 GraphQL 的核心概念，在深入更多詳細的規範或是 [GraphQL.js](https://github.com/graphql/graphql-js) 參考實作之前，提供一些 context。

這個範例的前提是：我們想要使用 GraphQL 來 query 在原始 Start Wars 三部曲中，人物和位置的相關資訊。
