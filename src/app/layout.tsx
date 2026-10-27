import type { Metadata } from "next";
import { Google_Sans, Raleway } from "next/font/google";
import Header from "@/components/Header";
import { SupportProvider } from "@/components/dashboard/Support";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

// Google Sans over Open Sans: its latin file is smaller (~36 KB vs ~43 KB).
const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  // Next.js has no metric overrides for Google Sans, so name the fallback explicitly.
  adjustFontFallback: false,
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Member Dashboard | Smile Access Club",
  description: "Your Smile Access Club membership, practice, payments and perks in one place.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${raleway.variable} ${googleSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SupportProvider>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
        </SupportProvider>
      </body>
    </html>
  );
}
