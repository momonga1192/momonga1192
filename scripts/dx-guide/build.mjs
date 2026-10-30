// 資料PDF「IT担当がいない会社のための はじめてのDX読本」（アメコミ版・30ページ）を作る
// 文章はサイトのデータ（事業・診断の質問と結果・モデルケース）と、分野ごとの原稿（content/*.json）から取るので、サイトを直したら作り直す
//
// 使い方: PLAYWRIGHT_CORE=/path/to/playwright-core SHARP=/path/to/sharp node scripts/dx-guide/build.mjs
//   playwright-core と sharp はこのリポジトリの依存に入れていない（Vercelのビルドを重くしないため）。手元にあるものを指定する
//   出力: public/docs/ に PDF、scripts/dx-guide/guide.html に確認用のHTML
//
// PDFで崩れないための決まりごと（Chromeの印刷はCSSの一部を画像にしてしまう）
//   - 網点の地は、背景のグラデーションではなく、小さなPNGを敷き詰める（グラデーションは低い解像度の画像になり、にじむ）
//   - 影は filter: drop-shadow ではなく box-shadow（drop-shadow は画像になる）
//   - 文字のふちは paint-order が効かないので、text-shadow を周りに8方向重ねて描く
import { build } from 'esbuild';
import { createRequire } from 'module';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
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
// 分野ごとの4ページの原稿（扉・悩みと原因・今日からできること・Arcleの支援）
const content = Object.fromEntries(areas.map((a) => [a.key, JSON.parse(readFileSync(join(here, 'content', `${a.key}.json`), 'utf8'))]));

// --- 画像 ---
// アメコミの絵（public/images/illust-comic）を、載せる大きさに合わせて縮める。透過のない絵はJPEGにしてPDFを軽くする
const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP || 'sharp');
const imgDir = join(here, '.img');
mkdirSync(imgDir, { recursive: true });
const jobs = new Map();
const img = (name, width = 700) => {
  const alpha = name.startsWith('parts/');
  const file = `${name.replace('/', '-')}-${width}.${alpha ? 'png' : 'jpg'}`;
  jobs.set(file, { src: join(root, 'public/images/illust-comic', `${name}.webp`), width, alpha });
  return pathToFileURL(join(imgDir, file)).href;
};
// 網点の地（PNGを敷き詰める）
const dotsFile = join(imgDir, 'dots.png');
const dotsLightFile = join(imgDir, 'dots-light.png');
const dotTile = (fill) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><circle cx="30" cy="30" r="9" fill="${fill}"/></svg>`);
await sharp(dotTile('rgba(0,0,0,0.16)')).png().toFile(dotsFile);
await sharp(dotTile('rgba(255,255,255,0.22)')).png().toFile(dotsLightFile);
const qr = pathToFileURL(join(root, 'public/images/qr-arcle.svg')).href;

const svc = Object.fromEntries(services.map((s) => [s.key, s]));
const color = { josys: '#3B6FE0', data: '#5B5BD6', ai: '#8E5BD0', web: '#C8509F' };
const work = (slug) => publishedWorks.find((w) => w.slug === slug);
// 分野のページで1つ、モデルケースのページで別の1つを紹介する
const areaCase = { josys: 'textile-josys-pc-management', data: 'wholesale-powerbi-dashboard', ai: 'construction-chatgpt-guideline', web: 'dental-clinic-website-renewal' };
const moreCases = ['accounting-office-m365-security', 'manufacturing-powerbi-management-dashboard', 'trading-company-rag-chatbot', 'auto-repair-shop-web-booking'];
const serviceKey = { 情シス代行: 'josys', データ活用: 'data', 生成AI: 'ai', Web制作: 'web' };
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const br = (t) => esc(t).replace(/\n/g, '<br>');

// 分野ごとの絵（扉・悩み・今日からできること・支援）と、ヒーローのひとこと用の絵
const art = {
  josys: { door: 'svc-josys', worry: 'worry-pc', today: 'josys-svc-security', support: 'josys-svc-helpdesk', tip: 'works-articles-advice', sfx: 'POW!' },
  data: { door: 'svc-data', worry: 'worry-data', today: 'data-scatter', support: 'data-header', tip: 'data-guide', sfx: 'ZAP!' },
  ai: { door: 'svc-ai', worry: 'worry-ai', today: 'genai-robot', support: 'genai-header', tip: 'contact-check-quiz', sfx: 'WHOOSH!' },
  web: { door: 'svc-web', worry: 'worry-web', today: 'web-bundle', support: 'web-meeting', tip: 'fd-cta-hero', sfx: 'BOOM!' }
};

// --- 部品 ---
// ギザギザの爆発形（サイトの comic.tsx と同じ作り）
const burstPoints = (spikes, inner) =>
  Array.from({ length: spikes * 2 }, (_, i) => {
    const a = (Math.PI * i) / spikes - Math.PI / 2;
    const r = i % 2 ? inner : [1, 0.9, 0.97, 0.86, 1, 0.93][(i / 2) % 6];
    return `${(50 + 50 * r * Math.cos(a)).toFixed(1)},${(50 + 50 * r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
const burst = (text, { w = '34mm', fill = '#F2B544', core = '#F07A5A', size = '17pt', rot = -8, style = '', wide = false, jp = false } = {}) => `
  <span class="burst" style="width:${w};aspect-ratio:${wide ? '3/1' : '1/1'};transform:rotate(${rot}deg);${style}">
    <svg viewBox="-4 -4 108 108" preserveAspectRatio="${wide ? 'none' : 'xMidYMid meet'}">
      <polygon points="${burstPoints(wide ? 22 : 14, wide ? 0.8 : 0.68)}" fill="#111" transform="translate(${wide ? '1.2 4' : '3 3'})"/>
      <polygon points="${burstPoints(wide ? 22 : 14, wide ? 0.8 : 0.68)}" fill="${fill}" stroke="#111" stroke-width="${wide ? 1.6 : 2.5}" stroke-linejoin="round"/>
      <polygon points="${burstPoints(wide ? 22 : 14, wide ? 0.74 : 0.6)}" fill="${core}" transform="translate(50 50) scale(${wide ? 0.72 : 0.62}) translate(-50 -50)"/>
    </svg>
    <b class="burst-text ${jp ? 'jp' : 'sfx'}" style="font-size:${size}">${text}</b>
  </span>`;
// 中心から広がる集中線（SVGの三角形で描くので、PDFでもにじまない）
const rays = (a, b, cx = 50, cy = 50, n = 28) => {
  const tri = Array.from({ length: n }, (_, i) => {
    const t0 = (Math.PI * 2 * i) / n, t1 = (Math.PI * 2 * (i + 0.5)) / n, R = 160;
    return `<polygon points="${cx},${cy} ${cx + R * Math.cos(t0)},${cy + R * Math.sin(t0)} ${cx + R * Math.cos(t1)},${cy + R * Math.sin(t1)}" fill="${b}"/>`;
  }).join('');
  return `<svg class="rays" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><rect width="100" height="100" fill="${a}"/>${tri}</svg>`;
};
// 吹き出し。tail は尾の位置（左からの%）と向き（-1 左、1 右）。吹き出しは楕円なので、端に寄るほど尾の付け根を上げる（--edge）
const bubble = (text, { tail = 30, lean = 0, cls = '', style = '' } = {}) => `
  <span class="bubble ${cls}" style="--edge:${(50 + 50 * Math.sqrt(1 - Math.min(Math.abs(tail / 50 - 1), 0.92) ** 2)).toFixed(1)}%;${style}">${text}
    <svg class="tail" viewBox="0 0 40 30" style="left:${tail}%"><path d="M8 0 L${17 + lean * 14} 28 L26 0" fill="#fff" stroke="#111" stroke-width="3" stroke-linejoin="round"/><rect x="5" y="-6" width="24" height="7.5" fill="#fff"/></svg>
  </span>`;
const label = (t, { bg = '#F07A5A', fg = '#fff', rot = -3, size = '15pt', style = '' } = {}) => `<span class="label sfx" style="background:${bg};color:${fg};transform:rotate(${rot}deg);font-size:${size};${style}">${t}</span>`;
const caption = (t, style = '') => `<span class="caption" style="${style}">${t}</span>`;

let pageNo = 0;
const page = (body, { cls = '', number = true, style = '' } = {}) => {
  pageNo++;
  return `<section class="page ${cls}" style="${style}">${body}${number ? `<footer class="pf"><span>はじめてのDX読本</span><b class="num">${pageNo}</b></footer>` : ''}</section>`;
};
const head = (en, title, { lead = '', bg = '#F07A5A', fg = '#fff' } = {}) => `
  <div class="head">
    ${label(en, { bg, fg })}
    <h2 class="title">${title}</h2>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>`;

// --- ページ ---
const pages = [];

// 1. 表紙：コミックの表紙のように、号数・題字・集中線の上のヒーロー
pages.push(
  page(
    `
  <div class="cover">
    <div class="cover-mast">
      <span class="cover-issue"><small class="sfx">FREE GUIDE</small><b class="num">No.1</b></span>
      <p class="cover-pre">IT担当がいない会社のための</p>
    </div>
    <h1 class="cover-title"><span class="ol">はじめての</span><span class="ol big">DX読本</span></h1>
    <div class="cover-art panel">
      ${rays('#F2B544', '#F6C35F', 50, 60)}
      <img src="${img('hero', 1150)}" alt="">
      ${burst('相談<br>無料!', { jp: true, w: '32mm', fill: '#fff', core: '#3B6FE0', size: '14pt', rot: 12, style: 'position:absolute;right:4mm;top:4mm' })}
    </div>
    <p class="cover-sub caption">会社のITの「困った」を、4つの分野で解決！<br>何から始めるか、進める順番がわかる30ページ</p>
    <div class="cover-foot">
      <span class="logo sfx">ARCLE</span>
      <span>愛知・東海の中小企業の「IT部門」として、<br>PC・データ・AI・Webをまとめてお手伝いしています</span>
      <img class="cover-qr" src="${qr}" alt="">
    </div>
  </div>`,
    { cls: 'cover-page', number: false }
  )
);

// 2. はじめに
pages.push(
  page(`
  ${head('Introduction', 'はじめに')}
  <div class="intro panel">
    <p>「DX」と聞くと、大きな会社が大きなお金をかけてやるもの、と思われがちです。</p>
    <p>でも、IT担当者がいない中小企業にとってのDXは、もっと身近なことから始まります。PCやアカウントをきちんと管理する。毎月の集計を手作業でなくす。生成AIで文章づくりを楽にする。ホームページを最新にする。</p>
    <p>この読本では、会社のITを<b class="hl">「守り」「見える化」「効率化」「発信」の4つの分野</b>に分けて、それぞれの「よくある悩み」と「今日からできること」をまとめました。</p>
    <p>最後のセルフチェックシートで、御社の得意と苦手を確かめてみてください。どこから手をつければいいかが見えてきます。</p>
  </div>
  <div class="intro-art">
    <div class="panel intro-img"><img src="${img('point', 1100)}" alt=""></div>
    ${bubble('会社のITの困りごとは、<br>まるごと相談してね！', { tail: 72, lean: 0.6, style: 'position:absolute;left:2mm;top:-12mm;font-size:12.5pt' })}
  </div>`)
);

// 3. もくじ
const toc = [
  ['マンガ「ある日、会社のPCが……」', 4],
  ['こんな「困った」ありませんか？', 6],
  ['DXは「4つの分野」で考える', 8],
  ['おすすめの進める順番', 9],
  ...areas.map((a, i) => [`AREA ${i + 1}　${svc[a.key].name}（${a.short}）`, 10 + i * 4]),
  ['セルフチェックシート（20問）', 26],
  ['支援のモデルケース', 28],
  ['料金の目安と、ご相談の流れ', 29]
];
pages.push(
  page(`
  ${head('Contents', 'もくじ')}
  <ol class="toc panel">
    ${toc
      .map(([t, p], i) => {
        const key = i >= 4 && i < 8 ? areas[i - 4].key : '';
        return `<li${key ? ` style="--c:${color[key]}"` : ''}><span class="toc-t">${t}</span><i></i><b class="num">${p}</b></li>`;
      })
      .join('')}
  </ol>
  <div class="toc-art panel"><img src="${img('reason-onestop', 900)}" alt=""></div>
  ${bubble('気になるところから<br>読んでも大丈夫！', { tail: 20, lean: -0.8, style: 'position:absolute;right:16mm;bottom:52mm;font-size:12pt' })}`)
);

// 4〜5. マンガ（トップの演出と同じ話を、6つのコマで）
// 舞台は 3:2 の部屋。コマの中で舞台をずらしたり拡大したりして、カメラを動かしたように見せる
// 舞台はコマを必ず覆う大きさにして（幅は zoom 倍か、高さを覆う幅の大きいほう）、x・y（0〜100）でどこを見せるかを決める
const stage = ({ woman = 'calm', laptop = 'ok', villain = '', hero = '', dark = 0, zoom = 1, x = 50, y = 50, trail = false }) => `
  <div class="stage" style="--w:max(${zoom * 100}cqw, 150cqh);left:calc((100cqw - var(--w)) * ${x / 100});top:calc((100cqh - var(--w) / 1.5) * ${y / 100})">
    <img src="${img('parts/bg-office', 1100)}" class="full" alt="">
    ${dark ? `<span class="full" style="background:#2A1450;opacity:${dark}"></span>` : ''}
    ${woman ? `<img src="${img(`parts/woman-${woman}`, 600)}" style="left:1%;bottom:16%;width:44%" alt="">` : ''}
    <img src="${img('parts/desk', 1200)}" style="left:0;bottom:-2%;width:100%" alt="">
    <img src="${img(`parts/laptop-${laptop}`, 560)}" style="left:33%;bottom:4%;width:34%" alt="">
    ${villain ? `<img src="${img('parts/villain', 620)}" style="${villainPose[villain]}" alt="">` : ''}
    ${trail ? trailLines : ''}
    ${hero ? `<img src="${img('parts/hero-fly', 900)}" style="${heroPose[hero]}" alt="">` : ''}
  </div>`;
// ヒーローの後ろに流れるスピード線（舞台の右上だけ。顔や怪物には掛けない）
const trailLines = `<svg class="full" viewBox="0 0 100 100" preserveAspectRatio="none">${[
  [52, 6, 0.7], [58, 15, 1], [50, 24, 0.6], [62, 33, 0.9], [56, 42, 0.7], [66, 50, 0.8], [70, 2, 0.6]
]
  .map(([x, y, w]) => `<line x1="${x}" y1="${y}" x2="${x + 50}" y2="${y - 22}" stroke="#fff" stroke-width="${w * 1.6}" stroke-linecap="round" vector-effect="non-scaling-stroke" style="stroke-width:${w * 1.4}mm"/>`)
  .join('')}</svg>`;
// ヴィランとヒーローの位置。attack は女性の顔を隠さないよう、トップの演出より右に置く。hit は殴られてのけぞる
const villainPose = {
  rise: 'left:28%;bottom:24%;width:44%',
  attack: 'left:30%;bottom:22%;width:46%;transform:rotate(-8deg)',
  hit: 'left:4%;bottom:22%;width:50%;transform:rotate(-24deg)'
};
const heroPose = {
  fly: 'right:-14%;top:-8%;width:54%',
  smash: 'left:32%;top:-10%;width:64%'
};
const comicPanel = (inner, { clip = '', style = '' } = {}) => `<div class="cpanel" style="${clip ? `clip-path:${clip};` : ''}${style}"><div class="cpanel-in" style="${clip ? `clip-path:${clip};` : ''}">${inner}</div></div>`;
pages.push(
  page(
    `
  <div class="manga-head">${label('Prologue', { bg: '#111', fg: '#F2B544' })}<h2 class="title ol-w">マンガ「ある日、会社のPCが……」</h2></div>
  <div class="manga">
    ${comicPanel(`${stage({ woman: 'calm', zoom: 1, x: 0, y: 32 })}${caption('ある日、会社のPCが……', 'position:absolute;left:3mm;top:3mm;font-size:15pt')}${bubble('今日も仕事、<br>はかどるわ〜♪', { tail: 16, lean: -1.6, style: 'position:absolute;left:76mm;top:6mm;font-size:12pt' })}`, { style: 'height:72mm' })}
    ${comicPanel(`${stage({ woman: 'panic', laptop: 'broken', zoom: 1.5, x: 15, y: 75 })}${burst('BOOM!', { w: '36mm', fill: '#F07A5A', core: '#F2B544', size: '20pt', rot: -12, style: 'position:absolute;right:4mm;top:4mm' })}${bubble('OH NO!', { tail: 70, lean: 0.5, cls: 'sfx-b', style: 'position:absolute;left:4mm;top:5mm;font-size:20pt' })}`, { style: 'height:76mm;width:calc(55% - 2mm)' })}
    ${comicPanel(`${stage({ woman: 'panic', laptop: 'broken', villain: 'rise', dark: 0.45, zoom: 1.6, x: 55, y: 70 })}<b class="sfx growl" style="position:absolute;right:4mm;bottom:6mm">GRRR...!</b>`, { style: 'height:76mm;width:calc(45% - 2mm)' })}
    ${comicPanel(`${stage({ woman: 'panic', laptop: 'broken', villain: 'attack', dark: 0.55, zoom: 1, x: 0, y: 18 })}${caption('パソコンから、ウイルスの怪物が！', 'position:absolute;left:3mm;bottom:3mm;font-size:13pt;background:#fff')}${bubble('HELP!!', { tail: 72, lean: 0.6, cls: 'sfx-b', style: 'position:absolute;left:8mm;top:2mm;font-size:20pt' })}`, { style: 'height:68mm' })}
  </div>`,
    { cls: 'manga-page' }
  )
);
pages.push(
  page(
    `
  <div class="manga">
    ${comicPanel(`${stage({ woman: 'panic', laptop: 'broken', villain: 'attack', hero: 'fly', trail: true, dark: 0.6, zoom: 1, x: 0, y: 8 })}${caption('そのとき——！', 'position:absolute;left:3mm;top:3mm;font-size:22pt;background:#F07A5A;color:#fff')}<b class="sfx whoosh" style="position:absolute;right:6mm;bottom:6mm">WHOOSH!</b>`, { style: 'height:88mm' })}
    ${comicPanel(`${stage({ woman: '', laptop: 'broken', villain: 'hit', hero: 'smash', dark: 0.3, zoom: 1, x: 0, y: 10 })}${burst('SMAAASH!!', { w: '92mm', wide: true, size: '27pt', rot: -6, style: 'position:absolute;left:36mm;bottom:3mm' })}`, { style: 'height:82mm' })}
    ${comicPanel(`${stage({ woman: 'happy', zoom: 1.9, x: 0, y: 55 })}${bubble('MY HERO!', { tail: 30, lean: -0.4, cls: 'sfx-b', style: 'position:absolute;right:6mm;top:8mm;font-size:22pt' })}`, { style: 'height:74mm;width:48%' })}
    <div class="manga-end panel">
      ${rays('#F2B544', '#F6C35F', 50, 50)}
      <p class="manga-end-t ol">会社のITの「困った」は、<br>まるごとArcleへ！</p>
      <p class="manga-end-s">トラブルの火消しも、困る前の備えも。<br>この読本で、まずは会社の今を確かめましょう。</p>
    </div>
  </div>`,
    { cls: 'manga-page' }
  )
);

// 6〜7. 困りごと（お悩みのコマ、1ページに2つ）
const worryPage = (keys, extra = '') =>
  page(`
  ${keys[0] === 'josys' ? head('Worries', 'こんな「困った」<span class="hl">ありませんか？</span>', { lead: 'IT担当者がいない会社で、よく聞くお悩みです。ひとつでも当てはまれば、この読本がお役に立ちます。' }) : ''}
  <div class="worries">
    ${keys
      .map((k, i) => {
        const a = areas.find((x) => x.key === k);
        return `
    <div class="worry ${i % 2 ? 'flip' : ''}">
      <div class="panel worry-img"><img src="${img(art[k].worry, 700)}" alt=""></div>
      <div class="worry-body">
        ${bubble(br(svc[k].worry), { tail: i % 2 ? 80 : 18, lean: i % 2 ? 0.6 : -0.6, cls: 'worry-b' })}
        <p class="worry-text">${a.results.low.text}</p>
        <span class="chip" style="background:${color[k]}">→ AREA ${areas.indexOf(a) + 1}「${svc[k].name}」（${a.short}）</span>
      </div>
    </div>`;
      })
      .join('')}
  </div>${extra}`);
pages.push(worryPage(['josys', 'data']));
pages.push(
  worryPage(
    ['ai', 'web'],
    `<div class="worry-end panel"><img src="${img('reason-onestop', 500)}" alt=""><p><b>4つとも、ひとつの窓口で相談できます。</b><br>PC・データ・AI・Webを別々の会社に頼まなくても大丈夫。会社全体を見渡して、優先順位から一緒に考えます。</p></div>`
  )
);

// 8. 4つの分野
const areaDesc = {
  josys: 'PC・アカウント・セキュリティを整えて、トラブルや情報漏えいを防ぐ。すべての土台です。',
  data: '売上や在庫などの数字を集めて、いつでも見られるようにする。判断が速くなります。',
  ai: '生成AIで、文章づくりや資料探しなどの作業時間を減らす。ルールづくりから始めます。',
  web: 'ホームページで、会社の強みや最新の情報を伝える。問い合わせや採用につながります。'
};
pages.push(
  page(`
  ${head('4 Areas', 'DXは<span class="hl">「4つの分野」</span>で考える', { lead: 'むずかしく考えず、会社のITを4つに分けてみましょう。どこが得意で、どこが手薄かが見えてきます。', bg: '#3B6FE0' })}
  <div class="areas4">
    ${areas
      .map(
        (a, i) => `
    <div class="panel area4">
      <div class="area4-img"><img src="${img(art[a.key].door, 700)}" alt="">${label(`ISSUE No.${i + 1}`, { bg: color[a.key], size: '12pt', style: 'position:absolute;left:2.5mm;top:2.5mm' })}</div>
      <div class="area4-body">
        <p class="area4-short" style="color:${color[a.key]}">${a.short}</p>
        <h3>${svc[a.key].name}</h3>
        <p>${areaDesc[a.key]}</p>
      </div>
    </div>`
      )
      .join('')}
  </div>`)
);

// 9. 進める順番
const steps = [
  ['josys', '守りを固める', '土台がないままでは、データやAIを安心して使えません。まずはPCやアカウントの管理から。'],
  ['data', '数字を見える化する', '数字がそろうと、どの業務に時間がかかっているか、どこを楽にすべきかが分かります。'],
  ['ai', 'AIで効率化する', 'ルールを決めてから使えば安心です。文章づくりや資料探しの時間を減らします。'],
  ['web', 'Webで発信する', '整った会社の強みや実績を、ホームページで伝えます。問い合わせや採用につながります。']
];
pages.push(
  page(`
  ${head('Roadmap', 'おすすめの<span class="hl">進める順番</span>', { lead: '4つの分野は、この順番で進めるとムダがありません。' })}
  <div class="road">
    ${steps
      .map(
        ([k, t, d], i) => `
    <div class="road-step" style="margin-left:${i * 9}mm">
      <span class="road-num sfx" style="background:${color[k]}">STEP <b class="num">${i + 1}</b></span>
      <div class="panel road-card"><h3 style="color:${color[k]}">${t}</h3><p>${d}</p></div>
    </div>`
      )
      .join('')}
  </div>
  <div class="road-note">
    <div class="panel road-img"><img src="${img('reason-small', 700)}" alt=""></div>
    ${bubble('<b>いちばん困っている分野から始めても大丈夫！</b><br>ただし、守り（PC・セキュリティ）が手薄なときは、先に固めておくと安心です。', { tail: 12, lean: -0.8, cls: 'road-b' })}
  </div>`)
);

// 10〜25. 分野ごとに4ページ（扉・よくある悩みと原因・今日からできること・Arcleの支援）
const levelName = { low: 'これから', mid: 'もう一歩', high: 'できている' };
areas.forEach((a, i) => {
  const k = a.key, c = content[k], s = svc[k], col = color[k];
  // 扉
  pages.push(
    page(
      `
  <div class="door-art panel" style="border-color:#111">
    <img src="${img(art[k].door, 1150)}" alt="">
    ${burst(art[k].sfx, { w: '38mm', size: '20pt', rot: i % 2 ? 10 : -10, style: 'position:absolute;right:6mm;bottom:6mm' })}
  </div>
  <div class="door-band" style="background:${col}">
    ${label(`AREA ${i + 1}`, { bg: '#F2B544', fg: '#111', size: '20pt' })}
    <p class="door-short">${a.short}</p>
    <h2 class="door-name ol">${s.name}</h2>
  </div>
  <div class="door-body">
    <p class="door-catch">${esc(c.door.catch)}</p>
    <p class="door-lead">${esc(c.door.lead)}</p>
    <div class="panel door-check">
      <p class="door-check-t" style="background:${col}">まずはチェック！ 当てはまるものに✓</p>
      <ul>${a.questions.map((q) => `<li><span class="box"></span>${esc(q)}</li>`).join('')}</ul>
    </div>
  </div>`,
      { cls: 'door-page' }
    )
  );
  // よくある悩みと原因
  pages.push(
    page(`
  ${head(`Area ${i + 1} · Worries`, `${s.name}の<span class="hl">よくある悩み</span>`, { bg: col })}
  <div class="wc">
    <div class="panel wc-img"><img src="${img(art[k].worry, 800)}" alt=""></div>
    <div class="wc-list">
      ${c.worries
        .map(
          (w, n) => `
      <div class="wc-item">
        ${bubble(esc(w.worry), { tail: 14, lean: -0.6, cls: 'wc-b' })}
        <div class="panel wc-cause"><span class="wc-tag" style="background:${col}">原因 <b class="num">${n + 1}</b></span><p>${esc(w.cause)}</p></div>
      </div>`
        )
        .join('')}
    </div>
  </div>
  <p class="caption wc-note">${esc(c.worriesNote)}</p>`)
  );
  // 今日からできること（自分でできる6つ＋診断の結果ごとのやること）
  pages.push(
    page(`
  ${head(`Area ${i + 1} · Today`, `<span class="hl">${esc(c.today.title)}</span>`, { bg: col })}
  <div class="today">
    <ol class="panel today-list">
      ${c.today.items.map((t, n) => `<li><b class="num" style="background:${col}">${n + 1}</b><span>${esc(t)}</span><span class="box"></span></li>`).join('')}
    </ol>
    <div class="panel today-img"><img src="${img(art[k].today, 700)}" alt=""></div>
  </div>
  <p class="sub">チェックの結果に合わせた「次の一歩」</p>
  <div class="levels">
    ${['low', 'mid', 'high']
      .map(
        (lv) => `
    <div class="panel level">
      <span class="level-tag" style="${lv === 'low' ? `background:${col};color:#fff` : lv === 'mid' ? 'background:#F2B544' : 'background:#fff'}">${levelName[lv]}</span>
      <ol>${a.results[lv].todo.map((t) => `<li>${t}</li>`).join('')}</ol>
    </div>`
      )
      .join('')}
  </div>
  <div class="tip">
    <img src="${img(art[k].tip, 500)}" alt="">
    ${bubble(`<b class="sfx tip-t">HERO'S TIP!</b><br>${esc(c.tip)}`, { tail: 6, lean: -1, cls: 'tip-b' })}
  </div>`)
  );
  // Arcleの支援
  const w = work(areaCase[k]);
  const m = w?.metrics?.[0];
  pages.push(
    page(`
  ${head(`Area ${i + 1} · Support`, `Arcleの<span class="hl">「${s.name}」</span>`, { lead: esc(s.lead), bg: col })}
  <div class="sup">
    ${c.support
      .map(
        (p, n) => `
    <div class="panel sup-item">
      <span class="sup-num num" style="background:${col}">${n + 1}</span>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.body)}</p>
    </div>`
      )
      .join('')}
  </div>
  <div class="sup-row">
    <div class="panel sup-case">
      ${label('Case', { bg: '#111', fg: '#F2B544', size: '13pt', style: 'position:absolute;left:4mm;top:-4mm' })}
      ${w ? `<p class="case-meta">${w.industry}・${w.employees}（モデルケース）</p><h3>${esc(w.title)}</h3><p class="case-sum">${esc(w.summary)}</p>${m ? `<p class="metric">${m.label}　<s>${m.before}</s> → <b style="color:${col}">${m.after}</b></p>` : ''}` : ''}
    </div>
    <div class="sup-side">
      <div class="panel sup-price" style="transform:rotate(2deg)"><span>料金の目安</span><b style="color:${col}">${prices[k]}</b><small>税抜</small></div>
      <div class="panel sup-art"><img src="${img(art[k].support, 600)}" alt=""></div>
    </div>
  </div>
  <div class="panel sup-read">
    <p class="sup-read-t">もっと詳しく読む（お役立ち記事）</p>
    ${c.articles.map((r) => `<p>● ${esc(r.title)}<br><span class="url">arcle.net${r.path}</span></p>`).join('')}
  </div>`)
  );
});

// 26〜27. セルフチェックシート（10問ずつ）
let q = 0;
const sheet = (list) => `
  <table class="sheet">
    <thead><tr><th class="q">質問</th><th>できている<br><small>2点</small></th><th>一部だけ<br><small>1点</small></th><th>できていない<br><small>0点</small></th></tr></thead>
    ${list
      .map(
        (a) => `
    <tbody>
      <tr class="sheet-area"><td colspan="4" style="background:${color[a.key]}">${svc[a.key].name}<span>（${a.short}）</span></td></tr>
      ${a.questions.map((text) => `<tr><td class="q"><b class="num">Q${++q}</b>${esc(text)}</td><td>○</td><td>○</td><td>○</td></tr>`).join('')}
      <tr class="sheet-sum"><td class="q">合計</td><td colspan="3"><span class="blank"></span> / 10点　ランク <span class="blank short"></span></td></tr>
    </tbody>`
      )
      .join('')}
  </table>`;
pages.push(
  page(`
  ${head('Self Check', '<span class="hl">セルフチェックシート</span>', { lead: '当てはまる欄の○を塗って、分野ごとに合計してください。「できている」2点・「一部だけ」1点・「できていない・わからない」0点です。', bg: '#3B6FE0' })}
  ${sheet(areas.slice(0, 2))}`)
);
pages.push(
  page(`
  ${sheet(areas.slice(2))}
  <div class="ranks panel">
    <p class="ranks-t">ランクの目安（分野ごと・10点満点）</p>
    <div class="rank-row">${[['S', '9〜10点'], ['A', '8点'], ['B', '6〜7点'], ['C', '4〜5点'], ['D', '0〜3点']].map(([r, t]) => `<span><b class="sfx">${r}</b>${t}</span>`).join('')}</div>
    <p class="ranks-s">点数の低い分野が、伸びしろの大きい分野です。<b>C・D の分野</b>は、その分野のページ（10〜25ページ）の「今日からできること」から始めてみてください。<b>守り（PC・セキュリティ）が C・D のとき</b>は、ほかの分野より先に固めるのがおすすめです。</p>
  </div>
  <div class="web-check">
    <img src="${img('contact-check-quiz', 400)}" alt="">
    ${bubble('Webでも診断できます！<br>レーダーチャートで、得意と苦手がひと目でわかります<br><b class="url-b">arcle.net/it-check</b>', { tail: 8, lean: -1, cls: 'wcheck-b' })}
  </div>`)
);

// 28. モデルケース（分野のページとは別のもの）
pages.push(
  page(`
  ${head('Case Files', '支援の<span class="hl">モデルケース</span>', { lead: 'よくあるご相談をもとにした、架空のモデルケースです。企業名・数値は説明のためのものです。', bg: '#111' })}
  <div class="cases">
    ${moreCases
      .map(work)
      .filter(Boolean)
      .map((w, n) => {
        const key = serviceKey[w.service];
        const m = w.metrics[0];
        return `
    <div class="panel case">
      ${label(`Case <b class="num">${n + 1}</b>`, { bg: color[key], size: '13pt', style: 'position:absolute;left:4mm;top:-4mm' })}
      <p class="case-meta"><span class="chip" style="background:${color[key]}">${w.service}</span>${w.industry}・${w.employees}</p>
      <h3>${esc(w.title)}</h3>
      <p class="case-sum">${esc(w.summary)}</p>
      ${m ? `<p class="metric">${m.label}<br><s>${m.before}</s> → <b style="color:${color[key]}">${m.after}</b></p>` : ''}
    </div>`;
      })
      .join('')}
  </div>`)
);

// 29. 料金と相談の流れ
const flow = [
  ['services-flow-step-contact', 'お問い合わせ', 'フォームからお気軽にご連絡ください。うまく説明できない段階でも大丈夫です。'],
  ['services-flow-step-hearing', '無料相談', '現状の課題や目標をお聞きし、解決策を整理します。訪問・オンラインどちらも対応します。'],
  ['services-flow-step-plan', 'ご提案・お見積り', 'プランとスケジュール、明確な費用をご提示します。ご納得いただけるまで調整します。'],
  ['services-flow-step-start', 'ご契約・開始', '始まってからも、困ったときにすぐ相談できる距離で伴走します。']
];
pages.push(
  page(`
  ${head('Price & Flow', '料金の目安と、<span class="hl">ご相談の流れ</span>')}
  <div class="prices">
    ${services.map((s) => `<div class="panel price" style="border-top:3mm solid ${color[s.key]}"><p class="price-name">${s.name}</p><p class="price-val" style="color:${color[s.key]}">${prices[s.key]}</p></div>`).join('')}
  </div>
  <p class="small">※料金は税抜です。内容や会社の規模に合わせてお見積りします。ご相談・お見積りは無料です。</p>
  <div class="flow">
    ${flow
      .map(
        ([im, t, d], n) => `
    <div class="panel flow-step">
      <div class="flow-img"><img src="${img(im, 600)}" alt=""></div>
      <span class="flow-num sfx">STEP <b class="num">${n + 1}</b></span>
      <h3>${t}</h3>
      <p>${d}</p>
    </div>`
      )
      .join('')}
  </div>`)
);

// 30. 裏表紙
pages.push(
  page(
    `
  <div class="back">
    <div class="back-card panel">
      ${rays('#1F2430', '#2A3142', 85, 90)}
      <div class="back-in">
        ${label('Call Arcle!', { bg: '#F2B544', fg: '#111', size: '18pt' })}
        <h2 class="ol">「何から相談すればいいか<br>わからない」でも大丈夫です。</h2>
        <p>いまの困りごとをお聞きして、やるべきことの順番から一緒に整理します。ご相談・お見積りは無料です。東海エリアは訪問にも対応します。</p>
        <p class="back-cta">無料相談のお申し込み　<b>arcle.net/contact</b></p>
      </div>
      <img class="back-hero" src="${img('fd-cta-hero', 700)}" alt="">
    </div>
    <div class="back-info">
      <dl class="company panel">
        <div><dt>屋号</dt><dd>Arcle（アークル）</dd></div>
        <div><dt>代表</dt><dd>栗原 勇太</dd></div>
        <div><dt>所在地</dt><dd>〒491-0835 愛知県一宮市あずら2丁目8</dd></div>
        <div><dt>Web</dt><dd>https://www.arcle.net</dd></div>
        <div><dt>事業</dt><dd>情シス代行・データ活用・生成AI活用・Web制作</dd></div>
      </dl>
      <div class="qr-box panel"><img src="${qr}" alt=""><p>サイトはこちら</p></div>
    </div>
    <p class="back-logo"><span class="logo sfx">ARCLE</span><span class="to-be sfx">TO BE CONTINUED...</span></p>
  </div>`,
    { cls: 'back-page', number: false }
  )
);

// --- 見た目 ---
// 文字のふち：周りに8方向の影を重ねる（--oc がふちの色、--ow が太さ）
const ring = (w, c) => [[1, 0], [-1, 0], [0, 1], [0, -1], [0.7, 0.7], [-0.7, 0.7], [0.7, -0.7], [-0.7, -0.7]].map(([x, y]) => `${(x * w).toFixed(2)}mm ${(y * w).toFixed(2)}mm 0 ${c}`).join(', ');
const css = `
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: 'M PLUS 1p', sans-serif; font-weight: 500; color: #1F2430; background: #888; font-size: 10.5pt; line-height: 1.75; }
img { display: block; }
.page { width: 210mm; height: 297mm; overflow: hidden; position: relative; background: #FAF3E0 url(${pathToFileURL(dotsFile).href}) 0 0 / 2.6mm 2.6mm; padding: 15mm 15mm 20mm; page-break-after: always; margin: 0 auto; }
.sfx, .num { font-family: 'Luckiest Guy', 'Bangers', sans-serif; font-weight: 400; letter-spacing: .04em; }
.num { letter-spacing: .02em; }
.jp { font-family: 'M PLUS 1p', sans-serif; font-weight: 800; text-align: center; line-height: 1.15; }
h1, h2, h3, .title, .caption, .bubble, .chip, .sub, .door-catch, .toc-t, .price-name, .price-val, .level-tag, .wc-tag, .sup-read-t, .ranks-t, .door-check-t, .back-cta, .worry-text b, .manga-end-t { font-family: 'M PLUS 1p', sans-serif; font-weight: 800; }
.panel { position: relative; background: #fff; border: 1mm solid #111; box-shadow: 2mm 2mm 0 #111; overflow: hidden; }
.panel > img, .door-art > img { width: 100%; height: 100%; object-fit: cover; }
.label { display: inline-block; border: .8mm solid #111; padding: .6mm 3.5mm .2mm; box-shadow: 1mm 1mm 0 #111; line-height: 1.15; letter-spacing: .06em; }
.label .num { font-size: 1.05em; }
.caption { word-break: auto-phrase; text-wrap: balance; display: inline-block; background: #F2B544; color: #111; border: .8mm solid #111; box-shadow: 1mm 1mm 0 #111; padding: 1.2mm 3.5mm; line-height: 1.45; z-index: 3; }
.hl { background: linear-gradient(transparent 60%, #F2B544 60%, #F2B544 94%, transparent 94%); padding: 0 .1em; }
.ol { color: #fff; text-shadow: ${ring(0.7, '#111')}, 1.4mm 1.4mm 0 #111; }
.ol-w { color: #111; text-shadow: ${ring(0.6, '#fff')}, 1.2mm 1.2mm 0 #F2B544; }
.head { margin-bottom: 7mm; }
.head .title { font-size: 23pt; line-height: 1.4; margin-top: 3.5mm; color: #111; text-shadow: ${ring(0.6, '#fff')}, 1.2mm 1.2mm 0 #F2B544; }
.head .lead { margin-top: 2.5mm; font-weight: 700; font-size: 10pt; line-height: 1.85; color: #30343F; }
.pf { position: absolute; left: 15mm; right: 15mm; bottom: 8mm; display: flex; justify-content: space-between; align-items: center; font-size: 8pt; font-weight: 700; color: #50566A; border-top: .6mm solid #111; padding-top: 2mm; }
.pf .num { background: #F2B544; color: #111; border: .6mm solid #111; padding: .4mm 2.5mm 0; font-size: 12pt; transform: rotate(-3deg); box-shadow: .8mm .8mm 0 #111; }
.small { font-size: 8.5pt; color: #50566A; margin-top: 3mm; font-weight: 700; }
.chip { display: inline-block; color: #fff; font-size: 9pt; padding: .6mm 3mm; border: .6mm solid #111; box-shadow: .8mm .8mm 0 #111; }
.box { flex-shrink: 0; width: 4.5mm; height: 4.5mm; border: .6mm solid #111; background: #fff; box-shadow: .6mm .6mm 0 #111; }
.sub { font-size: 12.5pt; margin: 6mm 0 3mm; display: flex; align-items: center; gap: 2mm; }
.sub::before { content: ''; width: 4mm; height: 4mm; background: #F2B544; border: .6mm solid #111; transform: rotate(12deg); }

/* 爆発形・集中線・吹き出し */
.burst { position: absolute; display: grid; place-items: center; z-index: 4; }
.burst svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.burst-text { position: relative; color: #fff; text-shadow: ${ring(0.45, '#111')}, .8mm .8mm 0 #111; white-space: nowrap; line-height: 1; }
.rays { position: absolute; inset: 0; width: 100%; height: 100%; }
.bubble { word-break: auto-phrase; text-wrap: balance; position: relative; display: inline-block; background: #fff; border: .8mm solid #111; border-radius: 50%; box-shadow: 1.2mm 1.2mm 0 #111; padding: 4mm 7mm; text-align: center; line-height: 1.5; color: #111; z-index: 3; }
.bubble .tail { position: absolute; top: calc(var(--edge) - 1.4mm); width: 9mm; height: 7mm; transform: translateX(-50%); overflow: visible; }
.sfx-b { font-family: 'Bangers', sans-serif; font-weight: 400; letter-spacing: .05em; padding: 2.5mm 6mm; line-height: 1; }

/* 表紙 */
.cover-page { padding: 12mm 13mm 12mm; }
.cover { height: 100%; display: flex; flex-direction: column; }
.cover-mast { display: flex; align-items: center; gap: 5mm; border-bottom: 1mm solid #111; padding-bottom: 3mm; }
.cover-issue { display: flex; flex-direction: column; align-items: center; background: #F07A5A; color: #fff; border: .8mm solid #111; box-shadow: 1mm 1mm 0 #111; padding: 1mm 4mm .5mm; transform: rotate(-4deg); line-height: 1; }
.cover-issue small { font-size: 9pt; letter-spacing: .15em; }
.cover-issue b { font-size: 22pt; }
.cover-pre { font-family: 'M PLUS 1p'; font-weight: 800; font-size: 17pt; }
.cover-title { margin-top: 3mm; line-height: 1.05; }
.cover-title span { display: block; }
.cover-title .ol { font-size: 40pt; }
.cover-title .big { font-size: 78pt; color: #F2B544; letter-spacing: .02em; }
.cover-art { margin-top: 4mm; flex: 1; transform: rotate(1deg); }
.cover-art > img { position: absolute; inset: 0; }
.cover-sub { margin-top: 6mm; font-size: 13.5pt; transform: rotate(-1deg); align-self: flex-start; }
.cover-foot { margin-top: 6mm; display: flex; align-items: center; gap: 5mm; font-size: 9pt; font-weight: 700; color: #30343F; }
.logo { font-size: 30pt; color: #F2B544; text-shadow: ${ring(0.5, '#111')}, 1mm 1mm 0 #111; letter-spacing: .03em; line-height: 1; }
.cover-qr { width: 20mm; height: 20mm; margin-left: auto; border: .8mm solid #111; background: #fff; padding: 1mm; }

/* はじめに・もくじ */
.intro { padding: 7mm 9mm; transform: rotate(-.5deg); }
.intro p { margin-bottom: 3mm; font-size: 11pt; line-height: 1.95; }
.intro p:last-child { margin-bottom: 0; }
.intro-art { position: absolute; left: 15mm; right: 15mm; bottom: 24mm; }
.intro-img { height: 104mm; transform: rotate(.8deg); }
.intro-img img { object-position: 70% 50%; }
.toc { list-style: none; padding: 5mm 9mm; }
.toc li { display: flex; align-items: baseline; gap: 3mm; padding: 2mm 0; font-size: 12pt; border-bottom: .4mm dashed #11111830; }
.toc li:last-child { border-bottom: 0; }
.toc li[style] .toc-t { color: var(--c); }
.toc li i { flex: 1; border-bottom: .6mm dotted #11111860; }
.toc li .num { font-size: 15pt; }
.toc-art { position: absolute; left: 15mm; width: 112mm; bottom: 24mm; height: 70mm; transform: rotate(-1deg); }

/* マンガ */
.manga-page { background: #111 url(${pathToFileURL(dotsLightFile).href}) 0 0 / 2.6mm 2.6mm; }
.manga-page .pf { color: #ccc; border-color: #ccc; }
.manga-head { margin-bottom: 5mm; }
.manga-head .title { font-size: 20pt; margin-top: 3mm; }
.manga { display: flex; flex-wrap: wrap; gap: 4mm; }
.cpanel { position: relative; width: 100%; background: #fff; padding: 1mm; }
.cpanel-in { position: relative; width: 100%; height: 100%; overflow: hidden; background: #FAF3E0; container-type: size; }
.stage { position: absolute; width: var(--w); height: calc(var(--w) / 1.5); }
.stage > * { position: absolute; }
.stage .full { inset: 0; width: 100%; height: 100%; object-fit: cover; }
.growl { font-size: 28pt; color: #B98CFF; text-shadow: ${ring(0.55, '#111')}, 1mm 1mm 0 #111; transform: rotate(8deg); z-index: 3; }
.whoosh { font-size: 34pt; color: #fff; text-shadow: ${ring(0.6, '#111')}, 1.2mm 1.2mm 0 #3B6FE0; transform: rotate(-12deg); z-index: 3; }
.manga-note { margin-top: 1mm; font-size: 11pt; }
.manga-end { width: calc(52% - 4mm); height: 74mm; display: flex; flex-direction: column; justify-content: center; padding: 5mm; }
.manga-end-t { position: relative; font-size: 17pt; line-height: 1.45; }
.manga-end-s { position: relative; margin-top: 3mm; font-size: 9pt; font-weight: 700; background: #fff; border: .6mm solid #111; padding: 2mm 3mm; line-height: 1.6; }

/* 困りごと */
.worries { display: flex; flex-direction: column; gap: 9mm; }
.worry { display: flex; gap: 6mm; align-items: center; }
.worry.flip { flex-direction: row-reverse; }
.worry-img { width: 84mm; height: 84mm; flex-shrink: 0; transform: rotate(-1deg); }
.worry.flip .worry-img { transform: rotate(1deg); }
.worry-body { flex: 1; }
.worry-b { font-size: 12.5pt; display: block; padding: 5mm 6mm; }
.worry-text { margin-top: 7mm; font-size: 9.5pt; line-height: 1.85; font-weight: 700; color: #30343F; }
.worry-body .chip { margin-top: 3mm; }
.worry-end { margin-top: 9mm; display: flex; align-items: center; gap: 5mm; padding: 4mm 6mm; background: #FFF6DF; }
.worry-end img { width: 36mm; height: 26mm; object-fit: cover; border: .6mm solid #111; }
.worry-end p { font-size: 10pt; line-height: 1.8; }

/* 4つの分野 */
.areas4 { display: grid; grid-template-columns: 1fr 1fr; gap: 7mm; }
.area4 { display: flex; flex-direction: column; }
.area4:nth-child(odd) { transform: rotate(-.6deg); }
.area4:nth-child(even) { transform: rotate(.6deg); }
.area4-img { position: relative; height: 54mm; border-bottom: 1mm solid #111; }
.area4-img img { width: 100%; height: 100%; object-fit: cover; }
.area4-body { padding: 4mm 5mm 5mm; }
.area4-short { font-family: 'M PLUS 1p'; font-weight: 800; font-size: 9.5pt; }
.area4 h3 { font-size: 16pt; line-height: 1.3; }
.area4-body p:last-child { font-size: 9.5pt; margin-top: 1.5mm; line-height: 1.75; font-weight: 700; color: #30343F; }

/* 進める順番 */
.road { display: flex; flex-direction: column; gap: 5mm; }
.road-step { display: flex; align-items: center; gap: 4mm; }
.road-num { flex-shrink: 0; width: 30mm; text-align: center; color: #fff; padding: 2mm 0 1mm; border: .8mm solid #111; font-size: 15pt; transform: rotate(-4deg); box-shadow: 1mm 1mm 0 #111; text-shadow: ${ring(0.35, '#111')}; }
.road-card { flex: 1; padding: 3.5mm 6mm; }
.road-card h3 { font-size: 14pt; }
.road-card p { font-size: 9.5pt; margin-top: .5mm; font-weight: 700; color: #30343F; }
.road-note { position: absolute; left: 15mm; right: 15mm; bottom: 24mm; display: flex; gap: 6mm; align-items: flex-start; }
.road-img { width: 74mm; height: 74mm; flex-shrink: 0; transform: rotate(-1.5deg); }
.road-b { flex: 1; font-size: 10.5pt; margin-top: 8mm; padding: 7mm 8mm; }
.road-b .tail { left: 0 !important; top: 40%; transform: rotate(90deg); }

/* 分野の扉 */
.door-page { padding: 0 0 20mm; }
.door-art { height: 128mm; border-width: 0 0 1mm; box-shadow: none; }
.door-band { position: relative; padding: 5mm 15mm 5mm; border-bottom: 1mm solid #111; color: #fff; }
.door-short { font-family: 'M PLUS 1p'; font-weight: 800; font-size: 12pt; margin-top: 2mm; }
.door-name { font-size: 32pt; line-height: 1.25; }
.door-body { padding: 6mm 15mm 0; }
.door-catch { font-size: 16pt; line-height: 1.45; color: #111; }
.door-lead { margin-top: 2mm; font-size: 10pt; font-weight: 700; line-height: 1.85; color: #30343F; }
.door-check { margin-top: 5mm; }
.door-check-t { color: #fff; padding: 1.5mm 5mm; font-size: 11pt; border-bottom: .8mm solid #111; }
.door-check ul { list-style: none; padding: 2mm 5mm 3mm; }
.door-check li { display: flex; gap: 3mm; align-items: flex-start; padding: 1.4mm 0; font-size: 9.5pt; font-weight: 700; border-bottom: .4mm dashed #11111830; line-height: 1.55; }
.door-check li:last-child { border-bottom: 0; }
.door-check .box { margin-top: .5mm; }

/* よくある悩みと原因 */
.wc { display: flex; gap: 6mm; }
.wc-img { width: 62mm; height: 62mm; flex-shrink: 0; transform: rotate(-1.5deg); }
.wc-list { flex: 1; display: flex; flex-direction: column; gap: 5mm; }
.wc-item { display: flex; flex-direction: column; }
.wc-b { font-size: 11pt; display: block; padding: 3mm 6mm; border-radius: 40%; }
.wc-cause { margin-top: 6mm; padding: 5mm 4mm 3mm; overflow: visible; box-shadow: 1.2mm 1.2mm 0 #111; border-width: .8mm; }
.wc-tag { position: absolute; top: -3.5mm; left: 3mm; color: #fff; font-size: 9pt; padding: .2mm 3mm; border: .6mm solid #111; transform: rotate(-3deg); }
.wc-cause p { font-size: 9.5pt; line-height: 1.8; font-weight: 700; color: #30343F; }
.wc-note { margin-top: 8mm; font-size: 11.5pt; display: block; transform: rotate(-.6deg); }

/* 今日からできること */
.today { display: flex; gap: 5mm; }
.today-list { flex: 1; list-style: none; padding: 2mm 5mm; }
.today-list li { display: flex; gap: 3mm; align-items: center; padding: 2.3mm 0; font-size: 10.3pt; font-weight: 700; border-bottom: .4mm dashed #11111830; line-height: 1.55; }
.today-list li:last-child { border-bottom: 0; }
.today-list li > span:first-of-type { flex: 1; }
.today-list .num { flex-shrink: 0; display: grid; place-items: center; width: 7.5mm; height: 7.5mm; color: #fff; border: .6mm solid #111; font-size: 11pt; transform: rotate(-6deg); padding-top: .6mm; }
.today-img { width: 52mm; flex-shrink: 0; transform: rotate(1.2deg); }
.levels { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; }
.level { padding: 5.5mm 3.5mm 3mm; overflow: visible; box-shadow: 1.2mm 1.2mm 0 #111; border-width: .8mm; }
.level-tag { position: absolute; top: -3.5mm; left: 3mm; font-size: 9pt; padding: 0 3mm; border: .6mm solid #111; transform: rotate(-3deg); }
.level ol { padding-left: 4mm; font-size: 8.6pt; font-weight: 700; line-height: 1.6; }
.level li { margin-bottom: 1mm; }
.tip { position: absolute; left: 15mm; right: 15mm; bottom: 22mm; display: flex; align-items: flex-end; gap: 2mm; }
.tip img { width: 44mm; height: 50mm; object-fit: contain; object-position: bottom; }
.tip-b { flex: 1; font-size: 10pt; text-align: left; padding: 5mm 8mm; margin-bottom: 14mm; border-radius: 30%; line-height: 1.7; }
.tip-b .tail { left: 0 !important; top: 60%; transform: rotate(100deg); }
.tip-t { font-size: 14pt; color: #F07A5A; letter-spacing: .06em; text-shadow: ${ring(0.25, '#111')}; }

/* Arcleの支援 */
.sup { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }
.sup-item { padding: 4mm 5mm 4mm 15mm; overflow: visible; }
.sup-num { position: absolute; left: 3mm; top: 3.5mm; display: grid; place-items: center; width: 9mm; height: 9mm; color: #fff; border: .6mm solid #111; font-size: 13pt; transform: rotate(-6deg); padding-top: .6mm; }
.sup-item h3 { font-size: 12pt; line-height: 1.4; }
.sup-item p { font-size: 9pt; line-height: 1.75; margin-top: 1mm; font-weight: 700; color: #30343F; }
.sup-row { display: flex; gap: 5mm; margin-top: 8mm; }
.sup-case { flex: 1; padding: 7mm 5mm 4mm; overflow: visible; }
.case-meta { font-size: 8.5pt; font-weight: 700; color: #50566A; display: flex; align-items: center; gap: 2mm; flex-wrap: wrap; }
.sup-case h3, .case h3 { font-size: 11.5pt; line-height: 1.5; margin-top: 1.5mm; }
.case-sum { font-size: 8.8pt; line-height: 1.75; margin-top: 1.5mm; font-weight: 700; color: #30343F; }
.metric { margin-top: 2.5mm; display: inline-block; background: #FAF3E0; border: .6mm solid #111; padding: 1.2mm 3mm; font-size: 8.5pt; font-weight: 700; }
.metric s { color: #6B7080; }
.metric b { font-family: 'M PLUS 1p'; font-weight: 800; font-size: 11pt; }
.sup-side { width: 52mm; flex-shrink: 0; display: flex; flex-direction: column; gap: 5mm; }
.sup-price { text-align: center; padding: 3mm; }
.sup-price span, .sup-price small { display: block; font-size: 8pt; font-weight: 700; }
.sup-price b { font-family: 'M PLUS 1p'; font-weight: 800; font-size: 15pt; line-height: 1.3; }
.sup-art { flex: 1; min-height: 34mm; }
.sup-read { margin-top: 7mm; padding: 4mm 6mm; background: #FFF6DF; }
.sup-read-t { font-size: 11pt; margin-bottom: 1.5mm; }
.sup-read p { font-size: 9.5pt; font-weight: 700; line-height: 1.5; margin-top: 1.5mm; }
.url { font-weight: 500; font-size: 8.5pt; color: #50566A; margin-left: 4mm; }

/* セルフチェック */
.sheet { width: 100%; border-collapse: collapse; font-size: 9.5pt; line-height: 1.5; background: #fff; border: 1mm solid #111; box-shadow: 2mm 2mm 0 #111; }
.sheet th { background: #111; color: #fff; font-family: 'M PLUS 1p'; font-weight: 800; font-size: 8pt; padding: 1.5mm 1mm; line-height: 1.25; width: 19mm; white-space: nowrap; }
.sheet th small { font-weight: 400; }
.sheet td { border: .3mm solid #11111840; padding: 2.2mm 2.5mm; text-align: center; color: #11111855; font-size: 12pt; }
.sheet td.q, .sheet th.q { text-align: left; width: auto; color: #1F2430; font-size: 9.5pt; font-weight: 700; }
.sheet td.q b { margin-right: 2.5mm; font-size: 11pt; color: #111; }
.sheet-area td { color: #fff !important; font-family: 'M PLUS 1p'; font-weight: 800; text-align: left !important; font-size: 11pt !important; padding: 1.5mm 3mm !important; border-bottom: .8mm solid #111; }
.sheet-area span { font-size: 9pt; }
.sheet-sum td { background: #FAF3E0; font-weight: 800; text-align: right !important; color: #111 !important; font-size: 10pt !important; }
.sheet tbody + tbody .sheet-area td { border-top: 1mm solid #111; }
.blank { display: inline-block; width: 14mm; border-bottom: .6mm solid #111; }
.blank.short { width: 9mm; }
.ranks { margin-top: 6mm; padding: 4mm 6mm; }
.ranks-t { font-size: 11pt; }
.rank-row { display: flex; gap: 2.5mm; margin-top: 2mm; flex-wrap: wrap; }
.rank-row span { display: flex; align-items: center; gap: 1.5mm; border: .6mm solid #111; padding: .5mm 2.5mm; font-size: 9pt; font-weight: 700; background: #FAF3E0; }
.rank-row b { font-size: 16pt; color: #F07A5A; text-shadow: ${ring(0.25, '#111')}; }
.ranks-s { margin-top: 2.5mm; font-size: 9pt; line-height: 1.8; font-weight: 700; color: #30343F; }
.web-check { margin-top: 2mm; display: flex; align-items: flex-end; gap: 2mm; }
.web-check img { width: 34mm; height: 38mm; object-fit: contain; object-position: bottom; }
.wcheck-b { flex: 1; font-size: 10pt; padding: 3.5mm 7mm; margin-bottom: 8mm; line-height: 1.7; border-radius: 35%; }
.wcheck-b .tail { left: 0 !important; top: 55%; transform: rotate(100deg); }
.url-b { font-family: 'Bangers'; font-weight: 400; font-size: 17pt; letter-spacing: .05em; color: #3B6FE0; }

/* モデルケース */
.cases { display: grid; grid-template-columns: 1fr 1fr; gap: 9mm 7mm; }
.case { padding: 7mm 5mm 5mm; overflow: visible; display: flex; flex-direction: column; }
.case .case-sum { flex: 1; }
.case .metric { align-self: flex-start; }

/* 料金と流れ */
.prices { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm; }
.price { padding: 3mm 2mm; text-align: center; box-shadow: 1.2mm 1.2mm 0 #111; border-width: .8mm; }
.price-name { font-size: 9.5pt; }
.price-val { font-size: 12pt; line-height: 1.35; margin-top: .5mm; }
.flow { margin-top: 7mm; display: grid; grid-template-columns: 1fr 1fr; gap: 7mm 6mm; }
.flow-step { padding: 0 0 4mm; }
.flow-img { height: 44mm; border-bottom: .8mm solid #111; }
.flow-img img { width: 100%; height: 100%; object-fit: cover; }
.flow-num { position: absolute; left: 3mm; top: 3mm; background: #F07A5A; color: #fff; border: .6mm solid #111; padding: .8mm 2.5mm 0; font-size: 12pt; transform: rotate(-4deg); text-shadow: ${ring(0.25, '#111')}; }
.flow-step h3 { font-size: 12.5pt; padding: 2.5mm 5mm 0; }
.flow-step p { font-size: 9pt; line-height: 1.75; padding: .5mm 5mm 0; font-weight: 700; color: #30343F; }

/* 裏表紙 */
.back-page { padding: 14mm 15mm 12mm; }
.back { height: 100%; display: flex; flex-direction: column; }
.back-card { min-height: 150mm; color: #fff; }
.back-in { position: relative; z-index: 1; padding: 12mm 10mm; width: 118mm; }
.back-card h2 { font-size: 21pt; line-height: 1.45; margin-top: 5mm; }
.back-in p { margin-top: 5mm; font-size: 10.5pt; font-weight: 700; line-height: 1.85; }
.back-cta { display: inline-block; background: #F2B544; color: #111; border: .8mm solid #111; box-shadow: 1.2mm 1.2mm 0 #111; padding: 2.5mm 6mm; margin-top: 8mm !important; }
.back-cta b { font-family: 'Bangers'; font-weight: 400; font-size: 17pt; letter-spacing: .05em; }
.back-card > .back-hero { position: absolute; right: 6mm; bottom: 8mm; left: auto; width: 64mm; height: auto; border: .8mm solid #111; box-shadow: 1.5mm 1.5mm 0 #F2B544; transform: rotate(2deg); }
.back-info { margin-top: 10mm; display: flex; gap: 6mm; }
.company { flex: 1; padding: 3mm 7mm; }
.company div { display: flex; gap: 5mm; padding: 1.8mm 0; border-bottom: .4mm dashed #11111830; font-size: 9.5pt; font-weight: 700; }
.company div:last-child { border-bottom: 0; }
.company dt { width: 16mm; flex-shrink: 0; font-family: 'M PLUS 1p'; font-weight: 800; }
.qr-box { flex-shrink: 0; padding: 3mm; text-align: center; }
.qr-box img { width: 34mm; height: 34mm; }
.qr-box p { font-family: 'M PLUS 1p'; font-weight: 800; font-size: 9pt; margin-top: 1mm; }
.back-logo { margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end; }
.to-be { font-size: 14pt; letter-spacing: .08em; background: #111; color: #F2B544; padding: 1mm 4mm .5mm; transform: rotate(-2deg); }
`;

const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>IT担当がいない会社のための はじめてのDX読本｜Arcle</title>
<link href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@500;700;800&family=Bangers&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&text=0123456789&display=swap" rel="stylesheet">
<style>${css}</style></head><body>${pages.join('\n')}</body></html>`;

for (const [file, { src, width, alpha }] of jobs) {
  const out = join(imgDir, file);
  if (existsSync(out)) continue;
  const s = sharp(src).resize({ width, withoutEnlargement: true });
  await (alpha ? s.png({ palette: true, quality: 90 }) : s.flatten({ background: '#ffffff' }).jpeg({ quality: 74, mozjpeg: true })).toFile(out);
}

const htmlPath = join(here, 'guide.html');
writeFileSync(htmlPath, html);

// --- PDF に書き出す ---
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const p = await browser.newPage();
await p.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
// 確認用：ページごとの画像（SHOTS に出力先を入れたときだけ）
if (process.env.SHOTS) {
  mkdirSync(process.env.SHOTS, { recursive: true });
  await p.setViewportSize({ width: 794, height: 1123 });
  const els = await p.$$('section.page');
  for (let i = 0; i < els.length; i++) await els[i].screenshot({ path: join(process.env.SHOTS, `p${String(i + 1).padStart(2, '0')}.png`) });
}
const outDir = join(root, 'public/docs');
mkdirSync(outDir, { recursive: true });
await p.pdf({ path: join(outDir, PDF_NAME), format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`wrote public/docs/${PDF_NAME} (${pageNo} pages)`);
