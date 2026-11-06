import ScrollWorld from "./ScrollWorld";

const services = [
  ["01", "IT", "情シス代行", "日々の困りごとから、セキュリティ、SaaS管理、PC環境まで。社内のIT担当として伴走します。"],
  ["02", "BI", "データ活用支援", "散らばった数字を集め、経営と現場が同じ景色を見られるダッシュボードへ整えます。"],
  ["03", "AI", "生成AI活用", "安全に使うルールづくりから、社内検索、業務への組み込みまで。使えるAIを一緒につくります。"],
  ["04", "↗", "Web制作", "会社の強みを言葉とデザインで整理し、見つけてもらい、相談につながるサイトを制作します。"],
];

export default function Home() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">本文へ移動</a>
      <ScrollWorld />
      <main id="main-content" className="after-world">
        <section className="intro-section">
          <p className="kicker">ONE WINDOW, FOUR CAPABILITIES</p>
          <div>
            <h2>必要なところから、<br />ひとつずつ。</h2>
            <p>4つの支援を別々に売るのではなく、会社の状況に合わせて組み合わせます。相談窓口は、ずっとひとつです。</p>
          </div>
        </section>

        <section className="service-section" id="services">
          {services.map(([number, code, title, body]) => (
            <article key={number}>
              <span>{number}</span><b>{code}</b><h3>{title}</h3><p>{body}</p><a href="#contact" aria-label={`${title}について相談する`}>↗</a>
            </article>
          ))}
        </section>

        <section className="meaning-section">
          <div className="meaning-world" aria-hidden="true"><i /><i /><i /><span>Arcle</span></div>
          <div>
            <p className="kicker kicker-light">ARC × CIRCLE</p>
            <h2>「個」の弧をつなぎ、<br />「縁」という円を描く。</h2>
            <p>システム、データ、組織、人。会社の中で分かれているものを滑らかにつなぎ、価値が循環し続ける状態をつくる。それがArcleの仕事です。</p>
          </div>
        </section>

        <section className="profile-section" id="profile">
          <div className="profile-image"><img src="/yuta-kurihara.png" alt="Arcle代表 栗原勇太" /><span>YUTA KURIHARA / REPRESENTATIVE</span></div>
          <div className="profile-copy">
            <p className="kicker">YOUR LOCAL IT PARTNER</p>
            <h2>現場の言葉で話し、<br />経営の目線で考える。</h2>
            <p>外資系自動車メーカー日本法人、食品製造業で、データ基盤構築や全社DX推進を経験してきました。大きな会社で培った知見を、中小企業の現場で使えるサイズへ翻訳します。</p>
            <blockquote>「それ、誰に聞けばいい？」を、なくしたい。</blockquote>
            <div><span>AWS All Certifications</span><span>Tableau Certified Data Analyst</span><span>DATA Saber</span></div>
          </div>
        </section>

        <section className="process-section" id="process">
          <p className="kicker">PROCESS</p><h2>小さく始めて、<br />一緒に育てる。</h2>
          <ol>
            <li><span>01</span><h3>無料相談</h3><p>いま困っていることを、そのままお聞かせください。</p></li>
            <li><span>02</span><h3>現状整理</h3><p>業務・ツール・データから、課題の根を整理します。</p></li>
            <li><span>03</span><h3>小さく実行</h3><p>効果が見えやすいところから、導入を始めます。</p></li>
            <li><span>04</span><h3>運用と改善</h3><p>現場で使われる状態まで伴走し、改善を続けます。</p></li>
          </ol>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-rings" aria-hidden="true"><i /><i /><i /></div>
          <p className="kicker kicker-light">LET&apos;S CONNECT</p>
          <h2>まだ課題がまとまって<br />いなくても、大丈夫です。</h2>
          <p>まずは30分。いま一番時間がかかっている仕事や、気になっていることを教えてください。</p>
          <a href="mailto:contact@arcle.net">無料相談を申し込む <b>→</b></a>
        </section>
      </main>
      <footer><strong>Arcle</strong><span>愛知県一宮市</span><span>© 2026 Arcle</span></footer>
    </div>
  );
}
