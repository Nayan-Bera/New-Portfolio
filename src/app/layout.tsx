import "./globals.css";
import type { PropsWithChildren } from "react";

export const metadata = {
  title: "Nayan Bera — Portfolio",
  description: "Nayan Bera's portfolio",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
