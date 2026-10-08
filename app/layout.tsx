import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Animations from "@/components/Animations";
import "./globals.css";

const aconchego = localFont({
  src: [
    { path: "./fonts/Aconchego-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Aconchego-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Aconchego-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Aconchego-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Aconchego-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Aconchego-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-aconchego",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fretadao.com.br"),
  title: "Fretadão: Fretados em todo o Brasil",
  description:
    "Experiência que transforma a mobilidade corporativa. Fretamento corporativo, fretamento compartilhado, vale-transporte, transporte individual e gestão de mobilidade.",
  openGraph: {
    title: "Fretadão: Fretados em todo o Brasil",
    description: "Experiência que transforma a mobilidade corporativa.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#00154d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${aconchego.variable} is-loading`} suppressHydrationWarning>
      <body>
        <noscript>
          <style>{`.preloader{display:none!important}html.is-loading,html.is-loading body{overflow:auto!important}`}</style>
        </noscript>
        <Preloader />
        <SmoothScroll />
        <Animations />
        {children}
      </body>
    </html>
  );
}
