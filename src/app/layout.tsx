import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import ThemeProvider from "@/components/providers/ThemeProvider";
import ToastContainer from "@/components/common/ToastContainer";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import ScrollToTop from "@/components/common/ScrollToTop";
import ScrollProgress from "@/components/common/ScrollProgress";

export const metadata: Metadata = {
  title: "Help Study Abroad - Admin Dashboard",
  description: "Professional admin dashboard for managing users and products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ScrollProgress />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <ThemeProvider>
          <ErrorBoundary>
            {children}
            <ToastContainer />
            <ScrollToTop />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}