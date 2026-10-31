# お役立ち記事の書き方（定期の自動作成用）

Orcaの定期実行（automation「お役立ち記事の作成（月・木）」）は、このファイルに従って1回に1本の記事を書き、本番に公開する。
人が手で書くときも同じルールに従う。

## 1. テーマを選ぶ

- `docs/articles/topics.md` の「未着手」のうち、いちばん上のものを書く。
- 書き終えたら、その行を「公開済み」の表に移し、公開日を入れる。
- 未着手が5件以下になったら、同じ形式で新しいテーマを5件以上、末尾に足す。足すときは次を守る。
  - 情シス代行 → データ活用 → 生成AI活用 → Web制作 の順に並べる。
  - 既存記事（`components/articles/ArticlesIndex.tsx` の `articles`）や公開済みのテーマと、検索意図がかぶらないものにする。
  - 中小企業の経営者・総務担当者が実際に検索しそうな悩みにする。
  - 「プロンプト 書き方」「KPI 決め方」「GA4 使い方」のような大きな検索語は避ける。大手メディアと競うことになり、上位に入りにくい。
    代わりに、具体的な場面の悩み（例：「退職者 Microsoft 365 アカウント 削除」「freee Power BI」）を狙う。
  - Arcleの強み（Microsoft 365・Google Workspaceの運用、Power BI・Tableau、freee、AWS、生成AIの社内導入）が活きるテーマを優先する。

## 2. 記事の中身

- 読者：IT担当者がいない中小企業の経営者・総務担当者。専門用語は初出で一言説明する。
- 分量：本文で4,500〜7,000字（check-article の数え方）。見出し（h2）は5〜7個に加え、「まとめ」と「よくある質問（3〜4問）」を入れる。
- 表かチェックリストを最低1つ入れる。手順や判断基準など、読んだあとにすぐ使える形にする。
- 地域名（愛知・東海・一宮など）は `title` と `description` にだけ入れる。本文、`pageTitle`、見出し、FAQには入れない。
- 事実の扱い
  - 料金、プラン名、機能の有無、法律・制度、サポート期限など、変わりうる事実は書く前にWebで公式情報を確認する。確認できなければ具体的な数字や名前を書かず、「最新の情報は公式サイトで確認」と書く。
  - 統計の数字、調査結果、実在する顧客の事例を作らない。例を出すときは「たとえば」と仮の状況にする。
  - 「必ず」「絶対」「検索順位が上がる」のような保証表現を使わない。
- Arcleの宣伝は、本文中の囲み1つと末尾の「関連サービス」だけにする。囲みの文言は、`components/next/theme.ts` と各サービスページ（`components/next/pages/*Next.tsx`）に書かれている内容の範囲で書く。対応していないサービスや料金を作らない。
- 関連記事には、同じタグの既存記事を1〜2本と記事一覧へのリンクを入れる。
- Arcleは個人事業。自分のことは「Arcle」と書き、「当社」「弊社」「スタッフ」「チーム」など会社や複数人を思わせる言い方をしない。
- 文体は「です・ます」。一文を短くし、箇条書きを使いすぎない。

## 3. ファイルの作り方

既存の記事 `components/articles/ArticleWebCompanyGuide.tsx` を雛形にする（Helmet、JSON-LD 3つ、PageHeader、本文、FAQ、関連記事、関連サービス、著者欄）。

- ファイル名：`components/articles/Article<英語のPascalCase>.tsx`
- `title`：検索向けのタイトル。地域名を入れてよい。32字前後。
- `pageTitle`：画面に出す見出し。地域名を入れない。
- `description`：120字前後。地域名を入れてよい。
- `canonical`：`https://www.arcle.net/articles/<slug>`（slugは topics.md のもの）
- `published`：公開日（JST の YYYY-MM-DD）。
- 色のクラスは記事のサービスに合わせる（`text-svc-josys` / `text-svc-data` / `text-svc-ai` / `text-svc-web`）。`services.find((item) => item.key === '<key>')` で取る。

登録する場所は3つ。

1. `App.tsx`：import を記事の import 群の最後に、`<Route path="/articles/<slug>" ...>` を記事の Route 群の最後に足す。
2. `components/articles/ArticlesIndex.tsx`：`articles` 配列の先頭に足す。`title` は pageTitle と同じか短くしたもの（地域名なし）、`tag` は `情シス代行` / `データ活用` / `生成AI` / `Web制作` のどれか。
3. `public/sitemap.xml`：記事のURLを最後の記事の後ろに足す（lastmodは公開日、changefreq monthly、priority 0.7）。`/articles` の lastmod も公開日にする。

## 4. 確認と公開

1. `npm run build` が通ること（prerender まで含む）。
2. `dist/articles/<slug>.html` ができていること。
3. `node scripts/check-article.mjs <slug>` がすべて OK になること（title・description・canonical・h1・字数・本文の地域名・sitemap）。
4. コミットメッセージは1行の日本語（例：「お役立ち記事『〜』を追加」）。Co-Authored-By は入れない。
5. `git push origin HEAD:main` で公開する（Vercelが自動でデプロイする）。
6. プッシュ後、`gh api repos/momonga1192/momonga1192/commits/<sha>/statuses --jq '.[0].state'` が success になるまで数分おきに確認し、`curl -s https://www.arcle.net/articles/<slug>` で公開を確かめる。
7. 失敗したときは、本番に壊れたものを出さないことを優先する。ビルドが通らないものはプッシュしない。
