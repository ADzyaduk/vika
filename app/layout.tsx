import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/components/site/booking";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Волновой чекап — Виктория Сняткова",
  description:
    "Глубокая диагностика внутреннего состояния. Помогаю увидеть скрытые причины эмоционального истощения и повторяющихся жизненных сценариев.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.ReactElement {
  return (
    <html lang="ru" className={`${sans.variable} ${serif.variable} antialiased`}>
      <body className="min-h-screen">
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  );
}
