import type { Metadata } from "next";
import DockNav from "@/components/DockNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "bleu — Creative Studio Munich",
  description:
    "bleu is a creative studio based in Munich. We refine and build brand worlds — visual, digital, conceptual.",
  openGraph: {
    title: "bleu — Creative Studio Munich",
    description:
      "We refine and build brand worlds — visual, digital, conceptual.",
    siteName: "bleu",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/omd6fiz.css" />
      </head>
      <body className="min-h-full bg-black text-off-white antialiased">
        {children}
        <DockNav />
      </body>
    </html>
  );
}
