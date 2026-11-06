import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcle | 一宮の中小企業向け IT・DXパートナー",
  description: "情シス代行、データ活用、生成AI、Web制作。愛知県一宮市の中小企業に寄り添い、バラバラなITを経営の力へ変えます。",
  metadataBase: new URL("https://www.arcle.net"),
  openGraph: {
    title: "バラバラなITを、経営の力に。| Arcle",
    description: "一宮の中小企業向け IT・DXパートナー",
    type: "website",
    locale: "ja_JP",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Arcle — バラバラなITを、経営の力に。" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "バラバラなITを、経営の力に。| Arcle",
    description: "一宮の中小企業向け IT・DXパートナー",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
