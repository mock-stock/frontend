import type { Metadata } from "next";

import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "mock-stock",
  description: "mock-stock",
};
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
