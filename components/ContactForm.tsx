import React, { useEffect, useRef } from 'react';
import { MapPin, User } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ContactForm: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { elementRef, isVisible } = useIntersectionObserver();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            entry.target.classList.remove('reveal-hidden');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-hidden').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="pt-24 pb-0 bg-white">
      {/* Hero Section - More refined and minimal */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50/50 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="reveal-hidden transition-all duration-1000 ease-out">
              <h1 className="font-en text-sm font-bold tracking-[0.3em] text-blue-600 uppercase mb-4">
                Contact
              </h1>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
                ビジネスの可能性を、<br />共に見つけましょう。
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto mb-8 rounded-full"></div>
              <p className="text-gray-500 leading-relaxed max-w-xl mx-auto font-light">
                ご相談や、お見積りのご依頼など、お気軽にお問い合わせください。<br />
                通常2営業日以内に担当よりご連絡を差し上げます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Form Section - Seamless integration */}
      <section className="pb-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto reveal-hidden">
            {/* 
              Card removed for a more "seamless" look. 
              Using a subtle container with no shadow to blend into the page.
            */}
            <div className="w-full overflow-hidden min-h-[1400px]">
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
        </div>
      </section>

      {/* Company Information Section - Same as top page */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-100 rounded-full blur-3xl opacity-40 -z-10 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div 
            ref={elementRef}
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Company Information Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left: Company Info */}
                <div className="p-10 md:p-12">
                  <h4 className="text-xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">
                    事業者情報
                  </h4>
                  
                  <div className="space-y-8 mb-10">
                    <div className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">代表</div>
                        <div className="text-lg font-bold text-gray-900">栗原 勇太</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">所在地</div>
                        <div className="text-lg font-medium text-gray-900">
                          〒491-0835<br />
                          愛知県一宮市あずら2丁目8
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-100">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      お客様のビジネス課題に寄り添い、最適なソリューションをご提案いたします。まずはお気軽にご相談ください。
                    </p>
                  </div>
                </div>

                {/* Right: Google Map */}
                <div className="h-[400px] md:h-auto bg-gray-100">
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
        </div>
      </section>
    </div>
  );
};

export default ContactForm;


