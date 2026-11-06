import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcle | 一宮の中小企業向け IT・DXパートナー",
  description: "情シス代行、データ活用、生成AI、Web制作。愛知県一宮市の中小企業に寄り添い、散らばったITを経営の力へ変えます。",
  metadataBase: new URL("https://www.arcle.net"),
  openGraph: {
    title: "ばらばらの流れを、ひとつの景色へ。| Arcle",
    description: "会社のITを、育ち続けるひとつの景色へ。愛知・一宮のIT・DXパートナー",
    type: "website",
    locale: "ja_JP",
    images: [{ url: "/og-v6.png", width: 1536, height: 1024, alt: "Arcle — ばらばらの流れを、ひとつの景色へ。" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ばらばらの流れを、ひとつの景色へ。| Arcle",
    description: "会社のITを、育ち続けるひとつの景色へ。愛知・一宮のIT・DXパートナー",
    images: ["/og-v6.png"],
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
