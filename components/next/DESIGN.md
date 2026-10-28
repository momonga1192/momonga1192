# Arcle リニューアル（ポップ版）のデザインルール

新デザインのページは `components/next/` にある。
見本は `HomePop.tsx`（トップ）と `parts.tsx`（共通部品）。新しいページはこれと同じ書き方・同じ見た目にそろえる。
テイストは「カートゥーン調のステッカー風」：太い輪郭線、ずらした影（ぼかさない影）、傾けたラベル、枠からはみ出すイラスト。

## 色と書体（index.css の @theme で定義済み。Tailwindのクラスで使う）
- 地：`bg-cream`（#FAF8F4）。ドット柄の地は `bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px]`。カードは `bg-white` か `bg-cream`
- 濃い面：`bg-sumi` に光の色を重ねる `bg-[radial-gradient(circle_at_10%_100%,rgb(30_156_140/0.55),transparent_50%),radial-gradient(circle_at_100%_0%,rgb(242_181_68/0.3),transparent_45%)]`。1ページに1〜2か所まで
- 文字：`text-sumi`（墨）、補足：`text-sumi-muted`
- 事業の色：`svc-josys`（青）`svc-data`（藍）`svc-ai`（紫）`svc-web`（マゼンタ #C8509F）。`theme.ts` の `services` に `text` / `bg` / `tint`（薄い背景）/ `border` / `dot` のクラス一式がある。事業ページではその事業の色を主役にする
- 差し色：`mustard`（からし）`coral`（珊瑚）、ずらした影の差し色に青緑 `#1E9C8C`
- 見出しは `font-head font-black`（Zen Kaku Gothic New）、英字は `font-en font-black italic`（Outfit）、本文はそのまま（Noto Sans JP）
- 日本語の見出しには `[word-break:auto-phrase]` を付けて、変な位置で折り返さないようにする

## 形
- 枠と影：`parts.tsx` の `card`（`border-[2.5px] border-sumi shadow-[6px_6px_0_#1F2430]`）。リンクになるカードやボタンには `press` も足す（押すと影の分だけ沈む）
- 小さい要素の枠は `border-2 border-sumi`、影は `shadow-[3px_3px_0_#1F2430]`
- 角丸：カード `rounded-[28px]`、大きな面 `rounded-[40px]`、ボタン `rounded-full`
- ボタン：主要は `bg-sumi text-white border-[2.5px] border-sumi shadow-[5px_5px_0_#F2B544]`（濃い面の上では `bg-mustard text-sumi shadow-[5px_5px_0_#1E9C8C]`）、次点は `bg-white` + `card` + `press`
- 番号やラベルは少し傾ける（`-rotate-3`〜`-rotate-12`）。番号の丸は `bg-coral text-white font-en font-black italic` + 枠と影
- 柔らかいぼかしの影（`shadow-[0_16px_40px_...]`）や、背景の大きな薄い丸は使わない
- 飾りは `Sparkle`（キラキラ）を少しだけ
- セクションの余白は `py-20 md:py-28`、横幅は `max-w-6xl mx-auto px-5`

## 共通部品（parts.tsx）
- `PageHeader`：下層ページの見出し（パンくず付き）。`service` を渡すと事業の色になり、`image` は事業色の面から上にはみ出して置く
- `SectionHead`：セクションの見出し（傾いた英字ステッカー＋日本語見出し＋リード文）。`enClass` はステッカー横のキラキラの色、`dark` で濃い面用
- `ContactCta`：ページ最後の相談への誘導。下層ページは必ずこれで終える
- `Sticker`：傾いた黄色のラベル、`Sparkle`：キラキラ、`card` / `press`：枠と影のクラス
- `PlanCard`：料金プランのカード（事業色の帯 → 帯に重ねた傾いた値札 → 内容 → ボタン）。「〇〇プランの全内容」は自動で黄色のシールになる。料金表は必ずこれを使う
- `Arcs`：4色の弧の装飾（ポップ版ではあまり使わない）

## リンク
- 内部リンクは `<a href="/josys">` のように普通に書く

## イラスト（`illust('名前')` で参照。public/images/illust-pop/ にある透過WebP、カートゥーン調）
- トップ：`hero`（横長）
- 事業のメイン：`svc-josys` `svc-data` `svc-ai` `svc-web`（横長）
- お悩み（困っている人）：`worry-pc` `worry-data` `worry-ai` `worry-web`（正方形）
- 理由：`reason-local` `reason-onestop` `reason-small`（正方形）
- 相談の流れ：`flow-talk` `flow-hearing` `flow-plan` `flow-support`（正方形）
- イラストは枠から少しはみ出させると、このテイストらしくなる
- イラストがない箇所は lucide-react のアイコンを、事業色の角丸の四角（`bg-svc-xxx text-white` + 枠と影、少し傾ける）に置く

## 文章
- 既存ページの文章・料金・FAQ・SEO（Helmetのtitle・description・canonical・JSON-LD）は内容を変えずに引き継ぐ
- 誇大な表現は足さない。新しい事実（実績数・資格・料金など）を作らない

## 目線の流れと文字の迫力（大事）
- 1つのカード・1つのブロックに、目線の入口は1か所だけ。左上にアイコン、右上に番号のように、離れた場所に目立つ要素を2つ置かない
- 番号付きのカードは `IconTile`（アイコンの角に番号シール）を起点にし、「アイコン（＋番号）→ 見出し → 本文 → リンク」と上から一本道で読めるようにする。アイコンがなければ番号そのものを起点にする
- 見出しは大きく太く（`SectionHead` / `PageHeader` は大きめに設定済み）。カードの見出しは `font-head font-black text-xl md:text-2xl` 以上
- 見出しで一番伝えたい言葉は `Mark`（黄色のマーカー）で強調してよい。1つの見出しに1か所まで、1つのセクションで強調は1か所まで
- 料金や数字など、比べてほしい値は大きく（`font-en font-black italic`）。ただし同じカードの中で、見出しより目立つものを2つ以上作らない
- 本文は無理に大きくしない。見出しとの差で迫力を出す

## 動き（遊び心のあるサイトにする。index.css と PopMotion.tsx で定義済み）
- `pop-reveal`：スクロールして画面に入ったら、ぽんと出てくる。カードの並びは `style={{ animationDelay: `${i * 80}ms` }}` で順番に出す。`SectionHead` には最初から付いている
- `pop-tilt`（右に傾けるなら `pop-tilt-r`）：マウスを乗せるとイラストが斜めに傾いて持ち上がる。カード全体を `group` にすると、カードへのマウスオーバーで中のイラストが動く。イラストには基本これを付ける
- `pop-float`：ふわふわ浮く。シール・ラベル・吹き出し・ヒーローや上部のイラストの添え物に。複数並べるときは `[animation-delay:-2s]` などでずらす
- `pop-drift`：部品ごとに違うリズムで浮いて少し傾く。トップのヒーローは、人物と机の土台（`hero/base`）に、切り出した雲・グラフ・画面・ロボットなど（`hero/*`）を重ねて、それぞれ浮かせている。高さ・傾き・秒数は `--drift-y` / `--drift-r` / `--drift-d` で変える
- `pop-wiggle`：マウスを乗せるとぷるっと揺れる。番号のシール・アイコンのタイル・ステッカーに（`group` の中なら、カードへのマウスオーバーで揺れる）
- `pop-twinkle`：キラキラがまたたく。`Sparkle` は標準でまたたく（止めるなら `still`）
- `Ticker`：斜めに流れるテープ。ページの区切りに1本まで。中身は既存の文言（サービス名、ご相談無料 など）だけで作り、新しい事実を足さない
- 動きは「目線を集めたい1か所」を強めるために使う。1つの画面で、同時にずっと動いているもの（float・ticker）は2〜3個まで
- prefers-reduced-motion では自動で止まる
