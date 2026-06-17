/**
 * HTW Berlin – Corporate Design / Slide Template
 * ------------------------------------------------
 * Selbstständige React-Komponenten, die das offizielle HTW-Berlin-Folienlayout
 * 1:1 abbilden. Alle Farben, Schriftgrößen und das Logo stammen direkt aus dem
 * PowerPoint-Folienmaster (siehe design-system.json).
 *
 * Verwendung in Claude Design:
 *   <Deck>
 *     <TitleSlide title="Innovativ und vielfältig." subtitle="HTW Berlin" presenter="Max Mustermann · 17.06.2026" />
 *     <SectionDivider number={1} title="Titel des Kapitels" />
 *     <AgendaSlide items={["Einführung","Methodik","Ergebnisse","Fazit"]} active={1} />
 *     <ContentSlide title="Ergebnisse" footer="Max Mustermann | Ergebnisse">...</ContentSlide>
 *     <ClosingSlide presenter="Max Mustermann" url="www.htw-berlin.de" />
 *   </Deck>
 *
 * Jede Folie ist eine 16:9-Bühne (1280×720, via CSS skaliert).
 */

import React from "react";

/* ============================================================= *
 * 1) DESIGN TOKENS  (exakt aus dem Folienmaster)
 * ============================================================= */
export const HTW = {
  color: {
    green: "#76B900",      // Primär / Marke (accent1)
    green600: "#588B00",
    green800: "#355300",
    green900: "#243800",
    greenTint: "#E3F1CC",  // helle Grünfläche (lt2)
    blue: "#0082D1",
    orange: "#FF5F00",
    orangeSoft: "#F26B43",
    ink: "#000000",
    dark2: "#404040",
    muted: "#646464",      // Fußzeile / Seitenzahl
    grey: "#787878",
    placeholder: "#EDEDED",// "Inhaltsbereich"-Box
    white: "#FFFFFF",
  },
  font: {
    family: "'HTWBerlin Office', 'HTWBerlin', Arial, 'Helvetica Neue', Helvetica, sans-serif",
    // Skala in px (pt × 1.333), wie im Master
    title: 40, h2: 27, subhead: 24, lead: 21, body: 19, bodySmall: 18,
    caption: 16, small: 13, micro: 12,
  },
  space: {
    padX: 56, padY: 44, blockGap: 24, columnGap: 28, footerH: 36,
  },
  canvas: { w: 1280, h: 720 },
} as const;

/* ============================================================= *
 * 2) LOGO  (htw-Wortmarke, vektorisiert aus image1.emf)
 * ============================================================= */
export function HtwWordmark({ width = 70, color = HTW.color.green, style }:
  { width?: number; color?: string; style?: React.CSSProperties }) {
  const ratio = 5846 / 19000; // viewBox-Verhältnis
  return (
    <svg
      viewBox="1000 11927 19000 5846"
      width={width}
      height={width * ratio}
      role="img"
      aria-label="htw"
      style={{ display: "block", color, ...style }}
      fill="currentColor"
    >
      <path d="M 17077,13389 L 18537,13389 18537,16312 17077,16312 17077,13389 Z" />
      <path d="M 19999,16312 L 19999,17772 18537,17772 18537,16312 19999,16312 Z" />
      <path d="M 6846,11927 C 8307,11927 8307,11927 8307,11927 8307,13389 8307,13389 8307,13389 9769,13389 9769,13389 9769,13389 9769,14850 9769,14850 9769,14850 8307,14850 8307,14850 8307,14850 8307,16312 8307,16312 8307,16312 9769,16312 9769,16312 9769,16312 9769,17772 9769,17772 9769,17772 8307,17772 8307,17772 8307,17772 7500,17772 6846,17118 6846,16312 6851,16312 6846,11927 6846,11927 Z" />
      <path d="M 11230,13389 C 12692,13389 12692,13389 12692,13389 12692,16312 12692,16312 12692,16312 14153,16312 14153,16312 14153,16312 14153,13389 14153,13389 14153,13389 15615,13389 15615,13389 15615,13389 15615,16312 15615,16312 15615,16312 17077,16312 17077,16312 17077,16312 17077,17772 17077,17772 17077,17772 12692,17772 12692,17772 12692,17772 11885,17772 11230,17118 11230,16312 11230,13389 11230,13389 11230,13389 Z" />
      <path d="M 2462,14850 L 2462,17772 1000,17772 1000,14850 2462,14850 Z" />
      <path d="M 2462,11927 L 2462,13389 1000,13389 1000,11927 2462,11927 Z" />
      <path d="M 2461,13389 C 3922,13389 3922,13389 3922,13389 4730,13389 5384,14043 5384,14850 5384,17772 5384,17772 5384,17772 3923,17772 3923,17772 3923,17772 3923,14850 3923,14850 3923,14850 2462,14850 2462,14850 2462,14850 2461,13389 2461,13389 2461,13389 Z" />
    </svg>
  );
}

/** Vollständiges Logo-Lockup: Wortmarke + Hochschulname + Tagline. */
export function HtwLockup({ width = 150, onDark = false }: { width?: number; onDark?: boolean }) {
  const nameColor = onDark ? HTW.color.white : HTW.color.ink;
  const markColor = onDark ? HTW.color.white : HTW.color.green;
  return (
    <div style={{ width, fontFamily: HTW.font.family, lineHeight: 1.15 }}>
      <HtwWordmark width={width * 0.62} color={markColor} />
      <div style={{ marginTop: 8, fontSize: width * 0.075, fontWeight: 700, color: nameColor }}>
        Hochschule für Technik<br />und Wirtschaft Berlin
      </div>
      <div style={{ marginTop: 4, fontSize: width * 0.066, fontWeight: 700, color: onDark ? HTW.color.white : HTW.color.green }}>
        University of Applied Sciences
      </div>
    </div>
  );
}

/* ============================================================= *
 * 3) BÜHNE + FUSSZEILE
 * ============================================================= */
export function Slide({ children, bg = HTW.color.white, pad = true }:
  { children: React.ReactNode; bg?: string; pad?: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        width: HTW.canvas.w,
        height: HTW.canvas.h,
        background: bg,
        fontFamily: HTW.font.family,
        color: HTW.color.ink,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,.12)",
        boxSizing: "border-box",
        padding: pad ? `${HTW.space.padY}px ${HTW.space.padX}px` : 0,
      }}
    >
      {children}
    </div>
  );
}

/** Standard-Fußzeile: Seitenzahl links, Referent/Titel mittig, Wortmarke rechts. */
export function Footer({ text, page }: { text?: string; page?: number }) {
  return (
    <div style={{
      position: "absolute", left: HTW.space.padX, right: HTW.space.padX, bottom: 20,
      display: "flex", alignItems: "flex-end", justifyContent: "space-between",
      color: HTW.color.muted, fontSize: HTW.font.caption,
    }}>
      <span style={{ fontSize: HTW.font.micro, minWidth: 24 }}>{page ?? ""}</span>
      <span style={{ flex: 1, textAlign: "center" }}>{text ?? "Referent_in ergänzen bitte | Folientitel in Kurzform"}</span>
      <HtwWordmark width={64} color={HTW.color.green} />
    </div>
  );
}

/* ============================================================= *
 * 4) LAYOUTS
 * ============================================================= */

/** Titelfolie mit Foto oben (Standard-Eröffnung). */
export function TitleSlide({ title, subtitle = "HTW Berlin", presenter = "Referent / Datum ergänzen", image }:
  { title: string; subtitle?: string; presenter?: string; image?: string }) {
  return (
    <Slide pad={false}>
      <div style={{
        height: "55%", width: "100%",
        background: image ? `url(${image}) center/cover` : `linear-gradient(135deg, ${HTW.color.green}, ${HTW.color.green600})`,
      }} />
      <div style={{ padding: `28px ${HTW.space.padX}px`, position: "relative", height: "45%", boxSizing: "border-box" }}>
        <h1 style={{ margin: 0, fontSize: HTW.font.title, fontWeight: 700, color: HTW.color.green, lineHeight: 1.05 }}>
          {title}
        </h1>
        <div style={{ fontSize: HTW.font.subhead, color: HTW.color.ink, marginTop: 2 }}>{subtitle}</div>
        <div style={{ position: "absolute", left: HTW.space.padX, bottom: 26, fontSize: HTW.font.body, color: HTW.color.ink }}>
          {presenter}
        </div>
        <div style={{ position: "absolute", right: HTW.space.padX, bottom: 20 }}>
          <HtwLockup width={150} />
        </div>
      </div>
    </Slide>
  );
}

/** Trennfolie / Kapitel – vollflächig grün. */
export function SectionDivider({ number, title }: { number?: number; title: string }) {
  return (
    <Slide bg={HTW.color.green} pad={false}>
      <div style={{ padding: `0 ${HTW.space.padX}px`, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h2 style={{ margin: 0, maxWidth: 760, fontSize: HTW.font.title, fontWeight: 700, color: HTW.color.white, lineHeight: 1.15 }}>
          {number != null && <span>{number}. </span>}{title}
        </h2>
      </div>
      <div style={{ position: "absolute", right: HTW.space.padX, bottom: 24 }}>
        <HtwLockup width={150} onDark />
      </div>
    </Slide>
  );
}

/** Agenda – nummerierte Zeilen, aktive Zeile grün. */
export function AgendaSlide({ items, active = 0, footer, page }:
  { items: string[]; active?: number; footer?: string; page?: number }) {
  return (
    <Slide>
      <h2 style={{ margin: 0, fontSize: HTW.font.h2, fontWeight: 700 }}>Agenda</h2>
      <div style={{ marginTop: HTW.space.blockGap, display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((it, i) => {
          const on = i === active;
          return (
            <div key={i} style={{ display: "flex", alignItems: "stretch", height: 34 }}>
              <div style={{
                width: 34, display: "flex", alignItems: "center", justifyContent: "center",
                background: on ? HTW.color.green : HTW.color.greenTint,
                color: on ? HTW.color.white : HTW.color.dark2, fontWeight: 700, fontSize: HTW.font.bodySmall,
              }}>{i + 1}</div>
              <div style={{
                flex: 1, display: "flex", alignItems: "center", paddingLeft: 14,
                background: on ? "rgba(118,185,0,.12)" : "#F4F4F4",
                color: HTW.color.ink, fontSize: HTW.font.bodySmall, fontWeight: on ? 700 : 400,
              }}>{it}</div>
            </div>
          );
        })}
      </div>
      <Footer text={footer} page={page} />
    </Slide>
  );
}

/** Inhaltsfolie: Titel + freier Inhalt. spalten = 1|2|3 ordnet children automatisch. */
export function ContentSlide({ title, lead, children, columns = 1, footer, page }:
  { title: string; lead?: string; children?: React.ReactNode; columns?: 1 | 2 | 3; footer?: string; page?: number }) {
  return (
    <Slide>
      <h2 style={{ margin: 0, fontSize: HTW.font.h2, fontWeight: 700 }}>{title}</h2>
      {lead && <p style={{ margin: "10px 0 0", fontSize: HTW.font.lead, fontWeight: 700, color: HTW.color.ink, maxWidth: 880 }}>{lead}</p>}
      <div style={{
        marginTop: HTW.space.blockGap,
        display: columns > 1 ? "grid" : "block",
        gridTemplateColumns: columns > 1 ? `repeat(${columns}, 1fr)` : undefined,
        gap: HTW.space.columnGap,
        fontSize: HTW.font.bodySmall, color: HTW.color.ink, lineHeight: 1.4,
      }}>
        {children}
      </div>
      <Footer text={footer} page={page} />
    </Slide>
  );
}

/** Inhaltsfolie mit Bild (Text links, Bild rechts oder gespiegelt). */
export function ContentImageSlide({ title, lead, children, image, imageRight = true, footer, page }:
  { title: string; lead?: string; children?: React.ReactNode; image?: string; imageRight?: boolean; footer?: string; page?: number }) {
  const Text = (
    <div style={{ flex: 1, fontSize: HTW.font.bodySmall, lineHeight: 1.4 }}>
      {lead && <p style={{ margin: "0 0 10px", fontSize: HTW.font.lead, fontWeight: 700 }}>{lead}</p>}
      {children}
    </div>
  );
  const Img = (
    <div style={{
      flex: 1, alignSelf: "stretch", borderRadius: 0,
      background: image ? `url(${image}) center/cover` : HTW.color.placeholder,
      minHeight: 320,
    }} />
  );
  return (
    <Slide>
      <h2 style={{ margin: 0, fontSize: HTW.font.h2, fontWeight: 700 }}>{title}</h2>
      <div style={{ display: "flex", gap: HTW.space.columnGap, marginTop: HTW.space.blockGap, height: 420 }}>
        {imageRight ? <>{Text}{Img}</> : <>{Img}{Text}</>}
      </div>
      <Footer text={footer} page={page} />
    </Slide>
  );
}

/** "Nur Titel" mit grauem Inhalts-Platzhalter. */
export function TitleOnlySlide({ title, children, footer, page }:
  { title: string; children?: React.ReactNode; footer?: string; page?: number }) {
  return (
    <Slide>
      <h2 style={{ margin: 0, fontSize: HTW.font.h2, fontWeight: 700 }}>{title}</h2>
      <div style={{
        marginTop: HTW.space.blockGap, height: 470, background: HTW.color.placeholder,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: HTW.color.grey, fontSize: HTW.font.body,
      }}>
        {children ?? "Inhaltsbereich"}
      </div>
      <Footer text={footer} page={page} />
    </Slide>
  );
}

/** Schlussfolie "Vielen Dank." mit Kontakt. */
export function ClosingSlide({ presenter = "Max Mustermann", info = "Weitere Informationen\nund Kontaktdaten", url = "www.htw-berlin.de" }:
  { presenter?: string; info?: string; url?: string }) {
  return (
    <Slide pad={false}>
      <div style={{ background: HTW.color.green, height: "46%", display: "flex", alignItems: "center", padding: `0 ${HTW.space.padX}px` }}>
        <h2 style={{ margin: 0, color: HTW.color.white, fontSize: HTW.font.title, fontWeight: 700 }}>Vielen Dank.</h2>
      </div>
      <div style={{ position: "relative", height: "54%", padding: `28px ${HTW.space.padX}px`, boxSizing: "border-box" }}>
        <div style={{ fontSize: HTW.font.body }}>
          <strong>{presenter}</strong>
          {info.split("\n").map((l, i) => <div key={i} style={{ color: HTW.color.ink }}>{l}</div>)}
        </div>
        <div style={{ position: "absolute", left: HTW.space.padX, bottom: 22, fontSize: HTW.font.caption, color: HTW.color.muted }}>{url}</div>
        <div style={{ position: "absolute", right: HTW.space.padX, bottom: 20 }}>
          <HtwLockup width={150} />
        </div>
      </div>
    </Slide>
  );
}

/* ============================================================= *
 * 5) DECK-WRAPPER  (vertikales Stacking der Folien)
 * ============================================================= */
export function Deck({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center", padding: 24, background: "#DADADA" }}>
      {children}
    </div>
  );
}

/* ============================================================= *
 * 6) DEMO  (Standard-Export – zeigt alle Kernlayouts)
 * ============================================================= */
export default function HtwDemoDeck() {
  return (
    <Deck>
      <TitleSlide title="Innovativ und vielfältig." subtitle="HTW Berlin" presenter="Max Mustermann · 17.06.2026" />
      <SectionDivider number={1} title="Titel des Kapitels kann hier stehen." />
      <AgendaSlide
        active={0}
        footer="Max Mustermann | Agenda"
        page={3}
        items={["Bezeichnung des Kapitels", "Methodik", "Analyse", "Ergebnisse", "Fazit & Ausblick"]}
      />
      <ContentSlide title="Titel + 2 spaltiger Text" lead="Lorem ipsum dolor sit amet, consectetuer adipiscing elit." columns={2} footer="Max Mustermann | Inhalte" page={4}>
        <div>
          <p style={{ marginTop: 0 }}>Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero.</p>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>Erster Punkt</li><li>Zweiter Punkt</li><li>Dritter Punkt</li>
          </ul>
        </div>
        <div>
          <p style={{ marginTop: 0 }}>Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar.</p>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>Aspekt A</li><li>Aspekt B</li><li>Aspekt C</li>
          </ul>
        </div>
      </ContentSlide>
      <ContentImageSlide title="Titel + Text-Bild" lead="Lorem ipsum dolor sit amet." footer="Max Mustermann | Text-Bild" page={5}>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>Fusce posuere, magna sed pulvinar ultricies</li>
          <li>Purus lectus malesuada libero</li>
          <li>Sit amet commodo magna eros</li>
        </ul>
      </ContentImageSlide>
      <ClosingSlide presenter="Max Mustermann" />
    </Deck>
  );
}
