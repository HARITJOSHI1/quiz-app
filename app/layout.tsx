import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ClientClerkProvider from "@/providers/clerk-provider";
import { inter } from "@/lib/fonts";
import { DM_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Quizzer",
  description: "Quiz app to test yout youg mind",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ClientClerkProvider>{children}</ClientClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
