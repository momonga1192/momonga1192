import type { ServiceKey } from '../next/theme';

// お役立ち記事の本文（アメコミ版）の見た目。9本の記事で同じクラスを使い、見た目をそろえる。
// 長い文章を読みやすくするため、効果は見出し・表・箱にだけ付け、本文の段落は落ち着いた黒い文字のままにする
// Tailwindが検出できるよう、クラス名は完全な文字列で持つ

const h2Base =
  'relative w-fit max-w-full -ml-1 sm:-ml-3 -rotate-[0.6deg] border-[3px] border-[#111] px-4 py-2.5 font-manga text-[20px] md:text-[24px] leading-[1.5] text-white shadow-[4px_4px_0_#111] [word-break:auto-phrase]';

export const ac = {
  // ページ全体と、本文を載せる白い紙のコマ
  page: 'bg-[#FAF3E0] text-sumi overflow-x-clip',
  article: 'relative comic-dots bg-[#FAF3E0] py-14 md:py-24 px-3 sm:px-5',
  sheet:
    'relative max-w-3xl mx-auto bg-white border-[4px] border-[#111] shadow-[8px_8px_0_#111] px-5 py-10 sm:px-10 md:px-14 md:py-14 text-[16px] leading-[2] text-[#30343F]',
  // 本文の大見出し：事業の色のナレーションの箱
  h2: {
    josys: `${h2Base} mt-16 mb-6 bg-svc-josys`,
    data: `${h2Base} mt-16 mb-6 bg-svc-data`,
    ai: `${h2Base} mt-16 mb-6 bg-svc-ai`,
    web: `${h2Base} mt-16 mb-6 bg-svc-web`
  } as Record<ServiceKey, string>,
  // 上の余白を持たない大見出し（関連記事など、区切り線のすぐ下）
  h2Flat: {
    josys: `${h2Base} mb-6 bg-svc-josys`,
    data: `${h2Base} mb-6 bg-svc-data`,
    ai: `${h2Base} mb-6 bg-svc-ai`,
    web: `${h2Base} mb-6 bg-svc-web`
  } as Record<ServiceKey, string>,
  // 小見出し：黒い下線と、傾いたからし色の四角
  h3: "flex gap-2.5 w-fit max-w-full font-manga text-[18px] md:text-[20px] leading-snug text-[#111] [word-break:auto-phrase] mt-10 mb-3 pb-1.5 border-b-[3px] border-[#111] before:content-[''] before:shrink-0 before:mt-[0.3em] before:w-3.5 before:h-3.5 before:bg-mustard before:border-[2.5px] before:border-[#111] before:rotate-12",
  p: 'text-[#30343F] leading-[2] mb-5',
  // 記事の札と日付
  tag: {
    josys: '-rotate-2 border-[3px] border-[#111] px-3 py-0.5 text-sm font-manga text-white shadow-[3px_3px_0_#111] bg-svc-josys',
    data: '-rotate-2 border-[3px] border-[#111] px-3 py-0.5 text-sm font-manga text-white shadow-[3px_3px_0_#111] bg-svc-data',
    ai: '-rotate-2 border-[3px] border-[#111] px-3 py-0.5 text-sm font-manga text-white shadow-[3px_3px_0_#111] bg-svc-ai',
    web: '-rotate-2 border-[3px] border-[#111] px-3 py-0.5 text-sm font-manga text-white shadow-[3px_3px_0_#111] bg-svc-web'
  } as Record<ServiceKey, string>,
  date: 'font-comic text-[18px] leading-none tracking-[0.06em] text-[#111]',
  dateJa: 'text-sm font-bold text-[#111]',
  // 表：太い黒線の枠と、からし色の見出し行
  tableWrap: 'border-[3px] border-[#111] shadow-[5px_5px_0_#111] bg-white',
  thead: 'bg-mustard text-[#111] border-b-[3px] border-[#111]',
  caption: 'px-5 py-3 text-left font-manga text-[15px] text-[#111] bg-[#FAF3E0] border-b-[3px] border-[#111]',
  row: 'border-t-2 border-[#111]/20',
  // チェックリストなどの囲み：上の辺にまたがる黄色の札を見出しにする
  box: 'relative mt-12 mb-8 bg-[#FAF3E0] border-[3px] border-[#111] shadow-[5px_5px_0_#111] p-6 pt-9 md:p-8 md:pt-10',
  boxTitle:
    'relative -mt-[54px] md:-mt-[60px] mb-5 -ml-1 w-fit max-w-full -rotate-2 bg-mustard border-[3px] border-[#111] px-3 py-1 font-manga text-[15px] md:text-[16px] leading-snug text-[#111] shadow-[3px_3px_0_#111] [word-break:auto-phrase]',
  check: 'mt-[0.45em] h-4 w-4 shrink-0 border-[2.5px] border-[#111] bg-white shadow-[2px_2px_0_#111]',
  pre: '[font-family:inherit] whitespace-pre-wrap border-[3px] border-[#111] bg-[#FAF3E0] shadow-[5px_5px_0_#111] p-6 text-sm leading-[1.9] text-sumi overflow-x-auto',
  // 本文の途中の、サービスへの案内。網点の箱の上の辺から、アドバイスするヒーローがのぞく
  promo:
    'relative mt-[150px] md:mt-[190px] mb-12 bg-[#FAF3E0] comic-dots border-[4px] border-[#111] shadow-[8px_8px_0_#111] p-6 pt-10 md:p-8 md:pt-11',
  promoLabel:
    'absolute -top-4 left-4 -rotate-3 border-[3px] border-[#111] bg-coral px-3 pt-1 pb-0.5 font-comic text-[20px] leading-none tracking-[0.08em] text-white shadow-[3px_3px_0_#111]',
  promoHero: 'pointer-events-none absolute bottom-full right-2 md:right-6 w-[132px] md:w-[170px] max-w-none',
  promoTitle: 'font-manga text-[18px] leading-snug text-[#111] mb-3 [word-break:auto-phrase]',
  // よくある質問：1問ずつコマにする
  faq: "space-y-6 text-[#30343F] leading-[2] [&>div]:border-[3px] [&>div]:border-[#111] [&>div]:bg-white [&>div]:shadow-[5px_5px_0_#111] [&>div]:p-6 [&_h3]:mb-3 [&_h3]:pb-3 [&_h3]:border-b-2 [&_h3]:border-dashed [&_h3]:border-[#111]/30",
  faqQ: "font-manga text-[17px] leading-snug text-[#111] [word-break:auto-phrase] before:content-['Q.'] before:mr-2 before:font-comic before:text-[24px] before:leading-none before:text-coral",
  // 関連記事
  related: 'mt-16 border-t-[3px] border-dashed border-[#111]/30 pt-10',
  relatedLink:
    'block border-[3px] border-[#111] bg-white px-4 py-3 font-bold leading-relaxed text-[#111] shadow-[4px_4px_0_#111] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#111] hover:bg-mustard/30',
  allLink: 'inline-block mt-2 font-manga text-[#111] underline underline-offset-4 decoration-2 hover:bg-mustard',
  // 関連サービス：事業の色の網点のコマ
  svcBox: {
    josys: 'relative mt-16 p-6 md:p-8 bg-svc-josys comic-dots-light border-[4px] border-[#111] shadow-[8px_8px_0_#111] text-white',
    data: 'relative mt-16 p-6 md:p-8 bg-svc-data comic-dots-light border-[4px] border-[#111] shadow-[8px_8px_0_#111] text-white',
    ai: 'relative mt-16 p-6 md:p-8 bg-svc-ai comic-dots-light border-[4px] border-[#111] shadow-[8px_8px_0_#111] text-white',
    web: 'relative mt-16 p-6 md:p-8 bg-svc-web comic-dots-light border-[4px] border-[#111] shadow-[8px_8px_0_#111] text-white'
  } as Record<ServiceKey, string>,
  svcTitle: 'font-manga text-2xl text-white [paint-order:stroke_fill] [-webkit-text-stroke:5px_#111] [text-shadow:3px_3px_0_#111] [word-break:auto-phrase]',
  svcBtn:
    'mt-6 inline-flex items-center gap-2 px-6 py-3.5 border-[3px] border-[#111] bg-mustard font-manga text-[#111] shadow-[5px_5px_0_#111] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#111]',
  author: 'mt-12 text-sm font-bold text-[#30343F]'
};

// 本文の途中の案内の箱に置くヒーロー（人さし指を立ててアドバイスする切り抜き）
export const promoHeroSrc = '/images/illust-comic/works-articles-advice.webp';
