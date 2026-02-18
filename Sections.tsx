import React, { useEffect, useRef } from 'react';
import { ArrowDown, Check, Quote, Mail, MessageSquareText, FileText, Rocket, ArrowRight } from 'lucide-react';
import { useIntersectionObserver, useParallax } from './hooks';

// --- 1. Hero Section ---

interface HeroProps {
  isLoaded: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useParallax(0.4);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollIndicatorRef.current) {
        const opacity = Math.max(0, 1 - window.scrollY / 200);
        scrollIndicatorRef.current.style.opacity = opacity.toString();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = container.clientWidth;
    let height = container.clientHeight;
    const mouse = { x: -1000, y: -1000 };

    interface ArcParticle {
      x: number;
      y: number;
      radius: number;
      startAngle: number;
      arcLength: number;
      rotationSpeed: number;
      vx: number;
      vy: number;
      width: number;
      opacity: number;
    }

    const particles: ArcParticle[] = [];
    const numParticles = 15;

    const init = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      particles.length = 0;
      
      const centerX = width / 2;
      const centerY = height / 2;
      const exclusionRadius = Math.min(width, height) * 0.3;

      for (let i = 0; i < numParticles; i++) {
        let x, y, dist;
        let attempts = 0;
        do {
          x = Math.random() * width;
          y = Math.random() * height;
          const dx = x - centerX;
          const dy = y - centerY;
          dist = Math.sqrt(dx * dx + dy * dy);
          attempts++;
        } while (dist < exclusionRadius && attempts < 100);

        particles.push({
          x: x,
          y: y,
          radius: Math.random() * 80 + 40,
          startAngle: Math.random() * Math.PI * 2,
          arcLength: (Math.PI * 2) * (0.6 + Math.random() * 0.2), 
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          width: Math.random() * 1.0 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.startAngle += p.rotationSpeed;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
            const force = (200 - dist) / 200;
            p.x -= (dx / dist) * force * 1;
            p.y -= (dy / dist) * force * 1;
        }

        if (p.x < -150) p.x = width + 150;
        if (p.x > width + 150) p.x = -150;
        if (p.y < -150) p.y = height + 150;
        if (p.y > height + 150) p.y = -150;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, p.startAngle, p.startAngle + p.arcLength);
        ctx.strokeStyle = `rgba(148, 163, 184, ${p.opacity})`;
        ctx.lineWidth = p.width;
        ctx.lineCap = 'round';
        ctx.stroke();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-transparent">
      <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" role="presentation" />
      <div ref={textRef} className="relative z-10 text-center px-4 will-change-transform mt-10">
        <h1 className={`font-en text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-6 leading-tight drop-shadow-sm ${isLoaded ? 'animate-hero-reveal' : 'opacity-0'}`}>
          <span className="sr-only">Arcle - 愛知県一宮市のITコンサルティング</span>
          Connecting Arcs
          <br />
          <span className="text-slate-400 inline-block mt-2">Creating Circles</span>
        </h1>
        <p className={`text-slate-700 text-base md:text-xl mt-6 font-medium max-w-2xl mx-auto leading-relaxed ${isLoaded ? 'animate-hero-reveal delay-300' : 'opacity-0'}`}>
          中小企業のDX推進を支援するITコンサルティング
        </p>
        <p className={`text-slate-500 text-sm md:text-base mt-3 max-w-xl mx-auto ${isLoaded ? 'animate-hero-reveal delay-300' : 'opacity-0'}`}>
          情シス代行・データ活用・生成AI・Web制作で経営課題を解決
        </p>
      </div>
      <div ref={scrollIndicatorRef} className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
        <ArrowDown size={24} className="text-gray-400" />
      </div>
      <style>{`
        .animate-hero-reveal { animation: heroReveal 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .delay-300 { animation-delay: 0.3s; }
        @keyframes heroReveal {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
      `}</style>
    </section>
  );
};

// --- 2. Philosophy Section ---

export const Philosophy: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const textRef = useParallax(-0.1);

  return (
    <section id="philosophy" className="py-32 md:py-48 bg-transparent relative overflow-hidden">
      <div ref={elementRef} className={`container mx-auto px-6 md:px-12 transition-all duration-1000 relative z-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="hidden md:flex h-96 w-full items-center justify-center">
             {/* Space for Global Canvas Object */}
          </div>
          <div ref={textRef} className="space-y-8 backdrop-blur-sm md:backdrop-blur-none p-4 md:p-0 rounded-xl bg-white/50 md:bg-transparent will-change-transform">
            <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-en">Our Philosophy</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-relaxed">
              「個」の弧をつなぎ、<br/>「縁」という円を描く。
            </h3>
            <div className="space-y-6 text-gray-600 leading-loose">
              <p>Arcle（アークル）という社名には、2つの意味が込められています。</p>
              <p>ひとつは、<strong className="text-gray-800 font-medium">Arc（弧）</strong>。光る個性や専門性を持った、一人ひとりの技術者を表しています。</p>
              <p>もうひとつは、<strong className="text-gray-800 font-medium">Circle（円）</strong>。個々の弧が重なり合い、繋がり合うことで、完璧な円環 ── 「縁」を生み出します。</p>
              <p>ITコンサルティングを通じて、断絶されたシステムや組織を滑らかに繋ぎ、終わりのない価値の循環を社会に創り出すこと。それが私たちの使命です。</p>
            </div>
            
            {/* Notice */}
            <div className="mt-8 pt-6 text-center border-t border-gray-200">
              <p className="text-sm text-gray-500 italic">
                現在、新規のご依頼は一宮市近郊の企業様のみ募集しています
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 3. Services Section ---

const services = [
  {
    id: 'it-management',
    number: '01',
    titleEn: "IT Management",
    titleJa: "情シス代行",
    description: "専任のIT担当者が不在の企業様へ。日々のトラブル対応からセキュリティ対策、ツールの導入・定着まで、貴社の「IT部門」として包括的にサポートします。",
    features: ["ヘルプデスク・PCキッティング", "SaaS導入・アカウント管理", "セキュリティ対策・規定策定", "社内ネットワーク構築・保守", "業務フローのデジタル化支援"],
    color: "text-blue-600",
    ringColor: "border-blue-500",
    link: "/josys"
  },
  {
    id: 'data-consulting',
    number: '02',
    titleEn: "Data Consulting",
    titleJa: "データ活用支援",
    description: "感覚に頼らない経営を。社内に散らばるデータを収集・可視化し、迅速な意思決定とネクストアクションにつながる「生きたデータ」へと昇華させます。",
    features: ["BIツール導入 (Tableau / PowerBI)", "経営ダッシュボード構築", "データ分析基盤の設計・構築", "KPI設計・モニタリング支援", "データリテラシー研修"],
    color: "text-indigo-600",
    ringColor: "border-indigo-500",
    link: "/data-consulting"
  },
  {
    id: 'gen-ai',
    number: '03',
    titleEn: "Generative AI",
    titleJa: "生成AI活用",
    description: "ChatGPT等の生成AIを業務に組み込み、生産性を飛躍的に向上させます。セキュリティを担保した環境構築から、社内独自のボット開発まで伴走支援します。",
    features: ["ChatGPT Enterprise / Team 導入支援", "社内独自AIチャットボット開発 (RAG)", "生成AI利用ガイドライン策定", "業務プロセスへのAI組み込み・自動化", "プロンプトエンジニアリング研修"],
    color: "text-purple-600",
    ringColor: "border-purple-500",
    link: "/gen-ai"
  },
  {
    id: 'web-production',
    number: '04',
    titleEn: "Web Production",
    titleJa: "Web制作",
    description: "企業の「顔」となるWebサイトを制作します。単なる情報発信ではなく、ブランディングとユーザビリティを両立させたデザインで、ビジネスの成果に貢献します。",
    features: ["コーポレートサイト・LP制作", "UI/UX デザイン・改善", "CMS導入 (WordPress / Headless)", "SEO内部対策・パフォーマンス最適化", "サイト保守・運用サポート"],
    color: "text-teal-600",
    ringColor: "border-teal-500",
    link: "/web-production"
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 md:py-48 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-en mb-3">Services</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">事業内容</h3>
        </div>
        <div className="space-y-32 md:space-y-48">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.2 });
            return (
              <div key={service.id} ref={elementRef} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="w-full md:w-1/2 relative flex justify-center items-center">
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] leading-none font-bold text-gray-200 font-en select-none -z-10 ${isEven ? '-ml-10' : 'ml-10'}`} style={{ WebkitTextStroke: '4px white', paintOrder: 'stroke fill', textShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    {service.number}
                  </div>
                  <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                    <div className={`absolute inset-0 rounded-full border-[1px] ${service.ringColor} border-t-transparent opacity-30 animate-[spin_10s_linear_infinite]`} />
                    <div className="absolute inset-4 rounded-full border border-gray-100" />
                    <div className="absolute inset-0 animate-[spin_15s_linear_infinite_reverse]">
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1.5 w-3 h-3 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 space-y-8">
                  <div>
                    <span className={`text-sm font-bold tracking-widest uppercase font-en ${service.color} block mb-2`}>{service.titleEn}</span>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{service.titleJa}</h3>
                  </div>
                  <p className="text-gray-500 leading-loose text-justify">{service.description}</p>
                  <ul className="space-y-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <span className={`mt-1 mr-3 flex-shrink-0 ${service.color}`}><Check size={18} strokeWidth={3} /></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {service.link && (
                    <div className="pt-4">
                      <a 
                        href={service.link}
                        className={`inline-flex items-center text-sm font-bold uppercase tracking-widest ${service.color} hover:opacity-70 transition-opacity group`}
                      >
                        詳しく見る
                        <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- 4. Profile Section ---

export const Profile: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const bgTextRef = useParallax(0.2);
  const circleRef = useParallax(0.1);

  return (
    <section id="profile" className="py-32 bg-gray-50 relative overflow-hidden">
      <div ref={circleRef} className="absolute top-20 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div ref={elementRef} className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/50 relative">
            <div ref={bgTextRef} className="absolute top-0 right-0 -mt-10 -mr-20 text-[8rem] md:text-[12rem] font-bold font-en text-gray-100/50 leading-none select-none pointer-events-none whitespace-nowrap">YUTA KURIHARA</div>
            <div className="flex flex-col md:flex-row relative z-10">
              <div className="w-full md:w-2/5 p-10 md:p-14 bg-gradient-to-b from-white/50 to-blue-50/30 flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-gray-100">
                <div className="relative mb-8 group">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden relative z-10 border-4 border-white shadow-lg">
                     <img
                       src="/images/Gemini_Generated_Image_guortkguortkguor.png"
                       alt="Arcle代表 栗原勇太のプロフィール写真"
                       className="w-full h-full object-cover"
                       loading="lazy"
                       decoding="async"
                     />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 border border-blue-200 rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 border border-dashed border-gray-200 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                </div>
                <span className="inline-block px-4 py-1 bg-blue-600 text-white text-xs font-bold tracking-widest uppercase rounded-full">Data & IT Consultant</span>
                <div className="text-center md:text-left">
                  <h4 className="text-4xl font-bold font-en text-slate-800 tracking-tight mb-1">Yuta Kurihara</h4>
                  <p className="text-lg text-slate-600 font-medium mb-4">栗原 勇太</p>
                </div>
                <div className="mt-12 hidden md:block">
                  <div className="text-sm text-gray-400 font-en tracking-widest mb-2">SPECIALTY</div>
                  <div className="flex flex-wrap gap-2">
                    {['DX Strategy', 'Data Engineering', 'AWS Cloud', 'Tableau', 'Generative AI'].map(tag => (
                      <span key={tag} className="text-xs text-slate-600 bg-white border border-gray-200 px-2 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-3/5 p-10 md:p-14 space-y-12">
                <div className="relative">
                  <Quote className="absolute -top-6 -left-4 text-blue-100 w-16 h-16 transform -scale-x-100" />
                  <div className="relative z-10">
                    <h5 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-4 flex items-center gap-2"><span className="w-8 h-[1px] bg-blue-600"></span>Message</h5>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">データとITの力で、<br/><span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">企業のポテンシャルを解放する。</span></h3>
                    <div className="text-slate-600 leading-8 text-justify space-y-4 font-light">
                      <p>はじめまして。ARCLE代表の栗原です。</p>
                      <p>これまで企業のITやデータ活用に携わる中で、「IT担当者がいれば…」「蓄積されたデータをうまく使えれば…」という場面を数多く見てきました。</p>
                      <p>中小企業や個人事業主の方こそ、最新のテクノロジーを味方につけることで、その独自性を武器に大きく成長できると確信しています。私の経験が、日々挑戦を続ける皆様の課題解決の一助となれば幸いです。</p>
                    </div>
                  </div>
                </div>
                <div>
                   <h5 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-6 flex items-center gap-2"><span className="w-8 h-[1px] bg-blue-600"></span>Biography</h5>
                   <div className="space-y-6 relative border-l-2 border-gray-100 ml-2 pl-8 py-2">
                      <div className="relative">
                        <span className="absolute -left-[39px] top-2 w-4 h-4 rounded-full bg-white border-4 border-blue-200"></span>
                        <h6 className="font-bold text-gray-800 mb-1">外資系自動車メーカー日本法人 / 食品製造業</h6>
                        <p className="text-sm text-gray-500 mb-2">Data Engineer / DX Promoter</p>
                        <p className="text-sm text-slate-600 leading-relaxed">大規模なデータ基盤の構築や、全社的なDX推進プロジェクトをリード。現場の業務フロー改善からデータ分析環境の整備まで幅広く従事。</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[39px] top-2 w-4 h-4 rounded-full bg-white border-4 border-indigo-200"></span>
                        <h6 className="font-bold text-gray-800 mb-1">IT・DX Consultant (Freelance)</h6>
                        <p className="text-sm text-gray-500 mb-2">Representative Director</p>
                        <p className="text-sm text-slate-600 leading-relaxed">数多くの中堅・中小企業のDX推進を支援。<br /><span className="text-xs text-gray-400 mt-1 block">資格: AWS All Certificate / Tableau Certified Data Analyst / DATA Saber</span></p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 5. Flow Section ---

const steps = [
  { step: "01", title: "お問い合わせ", description: "まずはフォームよりお気軽にご連絡ください。些細なご相談でも構いません。", icon: <Mail className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" /> },
  { step: "02", title: "無料相談", description: "現状の課題や目標をヒアリングし、どのような解決策があるか整理します。", icon: <MessageSquareText className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" /> },
  { step: "03", title: "ご提案・お見積り", description: "お客様に最適なプランとスケジュール、明確な費用をご提示します。", icon: <FileText className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" /> },
  { step: "04", title: "ご契約・開始", description: "合意いただけましたら契約を締結し、プロジェクトをスタートさせます。", icon: <Rocket className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" /> }
];

export const Flow: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const circle1Ref = useParallax(0.15);
  const circle2Ref = useParallax(0.1);

  return (
    <section id="flow" className="py-24 bg-white/90 backdrop-blur-sm relative overflow-hidden">
      <div ref={circle1Ref} className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div ref={circle2Ref} className="absolute bottom-0 left-0 w-80 h-80 bg-gray-100 rounded-full blur-3xl opacity-60 -z-10 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold tracking-widest text-blue-500 uppercase font-en mb-3">PROCESS</h2>
          <h3 className="text-3xl font-bold text-gray-900">ご利用の流れ</h3>
          <p className="mt-4 text-gray-500 text-sm md:text-base">お問い合わせから業務開始まで、スムーズにご案内いたします。</p>
        </div>

        <div ref={elementRef} className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="hidden md:block absolute top-16 left-[12.5%] w-[75%] h-[3px] bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 -z-10 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {steps.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center group relative bg-white md:bg-transparent p-6 md:p-0 rounded-2xl shadow-sm md:shadow-none border border-gray-100 md:border-none">
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute bottom-0 left-1/2 w-[2px] h-12 bg-gray-200 -translate-x-1/2 translate-y-full -z-10"></div>
                )}
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full bg-white border-4 border-gray-50 flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:border-blue-100 transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1">
                    {item.icon}
                  </div>
                  <div className="absolute top-0 right-0 bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1 rounded-full border-4 border-white font-en group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    STEP {item.step}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-3 transition-colors">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 6. FAQ Section ---

const faqItems = [
  {
    question: "Arcle（アークル）はどんな会社ですか？",
    answer: "Arcleは愛知県一宮市を拠点とするITコンサルティング企業です。中小企業や個人事業主のお客様を中心に、情シス代行、データ活用支援（Tableau・PowerBI）、生成AI導入支援（ChatGPT等）、Web制作の4つのサービスを提供し、DX推進をサポートしています。"
  },
  {
    question: "情シス代行とはどのようなサービスですか？",
    answer: "情シス代行は、IT専任担当者がいない企業様に代わって、IT部門の役割を担うサービスです。PCトラブル対応、SaaS導入・管理、セキュリティ対策、社内ネットワーク構築など、日々のIT業務を包括的にサポートします。月額5万円〜のライトプランから、IT戦略コンサルティングを含むプレミアムプランまでご用意しています。"
  },
  {
    question: "対応エリアはどこですか？",
    answer: "現在、新規のご依頼は愛知県一宮市近郊の企業様を中心に承っております。訪問サポートは一宮市近郊は無料で、その他エリアは別途交通費をいただいております。リモート対応が可能な業務については、エリアを問わずご相談いただけます。"
  },
  {
    question: "相談や見積りは無料ですか？",
    answer: "はい、初回のご相談・お見積りは無料です。お問い合わせフォームよりご連絡いただければ、通常2営業日以内に担当よりご連絡いたします。現状の課題やご要望をヒアリングし、最適なソリューションをご提案します。"
  },
  {
    question: "生成AI（ChatGPT等）の導入支援はどのような内容ですか？",
    answer: "ChatGPT Enterprise/Team版の導入支援、セキュリティポリシー・利用ガイドライン策定、社内独自AIチャットボット（RAG）開発、プロンプトエンジニアリング研修、業務プロセスへのAI組み込み・自動化など、導入から定着・独自開発まで包括的に支援します。月額5万円〜のスタータープランからご利用いただけます。"
  },
  {
    question: "データ活用支援ではどのようなツールを使いますか？",
    answer: "主にTableauやPowerBIといったBIツールを活用し、経営ダッシュボードの構築やデータ分析基盤の設計を行います。代表の栗原はTableau Certified Data AnalystおよびDATA Saberの資格を保有しており、データの収集・統合から可視化・分析まで一貫してサポートします。"
  }
];

export const FAQ: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section id="faq" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-en mb-3">FAQ</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">よくあるご質問</h3>
        </div>
        <div ref={elementRef} className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {faqItems.map((item, index) => (
            <details key={index} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <h4 className="text-base md:text-lg font-bold text-gray-900 pr-4">{item.question}</h4>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-open:bg-blue-600 group-open:text-white transition-colors">
                  <svg className="w-4 h-4 transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
              </summary>
              <div className="px-6 pb-6">
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 7. Contact Section ---
export { Contact } from './components/Contact';
