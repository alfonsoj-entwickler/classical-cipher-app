import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import InputCipher from "@/components/InputCipher";
import CipherTextArea from "@/components/CipherTextArea";
import PlaintTextArea from "@/components/PlaintTextArea";
import CipherRouteSync from "@/components/CipherRouteSync";
import { CIPHERS } from "@/helpers/ciphers/types";

export function generateStaticParams() {
  return CIPHERS.filter(({ implemented }) => implemented).map(({ id }) => ({
    slug: id,
  }));
}

function getCipher(slug: string) {
  return CIPHERS.find(({ id, implemented }) => id === slug && implemented);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cipher = getCipher(slug);
  if (!cipher) return {};

  const title = `${cipher.label} Encoder & Decoder — Online Tool`;
  const description = `${cipher.description} Encrypt and decrypt text online with the ${cipher.label} tool — free, instant, and works in your browser.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/cipher/${cipher.id}`,
    },
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function CipherPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cipher = getCipher(slug);
  if (!cipher) notFound();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10 lg:p-24">
      <CipherRouteSync cipherId={cipher.id} />
      <Image
        width={80}
        height={80}
        src="/classical.svg"
        alt="Classical Cipher bust illustration logo"
        className="mb-4"
      />
      <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 font-bold text-center text-[#CFB53B]">
        {cipher.label}
      </h1>
      <p className="text-gray-300 text-center max-w-xl mb-8 text-sm md:text-base">
        {cipher.description} Type in either panel and watch the
        transformation update live.
      </p>
      <div className="min-h-[65vh] w-full flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
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
    </main>
  );
}
