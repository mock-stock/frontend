import { Toaster } from "react-hot-toast";

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
      <body>
        {children}
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            duration: 1000,
            style: {
              backgroundColor: "rgba(45, 52, 56, 0.7)",
              color: "white",
              borderRadius: "5px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            },
          }}
        />
      </body>
    </html>
  );
}
