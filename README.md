# ミルシェア（仮）
![image](https://github.com/user-attachments/assets/998b06ac-17b5-44f8-aca0-fd10b3bb0e3a)
<br><br><br>

---

## ■ アプリURL
以下のURLから実際の動作を確認できます（※一時的な公開のため、予告なく非公開にする場合があります）

https://tsumi-friends-public.vercel.app
<br><br><br>

---

## ■ アプリ概要

好きな映画・ドラマ・アニメを記録して、趣味の合う人とつながるSNSです。

作品ごとに視聴状態（見たい / 見てる / 見た）を記録し、レビューや評価を残すことができます。

フォローしたユーザーの視聴状態やレビューはタイムラインで確認でき、**「あの人が見ている作品」** を知ることができます。
<br><br><br>

---

## ■ 作った背景

私は「メダリスト」という作品が好きで、友人に布教していましたが、なかなか見てもらえませんでした。

ある時、趣味の合う友人に「こんなに好きな作品が私と一緒なら、絶対メダリストも刺さるよ」と伝えたところ、すんなり見てくれてドハマりしてくれました。

この経験から、**作品を勧めるときに「お互いの好きな作品が一致していること」が大切だ** と気づきました。

互いの好きな作品や視聴状況がわかるSNSがあれば、良い作品を知るきっかけが生まれ、布教もしやすくなるのではないか。そう思い、本アプリを作ることにしました。

また、このプロジェクトは **Next.js / React / Prisma** などのモダンな技術スタックを実践的に習得するという目的もあります。
<br><br><br>

---

## ■ 機能説明

### 作品を検索する

TMDB APIを使用して、アニメ・映画・ドラマを検索できます。作品名で検索し、詳細情報（あらすじ・公開日など）を確認できます。
 ![image](https://github.com/user-attachments/assets/91e1d022-529c-4b99-9c7f-7457b310f4b2)
<br><br><br>

### 視聴状態を記録する

作品ごとに「見たい」「見てる」「見た」の3段階で視聴状態を記録できます。一言メモも合わせて残せます。

また、この記録はタイムラインに公開されます。
 ![image](https://github.com/user-attachments/assets/4ea4ec5b-b029-4dc8-9d60-ddfdb98ea738)
 <br><br><br>

### レビュー・評価を書く

視聴した作品に対して、評価（最高 / 好き / 普通）とレビューを残せます。

また、フォロー中のユーザーのレビューも確認できます。
![image](https://github.com/user-attachments/assets/4b846193-f2d0-4bab-8eaa-19250b2e638e) 
<br><br><br>

### タイムラインでユーザーの活動を確認する

フォロー中のユーザーの視聴状態の更新をタイムライン形式で確認できます。

「あの作品みたんだ！」といった会話のきっかけになることを目指しています。
![image](https://github.com/user-attachments/assets/d65b26b5-2317-4840-a598-2f6c08e76d34)
<br><br><br>

### ユーザーをフォローする

他のユーザーのプロフィールページからフォロー・フォロー解除ができます。

フォロワー・フォロー中の一覧も確認できます。
![image](https://github.com/user-attachments/assets/1751b19b-1242-4ded-9adb-6caf77fac324) 
<br><br><br>

---

## ■ 画面一覧

| アカウント作成 | ログイン |
| ---- | ---- |
| ![image](https://github.com/user-attachments/assets/17a1feab-90e7-4e60-b5c5-22eb8787822b) | ![image](https://github.com/user-attachments/assets/eb21f5d3-7067-4d6d-9a3c-fa9a63359863) |
| ID・パスワードでアカウント作成 | ID・パスワードでログイン |

| プロフィール | プロフィール編集 |
| ---- | ---- |
| ![image](https://github.com/user-attachments/assets/8bf8e6b1-622a-4bb2-b3ae-001d3cc7a467) | ![image](https://github.com/user-attachments/assets/a54d7f5c-3a6f-4456-8629-8ef9be48db17) |
| ユーザー情報・フォロー情報を表示 | ユーザー名・自己紹介・アイコンを編集 |

| 記録 | ライブラリ |
| ---- | ---- |
| ![image](https://github.com/user-attachments/assets/c8437c41-ab8b-4461-bb0a-710d344a02df) | ![image](https://github.com/user-attachments/assets/08407201-e230-4101-a66f-5c687859b1d7) |
| 作品の視聴状態・一言メモの一覧を表示 | 自分が記録した作品を一覧表示 |

| 作品 | 作品状態変更 |
| ---- | ---- |
| ![image](https://github.com/user-attachments/assets/b9c1db13-88ef-481a-952a-04d8d8720db4) | ![image](https://github.com/user-attachments/assets/4ea4ec5b-b029-4dc8-9d60-ddfdb98ea738) |
| 作品の詳細情報・レビューを表示 | 視聴状態と一言メモを投稿 |

| レビュー記入 | タイムライン |
| ---- | ---- |
| ![image](https://github.com/user-attachments/assets/4b846193-f2d0-4bab-8eaa-19250b2e638e) | ![image](https://github.com/user-attachments/assets/d65b26b5-2317-4840-a598-2f6c08e76d34) |
| 作品への評価・レビューを投稿 | フォロー中ユーザーの記録を確認 |

| ユーザー検索 | 作品検索（アニメ・映画・ドラマ） |
| ---- | ---- |
| ![image](https://github.com/user-attachments/assets/4c7c57c7-66bd-44cf-8756-46fc78645b1e) | ![image](https://github.com/user-attachments/assets/91e1d022-529c-4b99-9c7f-7457b310f4b2) |
| ユーザーを部分一致で検索 | TMDB APIを使った作品検索 |

<br><br><br>

---

## ■ 使用技術

| カテゴリ | 技術 |
| ---- | ---- |
| フレームワーク | Next.js 16.1.6 (App Router) |
| UIライブラリ | React 19.2.3 |
| UIコンポーネント | shadcn/ui |
| 言語 | TypeScript 5 |
| スタイリング | Tailwind CSS v4 |
| ORM | Prisma 6 |
| データベース | PostgreSQL (Supabase) |
| 認証 | NextAuth v4 |
| 外部API | TMDB API |
| インフラ | Vercel（ホスティング）/ Supabase（DB・画像ストレージ） |

<br><br><br>

---

## ■ データ構造（ER図）

主なテーブル構成は以下のとおりです。

| テーブル | 説明 |
| ---- | ---- |
| UserAccount | ユーザー情報 |
| UserWorkState | 作品の視聴状態（見たい / 見てる / 見た）・一言コメント |
| UserWorkReview | 作品レビュー・評価 |
| Follow | ユーザー間のフォロー関係 |

 ![image](https://github.com/user-attachments/assets/066877ea-c311-401b-a27a-5f4177835453) 
 
<br><br><br>

---

## ■ ディレクトリ構造

機能単位でディレクトリを分割する設計を採用しています。

```text
src/
├── app/                    # ルーティング定義のみ（ロジックは書かない）
│   ├── (public)/          # 認証前のページ（signin, signup）
│   ├── (app)/             # 認証後のアプリ本体
│   │   ├── profile/[accountId]/   # プロフィール
│   │   ├── search/users/          # ユーザー検索
│   │   ├── search/works/          # 作品検索
│   │   ├── timeline/              # タイムライン
│   │   └── works/[mediaType]/[id]/ # 作品詳細
│   └── api/               # NextAuth
├── components/            # 汎用コンポーネント
│   ├── ui/               # shadcn/uiコンポーネント
│   ├── layouts/          # Header, Sidebarなど
│   ├── elements/         # UserIcon, エラー表示など共通部品
│   └── providers/        # NextAuth SessionProviderのラッパー
├── features/              # 機能単位で分割
│   ├── auth/              # アカウント作成・ログイン
│   ├── profile/           # プロフィール・フォロー
│   ├── search/users/      # ユーザー検索
│   ├── search/works/      # 作品検索
│   ├── timeline/          # タイムライン
│   └── works/             # 作品詳細・レビュー・ステータス
├── lib/                   # 外部ライブラリ設定・汎用処理
└── types/                 # 汎用型定義
```
<br><br><br>

---

## ■ 工夫した点

### 機能単位のディレクトリ設計（Colocation）

「使う場所の近くに置く」というColocationの原則に基づき、`features/` ディレクトリで機能単位にコードを凝集させる設計を採用しました。

各機能ディレクトリに `components/` `actions/` `hooks/` `api/` `types/` をまとめることで、ある機能を修正する際に複数のディレクトリを行き来する必要がなく、影響範囲も明確になります。

`src/app/` はルーティング定義のみとし、ビジネスロジックは `features/` に集約しています。


参考：[Next.js (App Router) のディレクトリ構成＆設計ベストプラクティス - Qiita](https://qiita.com/YushiYamamoto/items/9480b7c5fa5430003cee)

```text
features/works/          # 例: 作品機能
├── components/          # 作品関連のUIコンポーネント
├── actions/             # Server Actions（フォーム処理など）
├── api/                 # データ取得関数（Prismaクエリ）
├── hooks/               # カスタムフック
└── types/               # 作品関連の型定義
```
<br><br><br>

### MediaApiインターフェースによる疎結合設計（依存性逆転の原則）

アニメ・映画・ドラマの情報取得には現在TMDB APIを使用していますが、今後ゲーム・本・音楽など扱うコンテンツを拡張する予定があり、複数のAPIを混在させる可能性があります。

そこで `MediaApi` インターフェースを定義し、アプリケーション層がAPIの具体的な実装に依存しない設計にしました。

実際に開発中に作品情報取得APIを差し替えましたが、MediaApiで抽象化していたためビジネスロジックの変更は発生しませんでした。

今後APIの変更や追加があっても、`MediaApi` を実装した新しいオブジェクトを差し替えるだけで対応できます。
 ![image](https://github.com/user-attachments/assets/17a874f3-3453-4d25-a174-64a8bf5685a0) 
<br><br><br>

---

## ■ 今後の展望

### コンテンツの拡充

現在は映画・ドラマ・アニメの3ジャンルに対応していますが、本・ゲーム・音楽など、より多くのエンタメコンテンツを扱えるようにしたいと考えています。

`MediaApi` インターフェースによる疎結合設計を活かし、新しいジャンルのAPIを追加することで対応する予定です。
<br><br><br>

### 好きな作品の一致度表示

ユーザー間で好きな作品がどれくらい一致するかを数値化し、ユーザー検索時に「趣味が近いユーザー」を見つけやすくしたいと考えています。

本アプリのコンセプトである「趣味の合う人とつながる」を、より直感的に体験できる機能を目指しています。
<br><br><br>

### オススメ機能

相互フォロー関係のユーザーに対して「この作品オススメ！」のような通知を送れる機能を実装したいと考えています。

現在はタイムラインで間接的に作品を知る仕組みですが、能動的に作品を勧められる手段を加えることで、ユーザー間のコミュニケーションをより活性化させたいです。
<br><br><br>

### UIの改善

エンタメコンテンツを扱うアプリとして、現在のシンプルなデザインから、より親しみやすくポップなデザインへ改善したいと考えています。

作品のポスター画像を活かしたビジュアル重視のレイアウトや、視聴状態に応じた色分けなど、使っていて楽しいUIを目指しています。
<br><br><br>

---

## 参考

### UX・UI

開発にあたり、以下のサービス・サイトを参考にしました。

- [Filmarks](https://filmarks.com/)
- [読書メーター](https://bookmeter.com/)
- [Annict](https://annict.com/)
- [Unreal Life - Respect List](https://www.unreal-life.net/respect-list)
- [集英社マンガエキスポ - わたしの推薦図書](https://shueisha-mangaexpo.jp/recommend/)

### 技術
- [Udemy - Next.js入門](https://www.udemy.com/course/nextjs-basic/)
    - Udemyで講座受講後、複数の公式リファレンス・動画・技術ブログ等を参考にしました。
