import "./globals.css";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

export const metadata = {
  title: "Nayan Bera — Portfolio",
  description: "Nayan Bera's portfolio",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
