import React from 'react';
import { ArrowRight, MapPin, User, Mail } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export const Contact: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-100 rounded-full blur-3xl opacity-40 -z-10 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest text-blue-500 uppercase font-en mb-3">
            Contact
          </h2>
          <h3 className="text-3xl font-bold text-gray-900">
            お問い合わせ
          </h3>
          <p className="mt-4 text-gray-500">
            ご相談やお見積りなど、お気軽にご連絡ください。
          </p>
        </div>

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

                <div className="pt-8 border-t border-gray-100 flex flex-col justify-center">
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    お客様のビジネス課題に寄り添い、最適なソリューションをご提案いたします。まずはお気軽にご相談ください。
                  </p>
                  
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/contact';
                    }}
                    className="group inline-flex items-center justify-center px-8 py-4 font-medium text-blue-600 transition duration-300 ease-out border-2 border-blue-600 rounded-full shadow-md hover:shadow-xl hover:bg-blue-600 hover:text-white w-full md:w-auto gap-2"
                  >
                    お問い合わせフォームへ
                    <ArrowRight size={18} />
                  </a>
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
  );
};