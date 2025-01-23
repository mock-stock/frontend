import type { Metadata } from "next";
import type { Viewport } from "next";

import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "mock-stock",
  description: "mock-stock",
};
interface RootLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
