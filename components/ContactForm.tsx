import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, FileText, Handshake, Mail, MapPin, MessagesSquare, User } from 'lucide-react';
import { Mark, PageHeader, SectionHead, comicBtn, comicBtnShape, comicIllust } from './next/parts';
import { Burst, Caption, panel, panelPress } from './next/comic';
import { isDummyEmail, sendInquiry, type Inquiry } from './next/check/leadForm';

// お問い合わせページ（アメコミ版）。フォームのコマ・ご相談の流れのコマ割り・事業者情報のコマで組む
const steps = [
  { label: 'お問い合わせ', icon: Mail, tone: 'bg-svc-josys' },
  { label: '無料相談', icon: MessagesSquare, tone: 'bg-svc-data' },
  { label: 'ご提案・お見積り', icon: FileText, tone: 'bg-svc-ai' },
  { label: 'ご契約・開始', icon: Handshake, tone: 'bg-svc-web' }
];

const topics = ['サービスに関するご相談', '見積もり・料金に関するお問い合わせ', '業務提携・パートナーシップに関するお問い合わせ', 'その他'];

const track = (name: string, params?: Record<string, unknown>) => window.gtag?.('event', name, params);

// お問い合わせの入力欄。送った内容はIT健康診断と同じスプレッドシートの「お問い合わせ」シートに記録する（docs/it-check-gas.md）
const InquiryForm: React.FC = () => {
  const [inq, setInq] = useState<Inquiry>({ company: '', name: '', email: '', phone: '', topic: '', message: '' });
  const [agree, setAgree] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  // ロボットよけ：画面には見えない欄。ここが埋まっていたら送信しない
  const [trap, setTrap] = useState('');
  const set = (key: keyof Inquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInq({ ...inq, [key]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDummyEmail(inq.email)) {
      setEmailError('ご連絡のとれるメールアドレスを入力してください');
      return;
    }
    setSending(true);
    setError('');
    try {
      if (!trap) await sendInquiry(inq);
    } catch {
      // 通信できなかったときは、入力を残したまま知らせる
      setSending(false);
      setError('送信できませんでした。通信の状態を確かめて、もう一度お試しください。');
      return;
    }
    track('generate_lead', { form: 'contact' });
    setSent(true);
    // フォームのコマの頭（見出し）まで戻して、受け付けた表示を見せる
    window.scrollTo({ top: (document.getElementById('inquiry')?.parentElement?.getBoundingClientRect().top ?? 0) + window.scrollY - 100, behavior: 'smooth' });
  };

  if (sent)
    return (
      <div className="relative px-5 sm:px-8 md:px-10 py-12 md:py-16 text-center comic-rays [--ray-a:#FAF3E0] [--ray-b:#F6EBD0]">
        <Burst text="THANK YOU!" wide className="relative! inline-grid! w-[260px] md:w-[320px]" textClass="text-white text-[30px] md:text-[36px]" rotate={-6} />
        <p className="mt-6 font-manga text-[22px] md:text-[28px] leading-snug [word-break:auto-phrase]">お問い合わせを受け付けました</p>
        <p className="mt-4 inline-block bg-white border-[3px] border-[#111] px-4 py-3 text-sm md:text-base font-bold leading-[1.9] shadow-[4px_4px_0_#111] [word-break:auto-phrase]">
          通常2営業日以内に、担当より
          <br />
          「{inq.email}」へご連絡します。
        </p>
        <p className="mt-6 text-xs text-sumi-muted [word-break:auto-phrase]">数日たっても連絡がない場合は、お手数ですが、もう一度お送りください。</p>
      </div>
    );

  const input = 'mt-1.5 w-full bg-white border-[3px] border-[#111] px-4 py-3 text-base font-normal shadow-[3px_3px_0_#111] focus:outline-none focus:bg-[#FFF8E6] focus:shadow-[3px_3px_0_#F07A5A]';
  const required = <span className="ml-1.5 inline-block bg-coral text-white border-2 border-[#111] px-1.5 text-[11px] font-manga leading-[1.5] align-[1px]">必須</span>;

  return (
    <form id="inquiry" onSubmit={submit} className="relative px-5 sm:px-8 md:px-10 py-8 md:py-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-bold">
          会社名{required}
          <input required value={inq.company} onChange={set('company')} autoComplete="organization" className={input} />
        </label>
        <label className="block text-sm font-bold">
          お名前{required}
          <input required value={inq.name} onChange={set('name')} autoComplete="name" className={input} />
        </label>
        <label className="block text-sm font-bold">
          メールアドレス{required}
          <input
            required
            type="email"
            value={inq.email}
            onChange={(e) => {
              setEmailError('');
              set('email')(e);
            }}
            autoComplete="email"
            aria-invalid={!!emailError}
            className={input}
          />
          {emailError && <span className="block mt-1.5 text-xs font-bold text-coral">{emailError}</span>}
        </label>
        <label className="block text-sm font-bold">
          電話番号{required}
          <input required pattern="[0-9０-９\-－+ ]{10,}" title="電話番号を入力してください（例：0586-00-0000）" type="tel" value={inq.phone} onChange={set('phone')} autoComplete="tel" className={input} />
        </label>
        <label aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          ホームページ
          <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </label>
      </div>

      {/* 種別：選ぶと色が付く札 */}
      <fieldset className="mt-7">
        <legend className="text-sm font-bold">
          お問い合わせの種別{required}
        </legend>
        <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
          {topics.map((t) => (
            <label
              key={t}
              className="flex items-center gap-3 cursor-pointer bg-white border-[3px] border-[#111] px-3.5 py-3 text-sm font-bold leading-snug shadow-[3px_3px_0_#111] transition-colors has-[:checked]:bg-mustard has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-svc-josys"
            >
              <input required type="radio" name="topic" value={t} checked={inq.topic === t} onChange={() => setInq({ ...inq, topic: t })} className="shrink-0 w-4 h-4 accent-[#111]" />
              <span className="[word-break:auto-phrase]">{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block mt-7 text-sm font-bold">
        お問い合わせの内容{required}
        <textarea required rows={7} value={inq.message} onChange={set('message')} placeholder="例）社員が10人ほどの会社です。PCやアカウントの管理を任せられるところを探しています。" className={`${input} leading-relaxed resize-y placeholder:text-sumi-muted/70`} />
      </label>

      <label className="mt-6 flex items-start gap-2.5 text-xs leading-relaxed text-sumi-muted">
        <input required type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#111]" />
        <span>
          入力いただいた情報は、お問い合わせへの回答と、Arcleからのご連絡にのみ使います。
          <a href="/privacy" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-sumi">プライバシーポリシー</a>に同意して送信します。
        </span>
      </label>
      {error && (
        <p role="alert" className="mt-4 text-sm font-bold text-coral">
          {error}
        </p>
      )}
      <button type="submit" disabled={sending} className={`mt-7 w-full sm:w-auto ${comicBtnShape} px-10 text-[16px] bg-[#111] text-white shadow-[5px_5px_0_#F2B544] hover:shadow-[2px_2px_0_#F2B544] disabled:opacity-60`}>
        {sending ? '送信しています…' : '送信する'}
        <ArrowRight className="w-4 h-4" strokeWidth={3} />
      </button>
    </form>
  );
};

const ContactForm: React.FC = () => (
  <div className="bg-[#FAF3E0] text-sumi overflow-x-clip">
    <Helmet>
      <title>お問い合わせ・無料相談 | 愛知・東海の中小企業のIT支援 - Arcle</title>
      <meta name="description" content="Arcleへのご相談・お見積りは無料です。ITコンサルティング、情シス代行、データ活用支援（Tableau・PowerBI）、生成AI導入支援、Web制作について、お気軽にお問い合わせください。通常2営業日以内にご連絡します。" />
      <link rel="canonical" href="https://www.arcle.net/contact" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://www.arcle.net/" },
          { "@type": "ListItem", "position": 2, "name": "お問い合わせ", "item": "https://www.arcle.net/contact" }
        ]
      })}</script>
    </Helmet>

    <PageHeader
      en="Contact"
      title={<>ビジネスの<Mark>可能性</Mark>を、<br />共に見つけましょう。</>}
      lead={<>ご相談や、お見積りのご依頼など、お気軽にお問い合わせください。<br />通常2営業日以内に担当よりご連絡を差し上げます。</>}
      crumbs={[{ label: 'お問い合わせ' }]}
      image={comicIllust('contact-check-contact-header')}
      imageMode="panel"
    />

    <section className="relative py-20 md:py-28 comic-dots">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] gap-12 lg:gap-8 items-start">
        {/* フォームのコマ：上に濃紺の帯（見出し）、下に入力欄 */}
        <div className={`relative min-w-0 bg-white ${panel}`}>
          <div className="relative overflow-hidden bg-sumi comic-dots-light text-white border-b-[4px] border-[#111] px-5 sm:px-8 md:px-10 pt-10 pb-7">
            <div className="absolute inset-0 comic-speed [--speed:rgb(255_255_255/0.08)]" aria-hidden="true" />
            <Caption className="absolute -top-0.5 left-4 sm:left-7 -rotate-2 font-comic !text-[18px] md:!text-[20px] tracking-[0.08em]">WRITE TO ARCLE!</Caption>
            <h2 className="relative font-manga text-[26px] md:text-[38px] leading-[1.35] text-white [paint-order:stroke_fill] [-webkit-text-stroke:6px_#111] [text-shadow:4px_4px_0_#F2B544]">お問い合わせフォーム</h2>
            <p className="relative mt-4 inline-block bg-white text-sumi border-[3px] border-[#111] px-3 py-2 text-sm font-bold shadow-[3px_3px_0_#F2B544]">
              お預かりした個人情報は、<a href="/privacy" className="underline underline-offset-4 text-svc-josys hover:text-sumi">プライバシーポリシー</a>に沿って取り扱います。
            </p>
          </div>
          <InquiryForm />
        </div>

        <aside className="min-w-0 space-y-10 lg:sticky lg:top-24" aria-label="ご相談のご案内">
          {/* ご相談の流れ：番号付きの小さなコマを縦につなぐ */}
          <div className={`pop-reveal relative comic-rays [--ray-a:#F2B544] [--ray-b:#F6C35F] p-6 pt-9 md:p-7 md:pt-10 -rotate-1 ${panel}`}>
            <Caption tone="bg-coral text-white" className="absolute -top-4 left-4 -rotate-3 font-comic !text-[18px] tracking-[0.08em]">PROCESS</Caption>
            <Burst
              text={
                <>
                  相談
                  <br />
                  無料!
                </>
              }
              className="w-[88px] -top-10 -right-4"
              fill="#fff"
              core="#3B6FE0"
              textClass="font-manga text-[16px] text-center text-white [-webkit-text-stroke:4px_#111]"
              rotate={12}
              delay={0.2}
            />
            <h2 className="font-manga text-[24px] md:text-[28px] leading-snug text-white [paint-order:stroke_fill] [-webkit-text-stroke:6px_#111] [text-shadow:3px_3px_0_#111] [word-break:auto-phrase]">ご相談の流れ</h2>
            <ol className="mt-6 space-y-3">
              {steps.map((step, i) => (
                <li key={step.label} className={`group/step relative flex items-center gap-4 bg-white border-[3px] border-[#111] px-3 py-3 shadow-[4px_4px_0_#111] ${i % 2 ? 'rotate-[0.8deg]' : '-rotate-[0.8deg]'}`}>
                  <span className={`relative shrink-0 grid place-items-center w-11 h-11 text-white border-[3px] border-[#111] -rotate-6 transition-transform group-hover/step:rotate-6 ${step.tone}`}>
                    <step.icon className="w-5 h-5" strokeWidth={2.6} aria-hidden="true" />
                    <span className="absolute -top-3 -left-3 grid place-items-center w-6 h-6 bg-mustard text-[#111] font-comic text-[16px] leading-none border-2 border-[#111] rotate-12">{i + 1}</span>
                  </span>
                  <span className="font-manga text-[17px] leading-snug">{step.label}</span>
                  {i < steps.length - 1 && (
                    <svg viewBox="0 0 20 16" className="absolute left-[22px] -bottom-[15px] z-10 w-5 h-4" aria-hidden="true">
                      <path d="M2 2 L10 14 L18 2 Z" fill="#F07A5A" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
            <a href="/flow" className={`mt-7 w-full ${comicBtn} px-5 py-3 text-[15px] bg-[#111] text-white`}>
              ご相談の流れを見る
              <ArrowRight className="w-4 h-4" strokeWidth={3} />
            </a>
          </div>

          <a href="/flow#faq" style={{ animationDelay: '120ms' }} className={`group pop-reveal relative flex items-center justify-between gap-4 bg-white p-6 pt-8 font-manga text-xl rotate-1 ${panel} ${panelPress} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-svc-josys`}>
            <span className="absolute -top-4 left-4 -rotate-3 bg-svc-josys text-white border-[3px] border-[#111] px-3 pt-1 pb-0.5 font-comic text-[18px] leading-none tracking-[0.08em] shadow-[3px_3px_0_#111]" aria-hidden="true">
              Q&amp;A
            </span>
            よくあるご質問
            <span className="shrink-0 grid place-items-center w-10 h-10 bg-mustard border-[3px] border-[#111] shadow-[3px_3px_0_#111] group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </span>
          </a>
        </aside>
      </div>
    </section>

    {/* 事業者情報：左に情報のコマ、右に地図のコマ（斜めの境目は PC のみ） */}
    <section className="relative py-20 md:py-28 bg-mustard comic-dots border-t-[4px] border-[#111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <div className={`pop-reveal bg-white overflow-hidden ${panel} shadow-[10px_10px_0_#111]`}>
          <div className="grid md:grid-cols-2">
            <div className="p-6 sm:p-8 md:p-12">
              <SectionHead en="INFORMATION" enTone="bg-svc-josys text-white" title="事業者情報" />
              <dl className="-mt-4 md:-mt-6 space-y-5 mb-10">
                <div className="flex items-center gap-4 bg-[#FAF3E0] border-[3px] border-[#111] px-4 py-4 shadow-[4px_4px_0_#111]">
                  <span className="shrink-0 grid place-items-center w-12 h-12 text-white border-[3px] border-[#111] -rotate-6 bg-svc-josys">
                    <User className="w-5 h-5" strokeWidth={2.6} />
                  </span>
                  <div>
                    <dt className="inline-block bg-mustard border-2 border-[#111] px-2 text-xs font-manga mb-1">代表</dt>
                    <dd className="font-manga text-xl">栗原 勇太</dd>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-[#FAF3E0] border-[3px] border-[#111] px-4 py-4 shadow-[4px_4px_0_#111]">
                  <span className="shrink-0 grid place-items-center w-12 h-12 text-white border-[3px] border-[#111] rotate-6 bg-coral">
                    <MapPin className="w-5 h-5" strokeWidth={2.6} />
                  </span>
                  <div>
                    <dt className="inline-block bg-mustard border-2 border-[#111] px-2 text-xs font-manga mb-1">所在地</dt>
                    <dd className="text-lg font-bold leading-snug">〒491-0835<br /><span className="inline-block">愛知県一宮市</span><span className="inline-block">あずら2丁目8</span></dd>
                  </div>
                </div>
              </dl>
              <p className="relative bg-white border-[3px] border-[#111] rounded-[28px] px-5 py-4 text-sm font-bold leading-[1.9] shadow-[4px_4px_0_#111] [word-break:auto-phrase]">
                お客様のビジネス課題に寄り添い、最適なソリューションをご提案いたします。まずはお気軽にご相談ください。
              </p>
            </div>
            <div className="relative h-[400px] md:h-auto md:min-h-[400px] bg-[#FAF3E0] border-t-[4px] md:border-t-0 md:border-l-[4px] border-[#111]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.267!2d136.824421!3d35.285032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDE3JzA2LjEiTiAxMzbCsDQ5JzI3LjkiRQ!5e0!3m2!1sja!2sjp!4v1735565000000!5m2!1sja!2sjp&t=k&z=15"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Arcle 所在地"
                className="absolute inset-0 w-full h-full"
              ></iframe>
              <span className="pointer-events-none absolute left-3 top-3 -rotate-3 bg-coral text-white border-[3px] border-[#111] px-3 pt-1 pb-0.5 font-comic text-[18px] leading-none tracking-[0.08em] shadow-[3px_3px_0_#111]" aria-hidden="true">
                HERE!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default ContactForm;
