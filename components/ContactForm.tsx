import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, MapPin, User } from 'lucide-react';
import { Mark, PageHeader, SectionHead, card, press } from './next/parts';
import { illust, services } from './next/theme';

const steps = ['お問い合わせ', '無料相談', 'ご提案・お見積り', 'ご契約・開始'];
const contactColor = services[0];

const ContactForm: React.FC = () => (
  <div className="bg-cream text-sumi">
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
      image={illust('flow-talk')}
    />

    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] gap-8 items-start">
        <div className={`min-w-0 rounded-[28px] bg-white py-8 md:py-10 ${card}`}>
          <div className="px-6 md:px-10">
            <SectionHead en="Contact Form" title="お問い合わせフォーム" />
            <p className="mt-4 text-sm text-sumi-muted">お預かりした個人情報は、<a href="/privacy" className="underline underline-offset-4 hover:text-sumi">プライバシーポリシー</a>に沿って取り扱います。</p>
          </div>
          {/* Googleフォームの項目・検証・送信・完了表示をそのまま維持する。
              別オリジンのiframe内には、このページからスタイルを適用できない。 */}
          <div className="w-full min-h-[1450px]">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSeaVdp87uj7uZLVKslQQZUImb0-tw678Ik49yPTE6p6xTy6ag/viewform?embedded=true"
                width="100%"
                height="1450"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full"
                title="お問い合わせフォーム"
                style={{ border: 'none' }}
              >
                読み込んでいます…
              </iframe>
          </div>
        </div>

        <aside className="min-w-0 space-y-6" aria-label="ご相談のご案内">
          <div className={`group pop-reveal relative rounded-[28px] bg-cream p-7 md:p-8 ${card}`}>
            <span className="pop-float absolute -top-6 -right-4 grid place-items-center w-16 h-16 rounded-full bg-coral text-white font-head font-black text-[12px] leading-tight text-center border-[2.5px] border-sumi shadow-[3px_3px_0_#1F2430] rotate-12" aria-hidden="true">
              相談
              <br />
              無料!
            </span>
            <p><span className="pop-wiggle inline-block -rotate-3 rounded-lg bg-mustard px-3 py-0.5 font-en text-sm font-black italic tracking-[0.12em] uppercase text-sumi shadow-[3px_3px_0_#1E9C8C]">Process</span></p>
            <h2 className="mt-4 font-head text-2xl md:text-[28px] font-black [word-break:auto-phrase]">ご相談の流れ</h2>
            <ol className="mt-6 space-y-4">
              {steps.map((step, i) => (
                <li key={step} className="group/step flex items-center gap-4">
                  <span className="shrink-0 -rotate-12 transition-transform group-hover/step:rotate-12 w-9 h-9 rounded-full bg-coral text-white grid place-items-center font-en font-black italic border-2 border-sumi shadow-[2px_2px_0_#1F2430]">{i + 1}</span>
                  <span className="font-head font-black text-lg">{step}</span>
                </li>
              ))}
            </ol>
            <a href="/flow" className={`mt-7 inline-flex items-center gap-2 text-sm font-bold ${contactColor.text} hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-svc-josys rounded-full`}>
              ご相談の流れを見る<ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <a href="/flow#faq" style={{ animationDelay: '120ms' }} className={`group pop-reveal flex items-center justify-between gap-4 rounded-[28px] bg-white p-7 font-head font-black text-xl ${card} ${press} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-svc-josys`}>
            よくあるご質問<ArrowRight className={`w-5 h-5 shrink-0 ${contactColor.text} group-hover:translate-x-1 transition-transform`} />
          </a>
        </aside>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-cream bg-[radial-gradient(#1F243014_1.5px,transparent_1.5px)] [background-size:22px_22px] border-t-[2.5px] border-sumi">
      <div className="max-w-6xl mx-auto px-5">
        <div className={`pop-reveal bg-white rounded-[28px] overflow-hidden ${card}`}>
          <div className="grid md:grid-cols-2">
            <div className="p-7 md:p-12">
              <SectionHead en="Information" title="事業者情報" />
              <dl className="space-y-8 mb-10">
                <div className="group flex items-start gap-4">
                  <span className={`pop-wiggle shrink-0 w-12 h-12 rounded-2xl grid place-items-center text-white border-2 border-sumi shadow-[3px_3px_0_#1F2430] -rotate-6 ${contactColor.bg}`}>
                    <User className="w-5 h-5" />
                  </span>
                  <div>
                    <dt className="text-sm text-sumi-muted mb-1">代表</dt>
                    <dd className="text-lg font-bold">栗原 勇太</dd>
                  </div>
                </div>
                <div className="group flex items-start gap-4">
                  <span className={`pop-wiggle shrink-0 w-12 h-12 rounded-2xl grid place-items-center text-white border-2 border-sumi shadow-[3px_3px_0_#1F2430] -rotate-6 ${contactColor.bg}`}>
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <dt className="text-sm text-sumi-muted mb-1">所在地</dt>
                    <dd className="text-lg font-medium">〒491-0835<br />愛知県一宮市あずら2丁目8</dd>
                  </div>
                </div>
              </dl>
              <p className="pt-8 border-t-2 border-dashed border-warm-line text-sm text-sumi-muted leading-[1.9]">
                お客様のビジネス課題に寄り添い、最適なソリューションをご提案いたします。まずはお気軽にご相談ください。
              </p>
            </div>
            <div className="h-[400px] md:h-auto md:min-h-[400px] bg-cream border-t-[2.5px] md:border-t-0 md:border-l-[2.5px] border-sumi">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.267!2d136.824421!3d35.285032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDE3JzA2LjEiTiAxMzbCsDQ5JzI3LjkiRQ!5e0!3m2!1sja!2sjp!4v1735565000000!5m2!1sja!2sjp&t=k&z=15"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Arcle 所在地"
                    className="w-full h-full"
                  ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default ContactForm;
