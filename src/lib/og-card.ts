/**
 * Renders the 1200×630 social cards shown when a link is shared (see src/pages/og/[locale]/[page].png.ts).
 *
 * Build time only: Satori lays the card out with the brand font read from public/fonts, and resvg turns the result
 * into a PNG, so the card looks the same on every machine that builds it. Nothing here ships to the browser.
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { decompress } from "wawoff2";

export interface CardContent {
  /** Pill above the title, e.g. the current role. */
  eyebrow?: string;
  title: string;
  description: string;
  /** Short facts along the bottom edge. */
  facts: string[];
}

/** Hex equivalents of the dark theme tokens (src/styles/global.css) and the violet accents used across the site. */
const COLORS = {
  background: "#0a0a0a",
  foreground: "#fafafa",
  muted: "#a1a1a1",
  subtle: "#737373",
  violet300: "#c4b5fd",
  violet500: "#8b5cf6",
  violet700: "#6d28d9",
  /** Fill of the hero circles (src/styles/animation.css). */
  circle: "#4c00ff36",
};

const WIDTH = 1200;
const HEIGHT = 630;
const DOMAIN = "javiervmc.com";

/* Satori takes a React-like element tree; plain objects avoid pulling in JSX. */
type Style = Record<string, string | number>;
interface Node {
  type: string;
  props: { style?: Style; children?: Child | Child[] };
}
type Child = Node | string;

function el(style: Style, children?: Child | Child[]): Node {
  return { type: "div", props: { style: { display: "flex", ...style }, children } };
}

/** The three concentric circles of the home hero, rising from the bottom-right corner. */
function heroCircles(): Node[] {
  const size = 760;
  const center = { x: 1060, y: 640 };
  return [1, 0.76, 0.54].map((scale) =>
    el({
      position: "absolute",
      width: size * scale,
      height: size * scale,
      left: center.x - (size * scale) / 2,
      top: center.y - (size * scale) / 2,
      borderRadius: 999,
      backgroundColor: COLORS.circle,
    }),
  );
}

function tree(card: CardContent): Node {
  const header = el({ alignItems: "center", justifyContent: "space-between" }, [
    el({ fontSize: 26, fontWeight: 700, letterSpacing: 5, color: COLORS.foreground }, "JAVIER VEGA MOLINA"),
    el({ fontSize: 24, fontWeight: 500, color: COLORS.muted }, DOMAIN),
  ]);

  const eyebrow = card.eyebrow
    ? el(
        {
          alignSelf: "flex-start",
          alignItems: "center",
          gap: 12,
          padding: "8px 20px",
          borderRadius: 999,
          border: `1.5px solid ${COLORS.violet500}80`,
          backgroundColor: `${COLORS.violet500}1a`,
          color: COLORS.violet300,
          fontSize: 22,
          fontWeight: 500,
        },
        [el({ width: 10, height: 10, borderRadius: 999, backgroundColor: COLORS.violet500 }), card.eyebrow],
      )
    : null;

  const body = el({ flexDirection: "column", flexGrow: 1, justifyContent: "center" }, [
    ...(eyebrow ? [eyebrow] : []),
    el(
      {
        // Wider than the description: the title may run over the circles, the smaller text should not.
        maxWidth: 960,
        fontSize: card.title.length > 24 ? 64 : 80,
        fontWeight: 700,
        lineHeight: 1.08,
        letterSpacing: -1.5,
        color: COLORS.foreground,
        marginTop: eyebrow ? 28 : 0,
      },
      card.title,
    ),
    el(
      { display: "block", maxWidth: 800, fontSize: 30, lineHeight: 1.45, color: COLORS.muted, marginTop: 22, lineClamp: 2 },
      card.description,
    ),
  ]);

  const footer = el(
    { alignItems: "center", gap: 32, fontSize: 23, fontWeight: 500, color: COLORS.muted },
    card.facts.map((fact) =>
      el({ alignItems: "center", gap: 12 }, [
        el({ width: 9, height: 9, borderRadius: 999, backgroundColor: COLORS.violet500 }),
        fact,
      ]),
    ),
  );

  return el(
    {
      position: "relative",
      width: WIDTH,
      height: HEIGHT,
      flexDirection: "column",
      backgroundColor: COLORS.background,
      backgroundImage: `radial-gradient(circle at 0% 0%, ${COLORS.violet700}33, ${COLORS.background}00 55%)`,
      fontFamily: "Supreme",
    },
    [
      ...heroCircles(),
      el({ flexDirection: "column", flexGrow: 1, padding: "60px 72px 52px" }, [header, body, footer]),
      el({ height: 10, backgroundImage: `linear-gradient(90deg, ${COLORS.violet700}, ${COLORS.violet500}, ${COLORS.violet300})` }),
    ],
  );
}

type Weight = 400 | 500 | 700;
let fonts: Promise<{ name: string; data: Buffer; weight: Weight; style: "normal" }[]> | null = null;

/** Satori can't read WOFF2, so the brand font is converted to TTF, once per build. */
function loadFonts() {
  const files: Record<Weight, string> = { 400: "Regular", 500: "Medium", 700: "Bold" };
  fonts ??= Promise.all(
    Object.entries(files).map(async ([weight, file]) => ({
      name: "Supreme",
      weight: Number(weight) as Weight,
      style: "normal" as const,
      // The build runs from the project root.
      data: Buffer.from(
        await decompress(await readFile(join(process.cwd(), "public", "fonts", "brand", `SupremeLLTT-${file}.woff2`))),
      ),
    })),
  );
  return fonts;
}

export async function renderCard(card: CardContent): Promise<Uint8Array<ArrayBuffer>> {
  const svg = await satori(tree(card) as unknown as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts: await loadFonts(),
  });
  // Copied into a plain array: a Node Buffer is not a valid Response body type.
  return new Uint8Array(new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } }).render().asPng());
}
