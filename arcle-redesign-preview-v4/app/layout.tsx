import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcle | 仕事の迷子を、迎えにいこう。",
  description: "小さな案内役と巡る、愛知県一宮市の中小企業向けIT・DX支援。情シス、データ、生成AI、Webをひとつの道につなぎます。",
  metadataBase: new URL("https://www.arcle.net"),
  openGraph: {
    title: "仕事の迷子を、迎えにいこう。| Arcle",
    description: "案内役アルと巡る、愛知・一宮のIT・DXパートナー",
    type: "website",
    locale: "ja_JP",
    images: [{ url: "/og-v4.png", width: 1731, height: 909, alt: "Arcle — 仕事の迷子を、迎えにいこう。" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "仕事の迷子を、迎えにいこう。| Arcle",
    description: "案内役アルと巡る、愛知・一宮のIT・DXパートナー",
    images: ["/og-v4.png"],
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
