// 資料PDF「IT担当がいない会社のための はじめてのDX読本」を作る
// 文章はサイトのデータ（事業・診断の質問と結果・モデルケース）から取るので、サイトを直したら作り直す
//
// 使い方: PLAYWRIGHT_CORE=/path/to/playwright-core SHARP=/path/to/sharp node scripts/dx-guide/build.mjs
//   playwright-core と sharp はこのリポジトリの依存に入れていない（Vercelのビルドを重くしないため）。手元にあるものを指定する
//   出力: public/docs/ に PDF、scripts/dx-guide/guide.html に確認用のHTML
import { build } from 'esbuild';
import { createRequire } from 'module';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
export const PDF_NAME = 'arcle-dx-guide-k7m2.pdf';

// --- サイトのデータを読み込む ---
const entry = `
import { services, prices } from './components/next/theme';
import { areas, choices } from './components/next/check/checkData';
import { publishedWorks } from './components/works/worksData';
export { services, prices, areas, choices, publishedWorks };
`;
const bundled = await build({ stdin: { contents: entry, resolveDir: root, loader: 'ts' }, bundle: true, platform: 'node', format: 'esm', write: false, logLevel: 'warning' });
const tmp = join(here, '.data.mjs');
writeFileSync(tmp, bundled.outputFiles[0].text);
const { services, prices, areas, publishedWorks } = await import(pathToFileURL(tmp).href + `?t=${Date.now()}`);

// イラストは原寸だとPDFが重くなるので、載せる大きさに合わせて縮めたPNGを使う
const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP || 'sharp');
const imgDir = join(here, '.img');
mkdirSync(imgDir, { recursive: true });
const imgWidth = (name) => (name === 'hero' ? 1100 : name.startsWith('svc-') ? 620 : 460);
const used = new Set();
const img = (name) => {
  used.add(name);
  return pathToFileURL(join(imgDir, `${name}.png`)).href;
};
const qr = pathToFileURL(join(root, 'public/images/qr-arcle.svg')).href;
const svc = Object.fromEntries(services.map((s) => [s.key, s]));
const color = { josys: '#3B6FE0', data: '#5B5BD6', ai: '#8E5BD0', web: '#C8509F' };
const caseSlugs = ['textile-josys-pc-management', 'wholesale-powerbi-dashboard', 'construction-chatgpt-guideline', 'dental-clinic-website-renewal'];
const cases = caseSlugs.map((slug) => publishedWorks.find((w) => w.slug === slug)).filter(Boolean);
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const sparkle = (c, size = 22, style = '') =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" style="${style}"><path d="M12 0c.9 6.4 5.1 10.6 12 12-6.9 1.4-11.1 5.6-12 12-.9-6.4-5.1-10.6-12-12C6.9 10.6 11.1 6.4 12 0z" fill="${c}"/></svg>`;
const sticker = (t, extra = '') => `<span class="sticker" style="${extra}">${t}</span>`;

let pageNo = 0;
const page = (body, { cls = '', number = true } = {}) => {
  pageNo++;
  return `<section class="page ${cls}">${body}${number ? `<footer class="pf"><span>はじめてのDX読本</span><span class="en">${String(pageNo).padStart(2, '0')}</span></footer>` : ''}</section>`;
};

const head = (en, title, lead = '') => `
  <div class="head">
    ${sticker(en)}
    <h2>${title}</h2>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>`;

// --- ページ ---
const pages = [];

// 1. 表紙
pages.push(
  page(
    `
  <div class="cover">
    <div class="cover-top">
      ${sticker('FREE GUIDE', 'font-size:15px')}
      <p class="cover-pre">IT担当がいない会社のための</p>
      <h1>はじめての<br><span class="mark">DX読本</span></h1>
      <p class="cover-sub">何から始める？ 4つの分野と、進める順番がわかる</p>
    </div>
    <div class="cover-art">
      <div class="cover-card"></div>
      <img src="${img('hero')}" alt="">
      ${sparkle('#F2B544', 46, 'position:absolute;right:8mm;top:-6mm')}
      ${sparkle('#C8509F', 26, 'position:absolute;left:4mm;top:10mm')}
    </div>
    <div class="cover-foot">
      <span class="logo">Arcle</span>
      <span>愛知・東海の中小企業の「IT部門」として、PC・データ・AI・Webをまとめてお手伝いしています</span>
      <img class="cover-qr" src="${qr}" alt="">
    </div>
  </div>`,
    { cls: 'dots', number: false }
  )
);

// 2. はじめに・もくじ
const toc = [
  ['こんな「困った」ありませんか？', 3],
  ['DXは「4つの分野」で考える', 4],
  ['進める順番', 5],
  ['分野ごとのチェックと、まずやること', 6],
  ['セルフチェックシート（20問）', 10],
  ['支援のモデルケース', 11],
  ['料金の目安と、ご相談の流れ', 12]
];
pages.push(
  page(`
  ${head('Introduction', 'はじめに')}
  <div class="intro">
    <p>「DX」と聞くと、大きな会社が大きなお金をかけてやるもの、と思われがちです。</p>
    <p>でも、IT担当者がいない中小企業にとってのDXは、もっと身近なことから始まります。PCやアカウントをきちんと管理する。毎月の集計を手作業でなくす。生成AIで文章づくりを楽にする。ホームページを最新にする。</p>
    <p>この読本では、会社のITを<b>「守り」「見える化」「効率化」「発信」の4つの分野</b>に分けて、それぞれの「よくある状態」と「まずやること」をまとめました。最後のセルフチェックシートで、御社の得意と苦手を確かめてみてください。</p>
  </div>
  <div class="toc card">
    <p class="toc-title">もくじ</p>
    <ol>
      ${toc.map(([t, p]) => `<li><span>${t}</span><i></i><b class="en">${String(p).padStart(2, '0')}</b></li>`).join('')}
    </ol>
  </div>
  <img class="intro-art" src="${img('flow-talk')}" alt="">`)
);

// 3. 困りごと
pages.push(
  page(`
  ${head('Worries', 'こんな「困った」<span class="mark">ありませんか？</span>', 'IT担当者がいない会社で、よく聞くお悩みです。ひとつでも当てはまれば、この読本がお役に立ちます。')}
  <div class="grid2 worries">
    ${services
      .map(
        (s) => `
      <div class="card worry">
        <img src="${img(`worry-${s.key === 'josys' ? 'pc' : s.key}`)}" alt="">
        <p class="worry-text">${esc(s.worry).replace(/\n/g, '<br>')}</p>
        <span class="chip" style="background:${color[s.key]}">${s.name}</span>
      </div>`
      )
      .join('')}
  </div>`)
);

// 4. 4つの分野
const areaDesc = {
  josys: 'PC・アカウント・セキュリティを整えて、トラブルや情報漏えいを防ぐ。すべての土台です。',
  data: '売上や在庫などの数字を集めて、いつでも見られるようにする。判断が速くなります。',
  ai: '生成AIで、文章づくりや資料探しなどの作業時間を減らす。ルールづくりから始めます。',
  web: 'ホームページで、会社の強みや最新の情報を伝える。問い合わせや採用につながります。'
};
pages.push(
  page(`
  ${head('4 Areas', 'DXは<span class="mark">「4つの分野」</span>で考える', 'むずかしく考えず、会社のITを4つに分けてみましょう。どこが得意で、どこが手薄かが見えてきます。')}
  <div class="grid2 areas4">
    ${areas
      .map(
        (a, i) => `
      <div class="card area4">
        <div class="area4-top">
          <span class="num en" style="background:${color[a.key]}">${i + 1}</span>
          <div><p class="area4-short" style="color:${color[a.key]}">${a.short}</p><h3>${a.label}</h3></div>
        </div>
        <p>${areaDesc[a.key]}</p>
        <img src="${img(`svc-${a.key}`)}" alt="">
      </div>`
      )
      .join('')}
  </div>`)
);

// 5. 進める順番
const steps = [
  ['josys', '守りを固める', '土台がないままでは、データやAIを安心して使えません。まずはPCやアカウントの管理から。'],
  ['data', '数字を見える化する', '数字がそろうと、どの業務に時間がかかっているか、どこを楽にすべきかが分かります。'],
  ['ai', 'AIで効率化する', 'ルールを決めてから使えば安心です。文章づくりや資料探しの時間を減らします。'],
  ['web', 'Webで発信する', '整った会社の強みや実績を、ホームページで伝えます。問い合わせや採用につながります。']
];
pages.push(
  page(`
  ${head('Roadmap', 'おすすめの<span class="mark">進める順番</span>', '4つの分野は、この順番で進めるとムダがありません。')}
  <div class="road">
    ${steps
      .map(
        ([k, t, d], i) => `
      <div class="road-step">
        <span class="road-num en" style="background:${color[k]}">STEP ${i + 1}</span>
        <div class="card road-card">
          <h3 style="color:${color[k]}">${t}</h3>
          <p>${d}</p>
        </div>
      </div>`
      )
      .join('<div class="road-arrow">▼</div>')}
  </div>
  <div class="note card">
    ${sparkle('#F2B544', 26, 'flex-shrink:0')}
    <p><b>いちばん困っている分野から始めても大丈夫です。</b>ただし、守り（PC・セキュリティ）が手薄なときは、先に固めておくと安心です。どこから手をつけるか迷ったら、無料相談で一緒に整理します。</p>
  </div>`)
);

// 6〜9. 分野ごと
const levelName = { low: 'これから', mid: 'もう一歩', high: 'できている' };
areas.forEach((a, i) => {
  const s = svc[a.key];
  pages.push(
    page(
      `
  <div class="area-band" style="background:${color[a.key]}">
    <div>
      <span class="area-no en">AREA ${i + 1}</span>
      <p class="area-short">${a.short}</p>
      <h2>${a.label}</h2>
    </div>
    <img src="${img(`svc-${a.key}`)}" alt="">
  </div>
  <div class="area-body">
    <h3 class="sub"><span class="dot" style="background:${color[a.key]}"></span>チェックしてみましょう</h3>
    <ul class="checks card">
      ${a.questions.map((q) => `<li><span class="box"></span>${q}</li>`).join('')}
    </ul>
    <h3 class="sub"><span class="dot" style="background:${color[a.key]}"></span>状態に合わせた「まずやること」</h3>
    <div class="levels">
      ${['low', 'mid', 'high']
        .map(
          (lv) => `
        <div class="card level">
          <span class="level-tag" style="${lv === 'low' ? `background:${color[a.key]};color:#fff` : lv === 'mid' ? 'background:#F2B544' : 'background:#fff'}">${levelName[lv]}</span>
          <p class="level-text">${a.results[lv].text}</p>
          <ol>${a.results[lv].todo.map((t) => `<li>${t}</li>`).join('')}</ol>
        </div>`
        )
        .join('')}
    </div>
    <div class="support" style="border-color:${color[a.key]}">
      <div>
        <p class="support-label">Arcleの「${s.name}」</p>
        <p class="support-lead">${s.lead}</p>
        <p class="support-points">${s.points.map((p) => `<span>✓ ${p}</span>`).join('')}</p>
      </div>
      <div class="support-price">
        <span>料金の目安</span>
        <b style="color:${color[a.key]}">${prices[a.key]}</b>
      </div>
    </div>
  </div>`,
      { cls: 'area-page' }
    )
  );
});

// 10. セルフチェックシート
let q = 0;
pages.push(
  page(`
  <div class="tight">${head('Self Check', '<span class="mark">セルフチェックシート</span>', '当てはまるものに○をつけて、分野ごとに合計してください。「できている」2点・「一部だけ」1点・「できていない・わからない」0点です。')}</div>
  <table class="sheet">
    <thead><tr><th class="q">質問</th><th>できている<br><small>2点</small></th><th>一部だけ<br><small>1点</small></th><th>できていない<br><small>0点</small></th></tr></thead>
    ${areas
      .map(
        (a) => `
      <tbody>
        <tr class="sheet-area"><td colspan="4" style="background:${color[a.key]}">${a.label}<span>（${a.short}）</span></td></tr>
        ${a.questions.map((text) => `<tr><td class="q"><b class="en">Q${++q}</b>${text}</td><td></td><td></td><td></td></tr>`).join('')}
        <tr class="sheet-sum"><td class="q">合計</td><td colspan="3"><span class="blank"></span> / 10点　ランク <span class="blank short"></span></td></tr>
      </tbody>`
      )
      .join('')}
  </table>
  <div class="ranks">
    <p><b>ランクの目安</b>　<span>S：9〜10点</span><span>A：8点</span><span>B：6〜7点</span><span>C：4〜5点</span><span>D：0〜3点</span></p>
    <p class="web-check">Webでも診断できます（レーダーチャートつき）　<b class="en">arcle.net/it-check</b></p>
  </div>`)
);

// 11. モデルケース
pages.push(
  page(`
  ${head('Cases', '支援の<span class="mark">モデルケース</span>', 'よくあるご相談をもとにした、架空のモデルケースです。企業名・数値は説明のためのものです。')}
  <div class="grid2 cases">
    ${cases
      .map((w) => {
        const key = { 情シス代行: 'josys', データ活用: 'data', 生成AI: 'ai', Web制作: 'web' }[w.service];
        const m = w.metrics[0];
        return `
      <div class="card case">
        <p class="case-meta"><span class="chip" style="background:${color[key]}">${w.service}</span>${w.industry}・${w.employees}</p>
        <h3>${w.title}</h3>
        <p class="case-sum">${w.summary}</p>
        ${m ? `<div class="metric"><span class="metric-label">${m.label}</span><span class="metric-val"><s>${m.before}</s> → <b style="color:${color[key]}">${m.after}</b></span></div>` : ''}
      </div>`;
      })
      .join('')}
  </div>`)
);

// 12. 料金と相談の流れ
const flow = [
  ['flow-talk', 'お問い合わせ', 'フォームからお気軽にご連絡ください。うまく説明できない段階でも大丈夫です。'],
  ['flow-hearing', '無料相談', '現状の課題や目標をお聞きし、解決策を整理します。訪問・オンラインどちらも対応します。'],
  ['flow-plan', 'ご提案・お見積り', 'プランとスケジュール、明確な費用をご提示します。ご納得いただけるまで調整します。'],
  ['flow-support', 'ご契約・開始', '始まってからも、困ったときにすぐ相談できる距離で伴走します。']
];
pages.push(
  page(`
  ${head('Price & Flow', '料金の目安と、<span class="mark">ご相談の流れ</span>')}
  <div class="prices">
    ${services
      .map(
        (s) => `
      <div class="card price" style="border-top:8px solid ${color[s.key]}">
        <p class="price-name">${s.name}</p>
        <p class="price-val" style="color:${color[s.key]}">${prices[s.key]}</p>
      </div>`
      )
      .join('')}
  </div>
  <p class="small">※料金は税抜です。内容や会社の規模に合わせてお見積りします。ご相談・お見積りは無料です。</p>
  <div class="flow">
    ${flow
      .map(
        ([im, t, d], i) => `
      <div class="card flow-step">
        <span class="num en">${i + 1}</span>
        <img src="${img(im)}" alt="">
        <h3>${t}</h3>
        <p>${d}</p>
      </div>`
      )
      .join('')}
  </div>`)
);

// 13. 裏表紙
pages.push(
  page(
    `
  <div class="back">
    <div class="back-card">
      ${sticker('Contact', 'font-size:14px')}
      <h2>「何から相談すればいいか<br>わからない」でも大丈夫です。</h2>
      <p>いまの困りごとをお聞きして、やるべきことの順番から一緒に整理します。ご相談・お見積りは無料です。東海エリアは訪問にも対応します。</p>
      <div class="back-cta">無料相談のお申し込み　<b class="en">arcle.net/contact</b></div>
      <img src="${img('check-book')}" alt="">
    </div>
    <div class="back-info">
    <dl class="company">
      <div><dt>会社名</dt><dd>Arcle（アークル）</dd></div>
      <div><dt>代表</dt><dd>栗原 勇太</dd></div>
      <div><dt>所在地</dt><dd>〒491-0835 愛知県一宮市あずら2丁目8</dd></div>
      <div><dt>Web</dt><dd class="en">https://www.arcle.net</dd></div>
      <div><dt>事業</dt><dd>情シス代行・データ活用・生成AI活用・Web制作</dd></div>
    </dl>
    <div class="qr-box"><img src="${qr}" alt=""><p>サイトはこちら</p></div>
    </div>
    <p class="back-logo"><span class="logo">Arcle</span></p>
  </div>`,
    { cls: 'dots', number: false }
  )
);

const css = `
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: 'Noto Sans JP', sans-serif; color: #1F2430; background: #ddd; font-size: 11pt; line-height: 1.75; }
.page { width: 210mm; height: 297mm; overflow: hidden; position: relative; background: #FAF8F4; padding: 18mm 16mm 20mm; page-break-after: always; margin: 0 auto; }
.dots { background-color: #FAF8F4; background-image: radial-gradient(#1F243018 1.6px, transparent 1.6px); background-size: 6mm 6mm; }
h1, h2, h3, .toc-title { font-family: 'Zen Kaku Gothic New', sans-serif; font-weight: 900; line-height: 1.35; }
.en { font-family: 'Outfit', sans-serif; font-weight: 900; font-style: italic; }
.sticker { display: inline-block; transform: rotate(-3deg); background: #F2B544; padding: 1px 12px; border-radius: 8px; font-family: 'Outfit', sans-serif; font-weight: 900; font-style: italic; letter-spacing: .12em; text-transform: uppercase; font-size: 12px; box-shadow: 3px 3px 0 #1E9C8C; }
.mark { background: linear-gradient(transparent 58%, #F2B544 58%, #F2B544 92%, transparent 92%); padding: 0 .1em; }
.card { background: #fff; border: 2.5px solid #1F2430; border-radius: 6mm; box-shadow: 4px 4px 0 #1F2430; }
.chip { display: inline-block; color: #fff; font-weight: 900; font-size: 9pt; padding: 1px 10px; border-radius: 99px; border: 2px solid #1F2430; }
.pf { position: absolute; left: 16mm; right: 16mm; bottom: 9mm; display: flex; justify-content: space-between; font-size: 8pt; color: #6B7080; border-top: 1.5px solid #1F243020; padding-top: 2mm; }
.pf .en { font-size: 11pt; color: #1F2430; }
.head { margin-bottom: 8mm; }
.head h2 { font-size: 25pt; margin-top: 4mm; }
.head .lead { margin-top: 3mm; color: #50566A; font-size: 10.5pt; }
.small { font-size: 8.5pt; color: #6B7080; margin-top: 3mm; }

.cover { height: 100%; display: flex; flex-direction: column; }
.cover-pre { margin-top: 10mm; font-family: 'Zen Kaku Gothic New'; font-weight: 900; font-size: 17pt; }
.cover h1 { font-size: 54pt; line-height: 1.2; margin-top: 2mm; }
.cover-sub { margin-top: 5mm; font-weight: 700; font-size: 13pt; }
.cover-art { position: relative; margin-top: 22mm; height: 118mm; }
.cover-card { position: absolute; left: 0; right: 0; bottom: 0; height: 92mm; border-radius: 10mm; background: #1F2430 radial-gradient(circle at 15% 100%, rgb(30 156 140 / .6), transparent 55%); border: 2.5px solid #1F2430; box-shadow: 6px 6px 0 #F2B544; }
.cover-art img { position: absolute; left: 50%; bottom: -4mm; width: 112%; transform: translateX(-50%); }
.cover-foot { margin-top: auto; display: flex; align-items: center; gap: 5mm; font-size: 9pt; color: #50566A; }
.logo { font-family: 'Outfit'; font-weight: 900; font-style: italic; font-size: 24pt; color: #1F2430; letter-spacing: -.02em; }

.intro p { margin-bottom: 3.5mm; font-size: 11pt; line-height: 1.95; }
.toc { margin-top: 8mm; padding: 7mm 9mm; width: 120mm; }
.toc-title { font-size: 14pt; margin-bottom: 3mm; }
.toc ol { list-style: none; }
.toc li { display: flex; align-items: baseline; gap: 3mm; padding: 1.6mm 0; font-weight: 700; }
.toc li i { flex: 1; border-bottom: 2px dotted #1F243040; }
.intro-art { position: absolute; right: 10mm; bottom: 22mm; width: 62mm; }

.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 7mm; }
.worry { padding: 5mm 6mm 6mm; text-align: center; }
.worry img { width: 52mm; height: 52mm; object-fit: contain; }
.worry-text { font-family: 'Zen Kaku Gothic New'; font-weight: 900; font-size: 12pt; line-height: 1.6; margin: 2mm 0 3mm; }

.area4 { padding: 6mm; position: relative; overflow: hidden; }
.area4-top { display: flex; gap: 3mm; align-items: center; }
.area4 .num { display: grid; place-items: center; width: 11mm; height: 11mm; border-radius: 3mm; color: #fff; font-size: 16pt; border: 2.5px solid #1F2430; transform: rotate(-6deg); }
.area4-short { font-weight: 900; font-size: 9.5pt; }
.area4 h3 { font-size: 15pt; }
.area4 p { font-size: 10pt; margin-top: 3mm; line-height: 1.8; }
.area4 img { width: 100%; height: 48mm; object-fit: contain; margin-top: 2mm; }

.road { display: flex; flex-direction: column; align-items: stretch; }
.road-step { display: flex; align-items: center; gap: 5mm; }
.road-num { flex-shrink: 0; width: 30mm; text-align: center; color: #fff; padding: 3mm 0; border-radius: 4mm; border: 2.5px solid #1F2430; font-size: 13pt; transform: rotate(-3deg); box-shadow: 3px 3px 0 #1F2430; }
.road-card { flex: 1; padding: 5mm 7mm; }
.road-card h3 { font-size: 15pt; }
.road-card p { font-size: 10pt; margin-top: 1mm; }
.road-arrow { text-align: center; width: 30mm; color: #1F243050; font-size: 13pt; line-height: 1.6; }
.note { margin-top: 9mm; padding: 5mm 7mm; display: flex; gap: 4mm; align-items: flex-start; background: #FFF6DF; font-size: 10pt; }

.area-page { padding: 0 0 20mm; }
.area-band { height: 62mm; padding: 12mm 16mm 0; color: #fff; display: flex; justify-content: space-between; border-bottom: 2.5px solid #1F2430; position: relative; }
.area-no { font-size: 12pt; background: #F2B544; color: #1F2430; padding: 1px 10px; border-radius: 6px; display: inline-block; transform: rotate(-3deg); }
.area-short { font-weight: 900; margin-top: 3mm; opacity: .9; }
.area-band > div { position: relative; z-index: 1; }
.area-band h2 { font-size: 28pt; text-shadow: 2px 2px 0 #1F243040; }
.area-band img { position: absolute; right: 6mm; bottom: -8mm; height: 62mm; max-width: 88mm; object-fit: contain; object-position: right bottom; }
.area-body { padding: 8mm 16mm 0; }
.sub { font-size: 13pt; display: flex; align-items: center; gap: 2.5mm; margin: 0 0 3mm; }
.sub .dot { width: 4mm; height: 4mm; border-radius: 99px; border: 2px solid #1F2430; }
.checks { list-style: none; padding: 3mm 6mm; margin-bottom: 7mm; }
.checks li { display: flex; gap: 3mm; align-items: flex-start; padding: 1.5mm 0; font-size: 10pt; font-weight: 700; border-bottom: 1.5px dashed #1F243020; }
.checks li:last-child { border-bottom: 0; }
.box { flex-shrink: 0; width: 4.5mm; height: 4.5mm; border: 2px solid #1F2430; border-radius: 1.2mm; margin-top: 1mm; background: #fff; }
.levels { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; }
.level { padding: 5mm 4mm 4mm; position: relative; box-shadow: 3px 3px 0 #1F2430; }
.level-tag { position: absolute; top: -3.5mm; left: 4mm; font-weight: 900; font-size: 9pt; padding: 0 9px; border-radius: 6px; border: 2px solid #1F2430; transform: rotate(-3deg); }
.level-text { font-size: 8.5pt; line-height: 1.7; color: #50566A; min-height: 26mm; }
.level ol { margin-top: 2mm; padding-left: 4.5mm; font-size: 8.8pt; font-weight: 700; line-height: 1.6; }
.level li { margin-bottom: 1mm; }
.support { margin-top: 7mm; border: 2.5px solid; border-radius: 6mm; background: #fff; padding: 5mm 6mm; display: flex; gap: 5mm; align-items: center; }
.support-label { font-family: 'Zen Kaku Gothic New'; font-weight: 900; font-size: 12pt; }
.support-lead { font-size: 9pt; color: #50566A; margin-top: 1mm; line-height: 1.7; }
.support-points { margin-top: 1.5mm; font-size: 8.8pt; font-weight: 700; display: flex; flex-wrap: wrap; gap: 0 4mm; }
.support-price { flex-shrink: 0; text-align: center; background: #FAF8F4; border: 2px solid #1F2430; border-radius: 4mm; padding: 3mm 4mm; transform: rotate(2deg); }
.support-price span { display: block; font-size: 8pt; font-weight: 700; }
.support-price b { font-family: 'Zen Kaku Gothic New'; font-weight: 900; font-size: 13pt; white-space: nowrap; }

.tight .head { margin-bottom: 4mm; }
.tight .head h2 { font-size: 21pt; margin-top: 3mm; }
.tight .head .lead { font-size: 9pt; margin-top: 2mm; }
.sheet { width: 100%; border-collapse: collapse; font-size: 8pt; line-height: 1.35; background: #fff; border: 2.5px solid #1F2430; }
.sheet th { background: #1F2430; color: #fff; font-size: 7pt; padding: 1mm; line-height: 1.25; width: 18mm; white-space: nowrap; }
.sheet th small { font-weight: 400; opacity: .8; }
.sheet td { border: 1px solid #1F243030; padding: 1.25mm 2mm; text-align: center; }
.sheet td.q, .sheet th.q { text-align: left; width: auto; }
.sheet td.q b { margin-right: 2mm; font-size: 8.5pt; }
.sheet-area td { color: #fff; font-weight: 900; text-align: left !important; font-size: 8.5pt; padding: .8mm 2mm; }
.sheet-area span { font-weight: 400; font-size: 8pt; }
.sheet-sum td { background: #FAF8F4; font-weight: 900; text-align: right !important; }
.sheet-sum td.q { text-align: right !important; }
.blank { display: inline-block; width: 12mm; border-bottom: 2px solid #1F2430; }
.blank.short { width: 8mm; }
.ranks { margin-top: 3mm; font-size: 8.5pt; }
.ranks span { margin-right: 4mm; }
.web-check { margin-top: 2mm; display: inline-block; background: #F2B544; border: 2px solid #1F2430; border-radius: 99px; padding: 1mm 5mm; font-weight: 700; }

.case { padding: 6mm; display: flex; flex-direction: column; }
.case-meta { font-size: 8.5pt; color: #50566A; display: flex; align-items: center; gap: 2mm; }
.case h3 { font-size: 12.5pt; margin-top: 3mm; }
.case-sum { font-size: 9pt; line-height: 1.75; margin-top: 2mm; color: #50566A; flex: 1; }
.metric { margin-top: 4mm; background: #FAF8F4; border: 2px solid #1F2430; border-radius: 4mm; padding: 2.5mm 4mm; }
.metric-label { display: block; font-size: 8pt; font-weight: 700; }
.metric-val { font-family: 'Zen Kaku Gothic New'; font-weight: 900; font-size: 13pt; }
.metric-val s { color: #6B7080; font-size: 11pt; }

.prices { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm; }
.price { padding: 4mm; text-align: center; box-shadow: 3px 3px 0 #1F2430; }
.price-name { font-weight: 900; font-size: 10pt; }
.price-val { font-family: 'Zen Kaku Gothic New'; font-weight: 900; font-size: 12pt; margin-top: 1mm; line-height: 1.4; }
.flow { margin-top: 9mm; display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
.flow-step { padding: 5mm 6mm; position: relative; }
.flow-step .num { position: absolute; top: -4mm; left: -3mm; display: grid; place-items: center; width: 10mm; height: 10mm; border-radius: 99px; background: #F07A5A; color: #fff; border: 2.5px solid #1F2430; font-size: 14pt; transform: rotate(-6deg); }
.flow-step img { width: 100%; height: 40mm; object-fit: contain; }
.flow-step h3 { font-size: 13pt; margin-top: 2mm; }
.flow-step p { font-size: 9pt; line-height: 1.75; margin-top: 1mm; }

.back { height: 100%; display: flex; flex-direction: column; }
.back-card { position: relative; margin-top: 14mm; background: #1F2430 radial-gradient(circle at 10% 100%, rgb(30 156 140 / .55), transparent 50%); color: #fff; border: 2.5px solid #1F2430; border-radius: 10mm; box-shadow: 6px 6px 0 #F2B544; padding: 14mm 12mm 14mm; min-height: 130mm; }
.back-card h2 { font-size: 22pt; margin-top: 5mm; }
.back-card p { margin-top: 5mm; color: #ffffffcc; font-size: 10.5pt; width: 100mm; }
.back-cta { margin-top: 9mm; display: inline-block; background: #F2B544; color: #1F2430; font-weight: 900; border: 2.5px solid #1F2430; border-radius: 99px; padding: 3mm 8mm; box-shadow: 4px 4px 0 #1E9C8C; }
.back-cta .en { font-size: 14pt; }
.back-card img { position: absolute; right: -4mm; bottom: -6mm; width: 66mm; }
.back-info { margin-top: 14mm; display: flex; gap: 6mm; align-items: stretch; }
.qr-box { flex-shrink: 0; background: #fff; border: 2.5px solid #1F2430; border-radius: 6mm; padding: 4mm; text-align: center; box-shadow: 4px 4px 0 #F2B544; }
.qr-box img { width: 34mm; height: 34mm; display: block; }
.qr-box p { font-size: 9pt; font-weight: 900; margin-top: 1mm; }
.cover-qr { width: 18mm; height: 18mm; margin-left: auto; border: 2px solid #1F2430; border-radius: 2mm; background: #fff; padding: 1mm; }
.company { flex: 1; background: #fff; border: 2.5px solid #1F2430; border-radius: 6mm; padding: 4mm 8mm; }
.company div { display: flex; gap: 6mm; padding: 2mm 0; border-bottom: 1.5px dashed #1F243020; font-size: 10pt; }
.company div:last-child { border-bottom: 0; }
.company dt { width: 22mm; font-weight: 900; flex-shrink: 0; }
.back-logo { margin-top: auto; text-align: center; }
`;

const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>IT担当がいない会社のための はじめてのDX読本｜Arcle</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&family=Outfit:ital,wght@0,900;1,900&family=Zen+Kaku+Gothic+New:wght@700;900&display=swap" rel="stylesheet">
<style>${css}</style></head><body>${pages.join('\n')}</body></html>`;

for (const name of used) {
  const out = join(imgDir, `${name}.png`);
  if (!existsSync(out)) await sharp(join(root, 'public/images/illust-pop', `${name}.webp`)).resize({ width: imgWidth(name), withoutEnlargement: true }).png({ palette: true, quality: 90 }).toFile(out);
}

const htmlPath = join(here, 'guide.html');
writeFileSync(htmlPath, html);

// --- PDF に書き出す ---
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const browser = await chromium.launch();
const p = await browser.newPage();
await p.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
const outDir = join(root, 'public/docs');
mkdirSync(outDir, { recursive: true });
await p.pdf({ path: join(outDir, PDF_NAME), format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`wrote public/docs/${PDF_NAME} (${pageNo} pages)`);
