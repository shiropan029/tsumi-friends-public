# MediaAPI クラス図 (依存性逆転の原則)

```mermaid
classDiagram
    direction TB

    class MediaApi {
        <<interface>>
        +searchWorks(query, mediaType, limit?) WorkSearchResult[]
        +getWorkDetail(id, mediaType) WorkDetail | null
        +getWorksByIds(works) Map~string, WorkBasicInfo~
        +getWorkKey(workId, mediaType) string
        +uniqueByWork(workStates) T[]
    }

    class tmdbMediaApi {
        +searchWorks(query, mediaType, limit?) WorkSearchResult[]
        +getWorkDetail(id, mediaType) WorkDetail | null
        +getWorksByIds(works) Map~string, WorkBasicInfo~
        +getWorkKey(workId, mediaType) string
        +uniqueByWork(workStates) T[]
    }

    class features {
        <<アプリケーション層>>
        WorkSearchResult
        WorkDetail
        WorkBasicInfo
    }

    class TMDB_API {
        <<external>>
        api.themoviedb.org/3
    }

    MediaApi <|.. tmdbMediaApi : 実装
    tmdbMediaApi --> TMDB_API : HTTP通信
    features --> MediaApi : 依存

    note for MediaApi "アプリケーション層はMediaApiインターフェースにのみ依存する
TMDBの具体的な実装詳細は隠蔽されている"
```

## 設計意図: 依存性逆転の原則 (DIP)

```mermaid
graph LR
    subgraph App["アプリケーション層"]
        Features["features/\n(検索・タイムライン・作品詳細)"]
    end

    subgraph Abstraction["抽象層"]
        Interface["MediaApi\n(インターフェース)"]
    end

    subgraph Infrastructure["インフラ層"]
        TMDB["tmdbMediaApi\n(TMDB実装)"]
        Future["???MediaApi\n(将来の別API実装)"]
    end

    Features -->|"依存"| Interface
    TMDB -->|"実装"| Interface
    Future -.->|"実装"| Interface

    style Interface fill:#f9f,stroke:#333,stroke-width:2px
    style Future fill:#ddd,stroke:#999,stroke-dasharray: 5 5
```

- アプリケーション層は `MediaApi` インターフェースにのみ依存
- TMDB固有の型やAPIの詳細は `tmdbMediaApi` 内に閉じ込められている
- 将来TMDBから別のAPIに切り替える場合、`MediaApi`を実装した新しいオブジェクトを差し替えるだけで対応可能
