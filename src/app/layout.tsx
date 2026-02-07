import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Aurora from "@/components/reactbits/Aurora";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ambady A | Full-Stack Developer",
  description: "Portfolio of Ambady A, a Full-Stack Developer specializing in Python, Next.js, and React.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/30 selection:text-white`}
        suppressHydrationWarning
      >
        <div className="fixed inset-0 -z-50 pointer-events-none">
          <Aurora
            speed={0.5}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
