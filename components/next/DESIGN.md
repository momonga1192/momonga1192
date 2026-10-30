# Arcle リニューアル（アメコミ版）のデザインルール

新デザインのページは `components/next/` にある。
見本は `HomeComic.tsx`（トップ）、`comic.tsx`（コミックの部品）、`parts.tsx`（下層ページの共通部品）。新しいページはこれと同じ書き方・同じ見た目にそろえる。
テイストは「1950〜60年代のアメリカのヒーローコミック」：太い黒線、ずらした影（ぼかさない）、網点、スピード線・集中線、傾けたコマ、黄色のナレーションの箱、吹き出し、効果音。
イラストの決まりごと（登場人物・画風・描き方）は `docs/comic/README.md`。

## 色と書体（index.css の @theme で定義済み）
- 地：紙のクリーム色 `bg-[#FAF3E0]` に網点 `comic-dots`。濃い面は `bg-sumi comic-dots-light`。白い面は `bg-white comic-dots`
- 線と影は墨 `#1F2430` ではなく真っ黒 `#111`（`border-[#111]` / `shadow-[6px_6px_0_#111]`）
- 事業の色：`theme.ts` の `services` の `text` / `bg` / `tint`。事業ページでは札・帯・集中線にその色を使う
- 差し色：`mustard`（からし）`coral`（珊瑚）
- 書体：日本語の見出し・ボタン・札は `font-manga`（M PLUS 1p の極太。小さい字でもつぶれにくい）、英字の効果音・ラベル・数字は `font-comic`（英字は Bangers、数字だけ Luckiest Guy。Bangers の 7 は 1 に見えるため）、本文はそのまま（Noto Sans JP、`font-bold` 多め）
- 大きな見出しは白い文字に黒ぶち：`text-white [paint-order:stroke_fill] [-webkit-text-stroke:8px_#111] [text-shadow:5px_5px_0_#111]`（短く書くなら `comic-outline`）。明るい地の黒い見出しは白ぶち＋からし色の影（`comic-outline-white`、`SectionHead` に設定済み）
- 日本語の見出しには `[word-break:auto-phrase]`

## 形
- コマ：`comic.tsx` の `panel`（`border-[4px] border-[#111] shadow-[8px_8px_0_#111]`）、リンクなら `panelPress`。小さめのカードは `parts.tsx` の `card`（3px）＋ `press`
- 角は丸めない（`rounded-*` は使わない。吹き出しだけ楕円）
- コマは少し傾けてよい（`-rotate-1`〜`rotate-[1.5deg]`）。札・ラベルは `-rotate-2`〜`-rotate-3`
- 斜めのコマ割りは `SlantPanel`（`HomeComic.tsx` のお悩み参照）
- ボタン：`parts.tsx` の `comicBtn` に色を足す（主要 `bg-mustard text-[#111]`、次点 `bg-white text-[#111]`、強調 `bg-coral text-white`）。影の色を変えるなら `comicBtnShape`
- ナレーションの箱 `Caption`（黄色）は、コマの上の辺にまたがせて置く
- 吹き出し `Bubble` の尾は話している人に向ける。顔に少しかかってもよいが、隠さない
- 効果音：ギザギザの `Burst` は1つのセクションに1つまで。ほかは文字だけの `SfxText` か、なし
- 柔らかいぼかしの影・グラデーションの光は使わない
- セクションの余白は `py-20 md:py-28`、横幅は `max-w-6xl mx-auto px-4 sm:px-5`

## 共通部品（parts.tsx）
- `PageHeader`：下層ページの表紙。網点＋スピード線の地に、からし色の集中線のコマ（事業色の英字の札＋白ぶちの太いタイトル）、その下にリード。`image` は右に傾けたコマに入れて、見出しのコマを重ねる。`imageMode`：`panel`（四角い絵。illust-comic の絵）/`cutout`（透過の絵を事業色の集中線のコマからはみ出させる）。省略時は illust-pop なら cutout。`image` がないと、PCだけ右にヒーローが飛んでくる
- `SectionHead`：`ComicHead` と同じ。`enClass={service.text}` でその事業の色の札、`enTone` で札の色を直接指定、`dark` で濃い面用
- `ContactCta`：「CALL ARCLE!」の青い集中線のコマ。受話器を持ったヒーローが右からはみ出す。下層ページは必ずこれで終える
- `PlanCard`：料金のコマ（事業色の網点の帯 → 傾いた値札 → 内容 → ボタン）。おすすめには爆発形「おすすめ!」が付く。料金表は必ずこれを使う
- `Ticker`：斜めに流れる太線のテープ。ページの区切りに1本まで
- `Sticker`（傾いた黄色の札）、`Mark`（見出しの言葉の下に敷く黒ぶちの帯。1見出し1か所まで）、`IconTile`（傾いた四角のアイコン＋番号の札）、`Sparkle`（黒ぶちのキラキラ）
- `comicIllust('名前')`：`public/images/illust-comic/名前.webp` のパス
- ヘッダー・フッター・右下の「IT健康診断」バナーも同じ見た目（`NextHeader.tsx` / `NextFooter.tsx` / `check/CheckBanner.tsx`）

## index.css のアメコミ用ユーティリティ
- `comic-dots` / `comic-dots-light`：網点の地（明るい地用／濃い地用）
- `comic-rays`：集中線の地。色は `[--ray-a:#3B6FE0] [--ray-b:#4A7DEA]` のように2色で
- `comic-speed`：斜めのスピード線。`absolute inset-0` で網点の上に重ねる（色は `--speed`）
- `comic-focus`：中心から放射する白い集中線（絵や見出しの後ろに）
- `comic-outline` / `comic-outline-white`：黒ぶち・白ぶちの太い文字
- `comic-pop`（効果音・吹き出しの飛び出し。部品に組み込み済み）、`comic-shake-hover`、`sfx-shake`、`sfx-droop`

## イラスト（public/images/illust-comic/）
- 事業：`svc-josys` `svc-data` `svc-ai` `svc-web`（横長）。お悩み：`worry-*`（正方形）。理由：`reason-*`。解決の場面：`point`
- 文字・吹き出し・効果音は絵に入れず、ページ側で重ねる。文字を絵の後ろに隠さない

## 文章
- 既存ページの文章・料金・FAQ・SEO（Helmetのtitle・description・canonical・JSON-LD）は内容を変えずに引き継ぐ
- 英語のコミックの言葉は飾りだけ。内容は日本語で伝える
- 誇大な表現は足さない。新しい事実（実績数・資格・料金など）を作らない

## 動き
- `pop-reveal`：画面に入ったらぽんと出す（`PageHeader`・`SectionHead`・`PlanCard`・`ContactCta` は設定済み）。中の `Burst` / `Bubble` / `SfxText` は出たあとに飛び出す
- `pop-tilt`（絵を傾けて持ち上げる）、`pop-float`（浮く）、`pop-wiggle`（札が揺れる）は前と同じ
- 1つの画面で、ずっと動いているもの（float・ticker・効果音のふるえ）は2〜3個まで。prefers-reduced-motion では止まる
- スマホ（390px）で横にはみ出さないこと。斜めのテープ・はみ出す絵は親で `overflow-hidden` か `overflow-x-clip`
