import InteractivePocket from "./InteractivePocket";

const capabilities = [
  { code: "IT", title: "情シス代行", body: "PCやアカウントの困りごとから、SaaS、セキュリティ、運用ルールまで。", color: "mint" },
  { code: "BI", title: "データ活用", body: "散らばった数字を揃え、経営と現場が同じ景色を見られる状態へ。", color: "coral" },
  { code: "AI", title: "生成AI活用", body: "安全なルールづくりから社内検索、問い合わせ、業務自動化まで。", color: "purple" },
  { code: "WEB", title: "Web制作", body: "会社の強みを言葉とデザインへ変え、相談につながる発信を育てます。", color: "yellow" },
];

export default function Home() {
  return (
    <div className="v5-site">
      <a className="skip-link" href="#main-content">本文へ移動</a>
      <InteractivePocket />
      <main id="main-content">
        <section className="word-river" aria-label="Arcleの支援領域"><div><span>IT SUPPORT</span><i>●</i><span>DATA</span><i>●</i><span>GENERATIVE AI</span><i>●</i><span>WEB</span><i>●</i><span>ONE WINDOW</span><i>●</i><span>IT SUPPORT</span><i>●</i><span>DATA</span></div></section>

        <section className="approach" id="approach">
          <p className="section-label">01 / BEFORE THE SOLUTION</p>
          <div className="approach-head"><h2>売るものからではなく、<br />困っていることから。</h2><p>「BIを入れたい」「AIを使いたい」という言葉の奥に、別の原因が隠れていることがあります。Arcleはサービスを当てはめる前に、仕事の流れ、人、道具、数字を一緒に見ます。</p></div>
          <div className="approach-notes"><article><span>聞く</span><strong>まとまっていない話を、そのまま。</strong></article><article><span>ほどく</span><strong>問題と症状を分け、順番をつくる。</strong></article><article><span>試す</span><strong>小さく始めて、現場で確かめる。</strong></article></div>
        </section>

        <section className="capabilities" id="services">
          <div className="capabilities-head"><p className="section-label">02 / WHAT WE CAN DO</p><h2>必要になったら、<br />全部ここにある。</h2><p>入り口はひとつ。必要な専門性だけを、会社の状況に合わせて組み合わせます。</p></div>
          <div className="capability-grid">{capabilities.map((item, index) => <article className={item.color} key={item.code}><span>0{index + 1}</span><b>{item.code}</b><h3>{item.title}</h3><p>{item.body}</p><a href="#contact" aria-label={`${item.title}について相談する`}>↗</a></article>)}</div>
        </section>

        <section className="profile-v5" id="profile">
          <div className="profile-sticker"><span>LOCAL</span><b>IT PARTNER</b><i>AICHI / ICHINOMIYA</i></div>
          <div className="profile-v5-image"><img src="/yuta-kurihara.png" alt="Arcle代表 栗原勇太" /><span>YUTA KURIHARA</span></div>
          <div className="profile-v5-copy"><p className="section-label">03 / WHO LISTENS</p><h2>現場の言葉で聞き、<br />経営の目線で考える。</h2><p>外資系自動車メーカー日本法人、食品製造業で、データ基盤構築や全社DXを推進してきました。大きな会社で培った知見を、中小企業の現場で使えるサイズへ翻訳します。</p><blockquote>「それ、誰に聞けばいい？」を、なくしたい。</blockquote><div><span>AWS All Certifications</span><span>Tableau Certified Data Analyst</span><span>DATA Saber</span></div></div>
        </section>

        <section className="how-v5">
          <p className="section-label">04 / HOW IT STARTS</p><h2>30分の雑談から、<br />十分です。</h2>
          <ol><li><span>01</span><strong>話す</strong><p>最近面倒なことを、そのまま。</p></li><li><span>02</span><strong>見立てる</strong><p>原因と、最初の一歩を整理。</p></li><li><span>03</span><strong>小さく試す</strong><p>効果が見える範囲から実行。</p></li><li><span>04</span><strong>一緒に育てる</strong><p>使われる状態まで伴走。</p></li></ol>
        </section>

        <section className="contact-v5" id="contact">
          <span className="contact-badge">NO PERFECT BRIEF NEEDED</span>
          <p className="section-label">05 / LET&apos;S TALK</p><h2>説明できない困りごとほど、<br />聞かせてください。</h2><p>まずは30分。営業資料も要件定義もいりません。</p><a href="mailto:contact@arcle.net">無料相談を申し込む <b>↗</b></a>
          <div className="mini-pocke" aria-hidden="true"><i /><i /><b /></div>
        </section>
      </main>
      <footer className="footer-v5"><strong>Arcle</strong><span>愛知県一宮市</span><span>© 2026 Arcle</span></footer>
    </div>
  );
}
