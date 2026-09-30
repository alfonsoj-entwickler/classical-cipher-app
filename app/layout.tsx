import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import ClassicalProvider from "@/context/ClassicalProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SITE_URL } from "@/helpers/site";
import { CIPHERS } from "@/helpers/ciphers/types";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

const isProductionDeployment = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

const TITLE = "Classical Cipher App — 15 Ciphers, Encrypt & Decrypt Online";
const DESCRIPTION =
  "Free online classical cipher tool. Encrypt and decrypt text with Caesar, Vigenère, Playfair, Hill, Enigma, ADFGVX, Rail Fence and 8 more ciphers.";

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Classical Cipher App",
  },
  description: DESCRIPTION,
  authors: [
    {
      name: "alfonsojentwickler",
      url: "https://github.com/alfonsoj-entwickler",
    },
  ],
  creator: "alfonsojentwickler",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Classical Cipher App",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: isProductionDeployment,
    follow: isProductionDeployment,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Classical Cipher App",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript",
  inLanguage: "en",
  description: DESCRIPTION,
  featureList: CIPHERS.map(({ label }) => label),
  author: {
    "@type": "Person",
    name: "alfonsojentwickler",
    url: "https://github.com/alfonsoj-entwickler",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const jsonLdScript = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript }}
        />
      </head>
      <body className={`bg-special ${roboto.className}`}>
        <ClassicalProvider>
          <header className="absolute top-4 right-4 z-10">
            <a
              className="p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              href="https://github.com/alfonsoj-entwickler/classical-cipher-app"
              aria-label="GitHub repository of Classical Cipher App"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                data-view-component="true"
                viewBox="0 0 16 16"
                className="w-10 h-10"
              >
                <path
                  d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </header>
          {children}
          <div aria-hidden="true">
            <ToastContainer
              autoClose={8000}
              pauseOnFocusLoss
              pauseOnHover
            />
          </div>
        </ClassicalProvider>
      </body>
    </html>
  );
}
