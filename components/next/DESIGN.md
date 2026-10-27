# Arcle リニューアル（A案「やさしいテクノロジー」）のデザインルール

新デザインのページは `components/next/` にある。
見本は `HomeNext.tsx`（トップ）と `parts.tsx`（共通部品）。新しいページはこれと同じ書き方・同じ見た目にそろえる。

## 色と書体（index.css の @theme で定義済み。Tailwindのクラスで使う）
- 地：`bg-cream`（#FAF8F4）、区切り：`bg-cream-dark`、カードは `bg-white`
- 文字：`text-sumi`（墨）、補足：`text-sumi-muted`、罫線：`border-warm-line`
- 事業の色：`svc-josys`（青）`svc-data`（藍）`svc-ai`（紫）`svc-web`（青緑）。`theme.ts` の `services` に `text` / `bg` / `tint`（薄い背景）/ `border` / `dot` のクラス一式がある。事業ページではその事業の色を主役にする
- 差し色：`mustard`（からし）`coral`（珊瑚）。強調のマーカー、番号の丸、ボタンなどに少量
- 見出しは `font-head`（Zen Kaku Gothic New）、英字ラベルは `font-en`（Outfit）、本文はそのまま（Noto Sans JP）
- 日本語の見出しには `[word-break:auto-phrase]` を付けて、変な位置で折り返さないようにする

## 形
- 角丸は大きめ：カード `rounded-[28px]`、大きな面 `rounded-[40px]`、ボタン `rounded-full`
- ボタン：主要は `bg-sumi text-white`（濃い背景の上では `bg-mustard text-sumi`）、次点は `border-2 border-sumi`
- 背景に大きな丸い色面（`rounded-full` + `bg-svc-xxx/10` など）を置いてリズムを出す
- 影は `shadow-[0_16px_40px_rgb(31_36_48/0.08)]` 程度の柔らかいものだけ
- セクションの余白は `py-20 md:py-28`、横幅は `max-w-6xl mx-auto px-5`

## 共通部品（parts.tsx）
- `PageHeader`：下層ページの見出し（パンくず付き）。`service` を渡すと事業の色になり、`image` でイラストを右に置ける
- `SectionHead`：セクションの見出し（英字ラベル＋日本語見出し＋リード文）。`enClass` で英字ラベルの色を事業色にする
- `ContactCta`：ページ最後の相談への誘導。下層ページは必ずこれで終える
- `Arcs`：4色の弧の装飾

## リンク
- 内部リンクは `<a href="/josys">` のように普通に書く

## イラスト（`illust('名前')` で参照。public/images/illust/ にある透過WebP）
- 事業のメイン：`svc-josys` `svc-data` `svc-ai` `svc-web`（横長4:3）
- お悩み：`worry-pc` `worry-data` `worry-ai` `worry-web`（正方形）
- 理由：`reason-local` `reason-onestop` `reason-small`（正方形）
- 相談の流れ：`flow-talk` `flow-hearing` `flow-plan` `flow-support`（正方形）
- イラストがない箇所は lucide-react のアイコンを、事業色の薄い丸（`dot`）の上に置く

## 文章
- 既存ページの文章・料金・FAQ・SEO（Helmetのtitle・description・canonical・JSON-LD）は内容を変えずに引き継ぐ
- 誇大な表現は足さない。新しい事実（実績数・資格・料金など）を作らない
