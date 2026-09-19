import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portfolio — Ashok Meena | Senior 3D Designer & Photo Editor",
  description:
    "Official Portfolio of Ashok Meena — Senior 3D Designer & Photo Editor specializing in Blender 3D, CLO 3D apparel, real-time GLB assets, and high-end photo retouching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-white text-black antialiased`}>
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}