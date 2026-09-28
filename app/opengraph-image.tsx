import { ImageResponse } from "next/og";

export const alt = "Classical Cipher App — encrypt and decrypt with 15 classical ciphers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to right, rgb(15,23,42), rgb(6,50,36))",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#CFB53B",
            textAlign: "center",
          }}
        >
          Classical Cipher App
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "#FFFFFF",
            textAlign: "center",
          }}
        >
          Encrypt &amp; decrypt with 15 classical ciphers
        </div>
      </div>
    ),
    { ...size },
  );
}
