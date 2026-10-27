import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcle | 一宮の中小企業向け IT・DXパートナー",
  description: "情シス代行、データ活用、生成AI、Web制作。愛知県一宮市の中小企業に寄り添い、散らばったITを経営の力へ変えます。",
  metadataBase: new URL("https://www.arcle.net"),
  openGraph: {
    title: "会社のITが、ひとつにつながる。| Arcle",
    description: "愛知・一宮の中小企業向け IT・DXパートナー",
    type: "website",
    locale: "ja_JP",
    images: [{ url: "/og-v3.png", width: 1731, height: 909, alt: "Arcle — 会社のITが、ひとつにつながる。" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "会社のITが、ひとつにつながる。| Arcle",
    description: "愛知・一宮の中小企業向け IT・DXパートナー",
    images: ["/og-v3.png"],
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
