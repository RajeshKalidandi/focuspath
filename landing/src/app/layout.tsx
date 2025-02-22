import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://app.rajeshkalidandi.online"),
  title: {
    default: "FocusPath - Break Free from Addiction & Improve Focus",
    template: "%s | FocusPath"
  },
  description: "Transform your life with FocusPath - The #1 app for overcoming addiction, improving focus, and achieving personal growth. Free, private, and effective.",
  keywords: [
    "stop masturbation addiction",
    "NoFap app",
    "addiction recovery app",
    "self improvement app",
    "focus improvement app",
    "overcome masturbation addiction",
    "porn addiction recovery",
    "self improvement tracking",
    "addiction recovery progress",
    "focus and productivity improvement"
  ],
  authors: [{ name: "FocusPath Team" }],
  creator: "FocusPath",
  publisher: "FocusPath",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "FocusPath - Break Free from Addiction & Improve Focus",
    description: "Transform your life with FocusPath - The #1 app for overcoming addiction, improving focus, and achieving personal growth. Free, private, and effective.",
    url: "https://app.rajeshkalidandi.online",
    siteName: "FocusPath",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FocusPath - Break Free from Addiction & Improve Focus",
    description: "Transform your life with FocusPath - The #1 app for overcoming addiction, improving focus, and achieving personal growth.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              "name": "FocusPath",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Transform your life with FocusPath - The #1 app for overcoming addiction, improving focus, and achieving personal growth.",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1000"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
