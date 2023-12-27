import "./globals.css";
import { GeistSans } from "geist/font";
import { PHProvider, PostHogPageview } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import AuthProvider from "@/app/components/AuthProvider";
import Error from "@/app/components/Error";
import Navbar from "@/app/components/Navbar";
import { Suspense } from "react";

export const metadata = {
  title: "SoundXLR",
  description: "Generate and share soundboards with ease",
  icons: {
    favicon: "/favicon.ico",
    appleTouchIcon: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-full h-full bg-background">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <body
          className={
            GeistSans.className + " w-full h-full flex-col bg-background"
          }
        >
          <ErrorBoundary fallback={<Error />}>
            <Navbar />
            <div className="w-full h-full pt-12">
              <AuthProvider>{children}</AuthProvider>
            </div>
            <Toaster />
          </ErrorBoundary>
        </body>
      </PHProvider>
    </html>
  );
}
