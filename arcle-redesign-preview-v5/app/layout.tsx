import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcle | その『なんか困る』を、投げてください。",
  description: "サービスを選ぶ前に、困りごとから。愛知県一宮市の中小企業向け情シス・データ・生成AI・Web支援。",
  metadataBase: new URL("https://www.arcle.net"),
  openGraph: {
    title: "その『なんか困る』を、投げてください。| Arcle",
    description: "困りごとから相談ルートを組み立てる、愛知・一宮のIT・DXパートナー",
    type: "website",
    locale: "ja_JP",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Arcle — 会社のITが、ひとつにつながる。" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "その『なんか困る』を、投げてください。| Arcle",
    description: "困りごとから相談ルートを組み立てる、愛知・一宮のIT・DXパートナー",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
