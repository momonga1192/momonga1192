import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcle | 一宮の中小企業向け IT・DXパートナー",
  description: "情シス代行、データ活用、生成AI、Web制作。愛知県一宮市の中小企業に寄り添い、散らばったITを経営の力へ変えます。",
  metadataBase: new URL("https://www.arcle.net"),
  openGraph: {
    title: "見えない仕組みを、動く力へ。| Arcle",
    description: "情シス、データ、生成AI、Web。会社の中に散らばる仕組みを、使えるかたちへ組み直します。",
    type: "website",
    locale: "ja_JP",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Arcle — 見えない仕組みを、動く力へ。" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "見えない仕組みを、動く力へ。| Arcle",
    description: "情シス、データ、生成AI、Web。会社の中に散らばる仕組みを、使えるかたちへ組み直します。",
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
