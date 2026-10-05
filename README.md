<div align="center">
  <img src="public/classical.svg" alt="Classical Cipher Logo" width="80" height="80" />
  <h1>Classical Cipher Toolkit</h1>
  <p><strong>An interactive, real-time playground for exploring 15 classical ciphers — from the Caesar shift to the WWII Enigma machine.</strong></p>

  <p>
    <a href="https://classical-cipher-app-sigma.vercel.app/" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/Live%20Demo-Visit%20App-CFB53B?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
    </a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js%2016-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React%2018-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="Prettier" />
  </p>
</div>

---

## 📖 Overview

**Classical Cipher Toolkit** is an educational, web-based application for learning and experimenting with classical (pre-computer) cryptography. It started as a single Caesar-shift demo and has grown into a full suite covering substitution, polyalphabetic, transposition, fractionation, and electromechanical ciphers.

The UI is a dual-panel workbench: type plaintext on one side and its ciphertext appears on the other in real time, or paste ciphertext and watch it decrypt instantly. Switching the cipher type, key, or parameters immediately re-derives both panels, so you can see exactly how each algorithm reacts to its inputs — no "encrypt" button, no page reload.

This is a learning tool, **not** a security product — see [Security Notice](#-security-notice).

---

## ✨ Features

- **⚡ Real-time bidirectional transformation** — encrypt/decrypt as you type, in either panel, for every supported cipher.
- **🔐 15 classical ciphers**, each with its own dedicated parameter controls (keys, matrices, rotor positions, rail counts, etc.) — see the [full cipher reference](#-cipher-reference) below.
- **📋 Clipboard integration** — one-click copy/paste for both plaintext and ciphertext fields, with toast feedback (React Toastify).
- **♿ Accessibility-first** — every interactive control has an `aria-label`/`htmlFor`, cipher output changes are announced through an `aria-live="polite"` region, and focus-visible rings replace removed outlines.
- **🛡️ Input safety** — a shared character cap (`MAX_TEXT`, 600 characters) and per-cipher key-length limits guard every text field and key input.
- **🔗 Dedicated cipher routes** — every implemented cipher also has its own `/cipher/[slug]` page (e.g. `/cipher/vigenere`) with cipher-specific metadata, sharing the same `ClassicalProvider` state via `CipherRouteSync`.
- **🔍 SEO-ready** — Open Graph, Twitter Card, and JSON-LD `WebApplication`/`FAQPage` structured data, a dynamic sitemap covering the homepage and every cipher route, generated favicons/app icons/OG image, and `robots.txt`.
- **🔒 Hardened HTTP headers** — HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` applied to every route.
- **📱 Responsive design** — a dark-themed, mobile-first layout built with Tailwind CSS.

---

## 🔐 Cipher Reference

All algorithms live in [`helpers/ciphers/`](helpers/ciphers) as pure, dependency-free functions (one `encrypt*`/`decrypt*` pair per cipher). `context/ClassicalProvider.tsx` dispatches to the selected cipher based on the `<select>` in [`components/InputCipher.tsx`](components/InputCipher.tsx), and each cipher's parameter inputs live under [`components/cipher-params/`](components/cipher-params).

Every example below encrypts the same plaintext, **`HELLO WORLD`**, with each cipher's default key/parameters (as shipped in `ClassicalProvider.tsx`), so you can compare how differently each algorithm scrambles identical input. Outputs were generated directly from the code in this repo.

### Monoalphabetic substitution

#### Caesar

Shifts every printable extended‑ASCII character (codes 32–255) by a fixed rotation, modulo 223. Spaces pass through unshifted.

$$E_k(x) = (x + k) \bmod M \qquad D_k(x) = (x - k) \bmod M$$

Where `x` is a character's numeric code, `k` is the shift key, and `M = 223` is the size of the supported printable extended-ASCII range (codes 32–255).

```
Key:        rotation = 3
Plaintext:  HELLO WORLD
Ciphertext: KHOOR ZRUOG
```

#### Atbash

Mirrors each letter within its own alphabet — `A↔Z`, `B↔Y`, … No key; self-inverse, so the same function encrypts and decrypts. Non-letters pass through unchanged.

```
Key:        none
Plaintext:  HELLO WORLD
Ciphertext: SVOOL DLIOW
```

#### Affine

Classic linear cipher `E(x) = (a·x + b) mod 26`; decryption multiplies by the modular inverse of `a`. The multiplier `a` must be coprime with 26. Operates on A–Z (case preserved), everything else passes through.

```
Key:        a = 5, b = 8
Plaintext:  HELLO WORLD
Ciphertext: RCLLA OAPLX
```

#### Polybius Square

Places A–Z (I/J merged) into a 5×5 grid keyed by the keyword, then encodes each letter as its `row,col` digit pair (`1`–`5`). Output is digits only — spacing/casing/punctuation don't survive the round trip.

```
Key:        keyword = CIPHER
Plaintext:  HELLO WORLD
Ciphertext: 14153333415241213324
```

### Polyalphabetic substitution

#### Vigenère

Repeats the keyword over the plaintext; each letter's shift equals the corresponding key letter's alphabet position (`A=0`). `E(x) = (x + k) mod 26` per position, key wraps and repeats.

```
Key:        keyword = LEMON
Plaintext:  HELLO WORLD
Ciphertext: SIXZB HSDZQ
```

#### Autokey

Like Vigenère, but once the seed is exhausted the keystream is extended with the plaintext itself (`K[i] = seed[i]` while available, else `plaintext[i - seed.length]`) — removes Vigenère's periodicity weakness.

```
Key:        seed = KEY
Plaintext:  HELLO WORLD
Ciphertext: RIJSS HZFHR
```

#### Alberti Cipher Disk

Simulates Alberti's 15th-century cipher disk: a keyed "inner disk" alphabet is rotated one notch every `period` letters against the fixed outer alphabet — the earliest known polyalphabetic mechanism.

```
Key:        disk keyword = ALBERTI, period = 4
Plaintext:  HELLO WORLD
Ciphertext: CRHHN XNQKT
```

#### Enigma Machine

Faithful simulation of the WWII Enigma I: historical rotor wirings I–III with turnover notches, the double-step anomaly, reflector B, and a configurable plugboard. Reciprocal — the same settings both encrypt and decrypt. Only letters advance the rotors.

```
Key:        rotor positions = AAA, plugboard = (none)
Plaintext:  HELLO WORLD
Ciphertext: ILBDA AMTAZ
```

### Digraph / block substitution

#### Playfair

Builds a 5×5 key square (I/J merged), then encrypts letters in pairs (digraphs) using the row/column/rectangle rules. Repeated or trailing odd letters are padded with `X`; only A–Z round-trips.

```
Key:        keyword = PLAYFAIR
Plaintext:  HELLO WORLD
Ciphertext: KGYVRVVQGRCZ
```

#### Hill Cipher

Encrypts letter pairs as vectors multiplied by a 2×2 key matrix mod 26: `[y1,y2] = M·[x1,x2] mod 26`. Requires `det(M)` to be coprime with 26 to be invertible for decryption.

```
Key:        matrix = [3 3; 2 5]
Plaintext:  HELLO WORLD
Ciphertext: HIOZEIPJQL
```

### Transposition

#### Rail Fence

Writes the text in a zigzag across N rows, then reads each row left to right. A pure rearrangement — every character, including spaces and casing, survives unchanged.

```
Key:        rails = 3
Plaintext:  HELLO WORLD
Ciphertext: HOREL OLLWD
```

#### Scytale

Simulates wrapping a strip around a rod of the given width: writes column-major, reads row-major. Pure rearrangement, fully reversible for any text.

```
Key:        rod diameter = 4
Plaintext:  HELLO WORLD
Ciphertext: HORE LLWDLO
```

#### Columnar Transposition

Writes text row by row under the keyword's letters, then reads columns out in the keyword's alphabetical order. Irregular (no padding) — every character round-trips exactly.

```
Key:        keyword = CIPHER
Plaintext:  HELLO WORLD
Ciphertext: HWODLLEOLR␣   (trailing space preserved)
```

### Fractionation & one-time pad

#### ADFGVX

The WWI German field cipher: a 6×6 Polybius-style grid (A–Z + 0–9) addressed by the letters A/D/F/G/V/X fractionates each character into a pair of labels, then a columnar transposition scrambles the label stream.

```
Key:        grid keyword = (none), transposition keyword = GERMAN
Plaintext:  HELLO WORLD
Ciphertext: DGDDXFGDDFAVFXXVXAFF
```

#### One-Time Pad (Vernam)

Adds the pad's character codes to the plaintext's, modulo 223 (same extended-ASCII range as Caesar), cycling the pad if it's shorter than the message. Only unconditionally secure when the pad is truly random, at least as long as the message, and never reused — the UI does not enforce this.

```
Key:        pad = SECRETPAD
Plaintext:  HELLO WORLD
Ciphertext: {jo~t spw    (non-printable/control bytes may appear — this is expected)
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[Next.js 16](https://nextjs.org/)** | App Router framework for rendering, bundling, and route-level metadata (sitemap, robots, security headers) |
| **[React 18](https://react.dev/)** | Component UI, driven by a single React Context (`ClassicalProvider`) as the source of truth for all cipher state |
| **[TypeScript](https://www.typescriptlang.org/)** | Type safety across cipher algorithms, context, and components |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first styling for the dark, responsive UI |
| **[React Toastify](https://fkhadra.github.io/react-toastify/)** | Toast feedback for clipboard copy/paste actions |
| **[React Tooltip](https://react-tooltip.com/)** | Accessible tooltips for control cues |

---

## 📁 Project Structure

```text
classical-cipher-app/
├── app/
│   ├── cipher/[slug]/page.tsx   # Per-cipher route (e.g. /cipher/vigenere), own metadata + canonical
│   ├── favicon.ico
│   ├── icon.tsx                 # Generated favicon
│   ├── apple-icon.tsx           # Generated Apple touch icon
│   ├── opengraph-image.tsx      # Generated OG image
│   ├── manifest.ts              # Web app manifest
│   ├── globals.css              # Global styling and Tailwind directives
│   ├── layout.tsx               # Root layout, ClassicalProvider, and SEO metadata
│   ├── page.tsx                 # Main landing page assembling cipher components
│   ├── robots.ts                # Generated robots.txt (uses SITE_URL)
│   └── sitemap.ts               # Generated sitemap.xml (homepage + every implemented cipher route)
├── components/
│   ├── CipherRouteSync.tsx      # Syncs the shared ClassicalProvider to the active /cipher/[slug] route
│   ├── CipherTextArea.tsx       # Ciphertext input/output panel with action buttons
│   ├── Faq.tsx                  # FAQ section (backs the homepage FAQPage JSON-LD)
│   ├── InputCipher.tsx          # Cipher-type <select> + dynamic params UI
│   ├── PlaintTextArea.tsx       # Plaintext input/output panel with action buttons
│   └── cipher-params/           # One params component per cipher (keys, matrices, rotors...)
├── context/
│   └── ClassicalProvider.tsx       # Sole source of truth: cipher state, dispatch, clipboard, a11y announcer
├── helpers/
│   ├── index.tsx                # Shared constants (MAX_TEXT)
│   ├── faq.ts                   # FAQ content
│   ├── site.ts                  # Resolves SITE_URL for metadata/canonical/OG/sitemap
│   └── ciphers/                 # Pure encrypt/decrypt implementations, one file per cipher + shared types
├── hooks/
│   └── useClassical.tsx         # useContext(CeaserContext) wrapper — the only way components read/write state
├── .agents/skills/               # SEO, accessibility, and security agent personas (see AGENTS.md)
└── public/
    └── classical.svg            # Application logo asset
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: version pinned in [`.nvmrc`](.nvmrc) (use `nvm use`)
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/alfonsoj-entwickler/classical-cipher-app.git
   cd classical-cipher-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables (optional):**

   ```bash
   cp .env.example .env.local
   ```

   - `APP_URL`: Base URL used for canonical URLs, Open Graph, sitemap, and robots.txt. Resolution order: `APP_URL` → `NEXT_PUBLIC_SITE_URL` → `VERCEL_URL` (set automatically on Vercel) → hardcoded production fallback.

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open in browser:** [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `next dev` | Launches the local development server |
| `npm run build` | `next build` | Compiles the production build |
| `npm run start` | `next start` | Runs the compiled production server |
| `npm run lint` | `eslint .` | Runs ESLint across the project |

> There is no automated test suite configured in this project.

---

## ⚠️ Security Notice

This project is built for **education and demonstration purposes**. Every cipher implemented here is a **classical (pre-1950s) cipher** — including the historically significant but cryptographically broken Enigma machine — and none of them are safe for protecting real secrets:

- Substitution and polyalphabetic ciphers (Caesar, Atbash, Affine, Vigenère, Autokey, Alberti, Playfair, Hill, Enigma) are all breakable with frequency analysis or known-plaintext attacks using modern computing.
- Transposition and fractionation ciphers (Rail Fence, Scytale, Columnar, ADFGVX) only rearrange characters and offer no real confidentiality on their own.
- The **One-Time Pad** implementation is only information-theoretically secure under the classical OTP conditions (truly random key, at least as long as the message, never reused) — this app does not enforce any of those conditions.

For real-world confidentiality, use vetted modern cryptography (e.g. AES-GCM, ChaCha20-Poly1305) through an audited library, never a classical cipher.

---

## 🌐 Deployment

The application is deployed on [Vercel](https://vercel.com/):
🔗 **[Live Preview](https://classical-cipher-app-sigma.vercel.app/)**

---

## 📄 License

This project was developed for didactic and educational purposes. Feel free to use, modify, and distribute it.
