# HTW Berlin – Corporate Design System

Dieses Repository definiert das **offizielle Folien-Design der HTW Berlin** als Code,
extrahiert 1:1 aus dem PowerPoint-Folienmaster. Es ermöglicht, in Claude Design
Präsentationen mit **100 % visueller Konsistenz** zum HTW-Branding zu erzeugen –
inklusive Logo.

## Dateien

| Datei | Zweck |
|-------|-------|
| `design-system.json` | Maschinenlesbare Design-Tokens: Farben, Typo-Skala, Logo-SVG, Layout-Katalog. **Single Source of Truth.** |
| `SlideTemplate.tsx` | Fertige React-Komponenten für jedes Layout (Titel, Trennfolie, Agenda, Inhalt, Schluss) inkl. vektorisiertem htw-Logo. |
| `htw-logo.svg` | Eigenständige htw-Wortmarke (optional, `fill: currentColor`). Bereits in JSON & TSX eingebettet. |

## Anweisung an Claude (so wird konsistent gebaut)

> Wenn du eine Präsentation für mich erstellst, **verwende ausschließlich** die
> Komponenten aus `SlideTemplate.tsx` und die Tokens aus `design-system.json`.
> Erfinde **keine** eigenen Farben, Schriftgrößen oder Logo-Varianten. Halte dich an:

1. **Farben** – nur Werte aus `colors`. `htwGreen #76B900` ist die Leitfarbe.
   Grün dominiert (Titel, Trennfolien, Logo, Akzente); alles andere ist Schwarz auf Weiß.
2. **Schrift** – `'HTWBerlin Office'` mit Fallback **Arial** (`font.webStack`). Niemals andere Fonts.
3. **Logo** – immer die `<HtwWordmark>` / `<HtwLockup>` Komponente, nie nachbauen oder verzerren.
   Auf weißem Grund grün, auf grünem Grund weiß (`onDark`).
4. **Fußzeile** – Inhaltsfolien tragen `<Footer>` mit Seitenzahl links, Referent_in + Folientitel mittig, Wortmarke rechts.
5. **Layout-Wahl** – passendes Layout aus `layouts` wählen (siehe Tabelle unten), Inhalt einfügen, **Struktur nicht verändern**.

## Verfügbare Komponenten

```tsx
import {
  TitleSlide, SectionDivider, AgendaSlide,
  ContentSlide, ContentImageSlide, TitleOnlySlide,
  ClosingSlide, Deck, HtwWordmark, HtwLockup, HTW
} from "./SlideTemplate";
```

| Komponente | Layout | Wofür |
|------------|--------|-------|
| `TitleSlide` | Titelfolie mit Foto oben | Eröffnung. Props: `title, subtitle, presenter, image` |
| `SectionDivider` | Trennfolie (grün) | Kapitelstart. Props: `number?, title` |
| `AgendaSlide` | Agenda | Inhaltsübersicht. Props: `items[], active, footer, page` |
| `ContentSlide` | Titel + 1/2/3-spaltig | Standard-Inhalt. Props: `title, lead?, columns(1\|2\|3), footer, page` |
| `ContentImageSlide` | Text-Bild | Inhalt mit Bild. Props: `title, lead?, image, imageRight, footer, page` |
| `TitleOnlySlide` | Nur Titel + Platzhalter | Freier Inhaltsbereich. Props: `title, children, footer, page` |
| `ClosingSlide` | „Vielen Dank." | Abschluss. Props: `presenter, info, url` |
| `Deck` | – | Wrapper, stapelt Folien vertikal |

## Beispiel

```tsx
export default function MeinePraesentation() {
  const ref = "Jonas Beispiel · 17.06.2026";
  return (
    <Deck>
      <TitleSlide title="Digitale Transformation" subtitle="HTW Berlin" presenter={ref} />
      <AgendaSlide items={["Einleitung", "Status quo", "Lösungsansatz", "Fazit"]} active={0} footer="Jonas | Agenda" page={2} />
      <SectionDivider number={1} title="Einleitung" />
      <ContentSlide title="Ausgangslage" lead="Die Kernfrage dieser Arbeit." columns={2} footer="Jonas | Einleitung" page={4}>
        <div><p>Erster Aspekt …</p></div>
        <div><p>Zweiter Aspekt …</p></div>
      </ContentSlide>
      <ClosingSlide presenter="Jonas Beispiel" />
    </Deck>
  );
}
```

## Design-Tokens (Kurzreferenz)

- **Leitfarbe:** `#76B900` · Dunkelgrün `#588B00` · Grün-Tint `#E3F1CC`
- **Text:** Schwarz `#000000` · Gedämpft/Fußzeile `#646464`
- **Akzente (Diagramme):** Blau `#0082D1` · Orange `#FF5F00`
- **Format:** 16:9 · 1280×720 px
- **Typo:** Titel 30pt · Folientitel 20pt · Lead 16–18pt · Body 13.5–14pt · Fußzeile 12pt
- **Schrift:** HTWBerlin Office → Fallback Arial

> Quelle: extrahiert aus `HTW_Berlin_PowerPoint_Master.pptx` (Theme-Farben, 34 Layouts, Logo aus `media/image1.emf` vektorisiert).
> Das htw-Logo ist eine geschützte Marke der HTW Berlin – Nutzung nur im Rahmen der Hochschule.
