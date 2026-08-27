import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { DEMO_SERVICES } from "@/lib/demo-data";

export const alt = "Grooma: barbershop booking & shop management software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0b0a09";
const PAPER = "#f2ede4";
const DIM = "#9a9188";
const COPPER = "#c8813f";
const COPPER_ON = "#14100c";
const HAIR = "#2a2520";

const fp = (color: string) => ({ fontSize: 40, fontWeight: 900, letterSpacing: -1, color });

/**
 * OG / social image. Reads as the product itself: a real booking surface
 * (services, time slots) beside a confirmed booking. Satori-safe markup
 * (explicit flex, ASCII glyphs, no dynamic font download).
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          background: INK,
          color: PAPER,
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* warm floor vignette */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background: "radial-gradient(120% 100% at 50% 0%, #17130f 0%, #0b0a09 60%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            padding: "64px 72px",
            position: "relative",
            gap: 48,
          }}
        >
          {/* Left gutter: brand + booking surface */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
              minWidth: 0,
            }}
          >
            {/* brand row */}
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  flexShrink: 0,
                  background: "repeating-linear-gradient(135deg, #c8813f 0 8px, #14100c 8px 16px)",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: -1, color: PAPER }}>Grooma</div>
                <div style={{ fontSize: 20, color: DIM }}>{site.brand.statement}</div>
              </div>
            </div>

            {/* mini booking surface */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 40,
                background: "#14110d",
                border: `1px solid ${HAIR}`,
                borderRadius: 22,
                padding: 26,
                gap: 18,
                width: 620,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 10 }}>
                {DEMO_SERVICES.slice(0, 3).map((s) => (
                  <div
                    key={s.name}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "12px 14px",
                      borderRadius: 12,
                      border: `1px solid ${s.name === "Haircut" ? COPPER : HAIR}`,
                      background: s.name === "Haircut" ? "#201810" : "transparent",
                    }}
                  >
                    <span style={{ fontSize: 19, color: PAPER, flex: 1 }}>{s.name}</span>
                    <span style={{ fontSize: 16, color: DIM }}>{s.enDuration}</span>
                    <span style={{ fontSize: 17, color: COPPER, fontWeight: 700, marginLeft: 10 }}>NPR {s.priceNpr}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 190, flexShrink: 0 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: PAPER, padding: "12px 0" }}>Choose a time</div>
                {["10:30", "11:00", "11:30", "12:00"].map((t, i) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px 12px",
                      borderRadius: 10,
                      background: i === 2 ? COPPER : "transparent",
                      color: i === 2 ? COPPER_ON : DIM,
                      border: `1px solid ${i === 2 ? COPPER : HAIR}`,
                      fontSize: 18,
                      fontWeight: i === 2 ? 700 : 500,
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* pill */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 12,
                marginTop: 24,
                fontSize: 17,
                color: DIM,
                alignSelf: "flex-start",
                border: `1px solid ${HAIR}`,
                borderRadius: 999,
                padding: "8px 16px",
              }}
            >
              Availability is computed, not promised
            </div>
          </div>

          {/* Right: confirmed booking */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minWidth: 340,
              maxWidth: 380,
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10, color: COPPER }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  border: `3px solid ${COPPER}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                  color: COPPER,
                }}
              >
                OK
              </div>
              <span style={{ fontSize: 19, fontWeight: 700 }}>Confirmed</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: -0.5, marginTop: 18, color: PAPER }}>
              Haircut + Beard
            </div>
            <div style={{ fontSize: 20, color: DIM, marginTop: 4 }}>11:30, Bikash</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 34,
                borderTop: `1px solid ${HAIR}`,
                paddingTop: 26,
                fontSize: 20,
                color: DIM,
                lineHeight: 1.5,
              }}
            >
              Guest booking, no account.
              <span style={{ color: PAPER, marginTop: 6 }}>Your shop stays the brand.</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
