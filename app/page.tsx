import Image from "next/image";
import Link from "next/link";
import InputCipher from "@/components/InputCipher";
import CipherTextArea from "@/components/CipherTextArea";
import PlaintTextArea from "@/components/PlaintTextArea";
import Faq from "@/components/Faq";
import { CIPHERS } from "@/helpers/ciphers/types";
import { FAQ_ITEMS } from "@/helpers/faq";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

const faqJsonLdScript = JSON.stringify(faqJsonLd).replace(/</g, "\\u003c");

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10 lg:p-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLdScript }}
      />
      <Image
        width={80}
        height={80}
        src="/classical.svg"
        alt="Classical Cipher bust illustration logo"
        className="mb-4"
      />
      <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 font-bold text-center text-[#CFB53B]">
        Classical Cipher App
      </h1>
      <p className="text-gray-300 text-center max-w-xl mb-8 text-sm md:text-base">
        Instantly encrypt and decrypt messages with 15 classical ciphers —
        Caesar, Vigenère, Playfair, Hill, Enigma and more. Pick a cipher, type
        in either panel, and watch the transformation update live.
      </p>
      <div className="h-full md:h-[65vh] lg:h-[55vh] w-full flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
        <CipherTextArea />
        <div className="w-full sm:h-full md:w-2/3 lg:w-1/4 min-w-[15rem] my-4 lg:my-0">
          <InputCipher />
        </div>
        <PlaintTextArea />
      </div>
      <nav aria-label="Browse ciphers" className="mt-10 w-full max-w-3xl">
        <h2 className="sr-only">All ciphers</h2>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
          {CIPHERS.filter(({ implemented }) => implemented).map(
            ({ id, label }) => (
              <li key={id}>
                <Link
                  href={`/cipher/${id}`}
                  className="text-gray-300 underline decoration-dotted hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded"
                >
                  {label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
      <section
        aria-labelledby="how-it-works-heading"
        className="mt-12 w-full max-w-2xl"
      >
        <h2
          id="how-it-works-heading"
          className="text-lg font-semibold text-white text-center mb-3"
        >
          How it works
        </h2>
        <p className="text-sm text-gray-300 text-center">
          Pick a cipher from the dropdown, then type in either the plaintext or
          ciphertext panel — the other panel updates instantly using the
          algorithm and key/rotation you set. Everything runs locally in your
          browser, so nothing you type ever leaves your device.
        </p>
      </section>
      <Faq />
    </main>
  );
}
