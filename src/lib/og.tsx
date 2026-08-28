import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/**
 * Shared art direction for every generated social / search preview image.
 *
 * One template, one palette, so a link to any page arrives looking like the
 * same product. Colours mirror the site's default preset (minimal - dark)
 * rather than referencing CSS variables, because Satori resolves no cascade.
 *
 * Satori rules that bite: every container needs an explicit `display`, only
 * ASCII glyphs are safe without a downloaded font, and no CSS variables.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export const OG = {
  ink: "#0a0a0a",
  panel: "#161616",
  inset: "#1f1f1f",
  paper: "#ededed",
  dim: "#9a9a9a",
  accent: "#ededed",
  onAccent: "#111111",
  hairline: "#2c2c2c",
};

export interface OgCardInput {
  /** Small tracked label above the headline. */
  eyebrow: string;
  /** The headline. Kept to a few words so it never wraps past two lines. */
  title: string;
  /** One supporting sentence. */
  blurb: string;
  /**
   * Up to four short proof points rendered as a panel on the right. These
   * carry the page's substance into the preview, which is what an answer
   * engine or a link unfurl actually shows a reader.
   */
  points: string[];
}

/**
 * Render a page preview card. Used by every route's `opengraph-image`, so a
 * shared link is specific to the page rather than a generic site banner.
 */
export function renderOgCard({ eyebrow, title, blurb, points }: OgCardInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: OG.ink,
          color: OG.paper,
          fontFamily: "sans-serif",
          padding: "62px 72px",
          justifyContent: "space-between",
        }}
      >
        {/* Brand row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 7,
              flexShrink: 0,
              background: `repeating-linear-gradient(135deg, ${OG.accent} 0 7px, ${OG.ink} 7px 14px)`,
            }}
          />
          <div
            style={{
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: -0.8,
              color: OG.paper,
            }}
          >
            Grooma
          </div>
          <div style={{ fontSize: 21, color: OG.dim, marginLeft: 6 }}>
            {site.brand.statement}
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 56,
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: OG.accent,
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 62,
                fontWeight: 900,
                letterSpacing: -2,
                lineHeight: 1.06,
                marginTop: 18,
                color: OG.paper,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                lineHeight: 1.45,
                marginTop: 20,
                color: OG.dim,
                maxWidth: 620,
              }}
            >
              {blurb}
            </div>
          </div>

          {points.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                width: 380,
                flexShrink: 0,
                background: OG.panel,
                border: `1px solid ${OG.hairline}`,
                borderRadius: 20,
                padding: 24,
              }}
            >
              {points.slice(0, 4).map((p) => (
                <div
                  key={p}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 19,
                    color: OG.paper,
                  }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 4,
                      flexShrink: 0,
                      background: OG.accent,
                    }}
                  />
                  {p}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${OG.hairline}`,
            paddingTop: 22,
            fontSize: 20,
            color: OG.dim,
          }}
        >
          <div style={{ display: "flex" }}>{site.brand.domain}</div>
          <div style={{ display: "flex" }}>
            Guest booking, no account &middot; English &amp; Nepali
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
