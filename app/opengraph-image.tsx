import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "JUNK FREE — Junk Removal & Waste Management in Greater Vancouver";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "linear-gradient(135deg, #0e3d27 0%, #228B5A 100%)",
          padding: 80,
          color: "#fff",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 88, fontWeight: 900, letterSpacing: -2 }}>
          JUNK<span style={{ color: "#F2B33D", marginLeft: 18 }}>FREE</span>
        </div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 24, opacity: 0.95 }}>
          Junk Removal &amp; Waste Management
        </div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 12, opacity: 0.8 }}>
          Greater Vancouver · Same/next-day · Eco-friendly
        </div>
      </div>
    ),
    size
  );
}
