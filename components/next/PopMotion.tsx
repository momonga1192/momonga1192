import React, { useEffect } from 'react';

// .pop-reveal を付けた要素が画面に入ったら .is-in を付けて、ぽんと出す。
// JSが動いたときだけ隠すよう、html に js-motion を付ける（index.css 参照）。ページ移動で増えた要素も拾う
const PopMotion: React.FC = () => {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js-motion');

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    const watch = (scope: ParentNode) => scope.querySelectorAll('.pop-reveal:not(.is-in)').forEach((el) => io.observe(el));
    watch(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches('.pop-reveal:not(.is-in)')) io.observe(node);
          watch(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove('js-motion');
    };
  }, []);

  return null;
};

export default PopMotion;
