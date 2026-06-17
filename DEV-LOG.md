# DONAU HÖFE — DEV-LOG (Fehler & Entscheidungen)

Format: **Problem → Ursache → Fix/Entscheidung**. Neueste oben.

## 2026-06-17 — Hero-Bild neu, Mobil-Version, Kontakt, Closing
- **Neues Hero-Foto** (Kinder mit Ball am Quartier) + OG-Image neu generiert. **Favicon** = `фавикон.png` (Kundin) für alle Icon-Größen.
- **Hero Desktop:** Textblock + Button ~1,5–2 cm tiefer; Kicker dünn (Regular) in 2 Zeilen; **Logo größer** (42 px).
- **Closing:** Foto VOLLSTÄNDIG (in-flow, `height:auto`) → Ball + Füße immer sichtbar (zuvor unten beschnitten trotz object-position).
- **Kontakt Desktop:** Formular startet jetzt auf Höhe der Überschrift (Headline+Infos in linke Spalte, Form rechts, `align-items:start`).
- **Mobil (≤760):**
  - Hero: Bild (rechte Hälfte) ohne Verlauf oben; Text darunter auf Weiß in Dunkelgrün; Button dunkelgrün.
  - Lage: **andere Karte** (`lage-karte-mobil`, ohne helles Feld) via `<picture media>`; Überschrift wieder normale (größere) Größe.
  - Entwicklung-Timeline: Linie entfernt, Icons+Text **zentriert** untereinander.
  - Galerie/Closing: kein Verlauf/Schatten/Streifen; Caption **grün, zentriert, unter dem Foto**.
  - Mosaik-Labels größer; Burger-Menü ohne Kasten, dünnere Linien.

## 2026-06-17 — Nachhaltigkeit + Galerie Feinschliff
- **Nachhaltigkeit – Foto beschnitten/Sektion gestaucht** → Ursache: vorher `min-height`+`object-fit:cover` schnitt oben/unten (Junge/Hase) → Fix: Bild im Fluss (`band__media position:relative`, `img height:auto`), Sektionshöhe = volle Bildhöhe; Junge, Hase und Häuser komplett sichtbar.
- **Nachhaltigkeit – Textblock zu hoch/mittig** → Fix: `.container position:absolute; align-items:end` → Text unten-links (kicker + H2 + Text).
- **Nachhaltigkeit – überflüssige Trennlinie** unter dem Kicker (im Macet nicht vorhanden) → `<hr class="rule">` entfernt. REGEL: keine Deko-Linien, die nicht im Design sind.
- **Galerie/Closing – Foto unten beschnitten (Ball/Füße fehlten)** → Ursache: `object-position: center 82%` schnitt unten → Fix: `object-position: center bottom` (oben darf beschnitten werden, unten NIE — Ball + Füße immer sichtbar). Text „Ein Ort…“ rechts unten mit lokaler Unterlage.

## 2026-06-17 — 3 Sektionen exakt nach Macet + Deploy

- **Nachhaltigkeit:** Sektion höher (`min-height: clamp(640px,62vw,900px)`), Bild ganz sichtbar (Hase), Headline größer + in untere Drittel (`align-items:flex-end`), Badges echtes Frosted Glass (`backdrop-filter: blur(14px)`, transparent, weißer Rand, helle Schrift).
- **Lage:** Akzentwort „Korridor“ jetzt **oliv** (`.hl-g`), nicht orange. Headline in EINE Zeile (Größe reduziert). Karte kontrastreicher (`filter: contrast/saturate`, Opacity entfernt). Textpanel kompakter (max-width 480), Karte bekommt mehr Raum.
- **Galerie/Closing:** 3 Fotos als **Polaroids** (weißer Rahmen, unten dicker, je eigene Neigung, Schatten), überlappen einander und das große Foto. Großes Foto auf Kinder zentriert (`object-position: center 68%`).

- **Deploy:** GitHub Pages → https://kissheaven9.github.io/donau-hoefe/ (Repo kissheaven9/donau-hoefe). Asset-Pfade auf relativ umgestellt (Project-Page-Subpath). `.nojekyll` gesetzt. Canonical/OG zeigen auf Zieldomain donauhoefe.de (für späteren Custom-Domain-Umzug per CNAME).

## 2026-06-17 — Verstka-Regeln + SEO-Standard angewandt

**Normalisierungen (Verstka-Regeln, Self-Check):**
- Spacing-Skala: durchgängig über `clamp()` + Tokens (`--section-y`, `--gutter`); Schritte orientiert an 4/8/16/24/32/48/64. Zufallswerte aus Figma (z. B. 30/31/33 px) zur Ritmik gerundet.
- Container `max-width:1360px`, zentriert; Vollbreiten-Bänder (Hero/Nachhaltigkeit/Lage/Entwicklung/Closing) = 100 % Viewport, Inhalt im Container. Keine Hardcodes auf Artboard-Breite (1516).
- Gleiche Elemente konsistent (Buttons, Tiles, Badges, Eyebrows). Hierarchie unverändert (H1>H2>Text).
- KEINE Designänderungen, keine zusätzlichen Sektionen/Texte/Farben — nur technische Normalisierung.
- Offene Punkte ggf. zur Klärung: Kontakt-Sektion + Footer existieren nicht im Figma (rechtlich/Brief nötig → ergänzt, im Stil des Layouts).

**SEO-Standard umgesetzt:**
- Inhalt + Meta vollständig im statischen HTML (ohne JS sichtbar; per curl geprüft).
- `<title>`, `meta description`, ein `<h1>`, Semantik header/nav/main/section/footer.
- Open Graph (inkl. `og:image` 1200×630, generiert) + Twitter Card; `canonical`; `hreflang` de + x-default.
- Schema.org JSON-LD (`Organization` GU-FI + `Residence` DONAU HÖFE) — validiert.
- Bilder WebP+JPEG ≤300 KB, `loading=lazy` (Hero `fetchpriority=high`), alt deutsch.
- **Schriften self-hosted**: AdihausDIN (regular/cn/bold) via `@font-face`; Google-Fonts-CDN entfernt (Geschwindigkeit + DSGVO).
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, `favicon.ico` + PNG-Icons + Apple-Touch-Icon.
- Stadt/Region (Gundelfingen, Bayerisch-Schwaben) in title/H1/alt/Schema (lokales SEO).
- **Offen:** Formspree-Endpoint (Formularversand), Google Search Console + privacy-freundliche Analytics (Plausible/Matomo) — erfordern Domain/Live-Gang; CSS/JS-Minify für Produktion.

## 2026-06-16 — Korrekturrunde (genau nach Figma)
Rückmeldung Olga: zu viele eigene Interpretationen. Korrigiert, strikt nach Datei:
- Ecken überall **eckig** (cornerRadius im Figma = None/0); Schatten entfernt (flach).
- Buttons: **eckiger Outline-Button, Pfeil nach unten ↓** (Figma-Stroke #ffe687, transparent).
- Hero-Text nach **unten** ausgerichtet (wie Figma).
- **Fläche = 22.000 m²** (Olgas korrekte Zahl) überall.
- Logo: **kein Blatt**; Wortmarke „Donau höfe“. Exaktes Logo = Vektor in Figma; kiwi-Pfad nicht verlässlich extrahierbar → **als PNG/SVG aus Figma exportieren** und einsetzen.
- Kennzahlen: symmetrische Abstände (oben = unten).
- Nachhaltigkeit: Text links, **weiße Badges rechts gestapelt** (Figma-Layout).
- Wohnen: Abstand nach Headline = 2× Absatzabstand.
- Lage: meine falschen Pins (Ulm/Augsburg) entfernt; **Objekt (Gundelfingen) markiert**, Augsburg nicht mehr verdeckt. Olgas exakte Karten-Overlays (Routen) nicht extrahierbar → ggf. Lage-Block als Bild exportieren.
- Entwicklung: Foto-Band + weiße Karte rechts, **Fortschrittsbalken + Timeline darunter auf Weiß** (vorher lag Timeline über dem Foto).
- Kontakt: **hell** (Weiß, Oliv-Text, eckiger Oliv-Button) statt dunkelgrün+Orange.
- Footer: **lesbar** (Creme-Text auf Oliv, unterstrichene Links).

## 2026-06-16 — Neuaufbau nach Figma (Olga)

- **Komplettes Redesign auf Basis der Figma-Datei** „дизайн сайта компьютерная версия.и палитра.fig“.
  → *Vorgehen:* `.fig` = ZIP → `canvas.fig` (fig-kiwi v106). Container ohne 4-Byte-Alignment; Block 1 (Schema) raw-deflate, Block 2 (Daten) Zstandard. Kiwi-Schema (617 Defs) + Message decodiert (Root „Message“ → `nodeChanges`, 191 Nodes), Float-Sonderfall rotl(bits,23). Daraus exakt entnommen: Palette, Schriften, Texte, absolute Koordinaten (Transform-Komposition über Parent-Kette), Bild-Zuordnung (SHA-1-Hash → `images/<hex>`).
  → *Palette (Figma):* Oliv `#1e3006` (Text/Linien) · Creme `#fffadd` · Oliv-Grün `#6a8043` · **Orange `#ed7a13` (Akzent)** · Graphit `#40413f` · Weiß. **Ersetzt** die frühere Navy/Blau-Version komplett.
  → *Schrift:* Figma nutzt **AdihausDIN** (Regular + Cn Medium) — proprietär (adidas), nicht web-einbettbar. Ersatz: **Saira / Saira Condensed** (DIN-Superfamilie, Google Fonts). Falls AdihausDIN-Lizenz/Dateien vorliegen → via @font-face tauschen.
  → *Bewusste Abweichungen (zur Klärung markiert):* Kennzahl in Figma „~22.000 m²“, Projekttext „23.700 m²“ → einheitlich **23.700** übernommen. Tippfehler korrigiert: „KQNG-Siegel“→„QNG-Siegel“, Timeline „2007“→„2027“. Hero-Headline ist in Figma statisch (keine Wort-Rotation) → statisch umgesetzt. Kontaktformular + Impressum-Footer waren NICHT in Figma → ergänzt (rechtlich/Brief nötig), im selben Stil.

- **Foto-Band-Hintergrund lief über die Sektion hinaus (Nachhaltigkeit-Bild deckte Wohnen).**
  → *Problem:* `.band__media`/`.lage__media` (`position:absolute; inset:0`) ragten nach unten in die Folgesektion; Wohnen war hinter dem Nachhaltigkeits-Foto verdeckt.
  → *Ursache:* trotz `position:relative` auf der Sektion fehlte das Clipping; das gecoverte Bild überzeichnete den Sektionsrahmen.
  → *Fix:* `overflow:hidden` auf `.band` und `.lage`. **Regel:** Sektionen mit absolut positioniertem Vollbild-Hintergrund immer `position:relative` + `overflow:hidden`.
  → *Mess-Hinweis:* `getBoundingClientRect` lieferte zu kleine Höhen, weil `loading="lazy"`-Bilder außerhalb des kleinen Messfensters nicht luden → Messung nur im hohen Fenster (Bilder im Viewport) verlässlich.

## 2026-06-16 — frühere Iteration (vor Figma)

- **Submit-Button unsichtbar in der Kontakt-Sektion.**
  → *Problem:* „Unterlagen anfordern“ war als `.btn` (Navy-Fläche) auf der dunklen Navy-Sektion → Navy auf Navy, praktisch unsichtbar (im Vollseiten-Screenshot erkannt).
  → *Ursache:* Standard-Primärbutton ist Navy; auf dunklem Grund kein Kontrast.
  → *Fix:* Button auf `.btn--light` (weiße Pille, Navy-Text) umgestellt. **Regel:** auf dunklen Sektionen/Fotos immer `.btn--light`/`.btn--ghost`, nie der Navy-Standardbutton.

- **Designrichtung: Akzentfarbe — Grün → Gelb → Blau-Familie (final).**
  → *Verlauf:* Start mit Natur-Grün `#445b16` (klimaneutral-Begründung). Rückmeldung Auftraggeberin: „Grün ist gewöhnlich und zu viel davon“. Umstellung auf Gelb `#ffc600` (Referenz-Akzent). Rückmeldung: „Gelb gefällt nicht; Kit direkt von der Referenz nehmen.“
  → *Entscheidung:* Kit per CSS-Analyse aus `43.mechta.su` extrahiert (Häufigkeit: Weiß 303 · Navy 88 · Blau `#40598f` 51 · Gelb 30 · Grün 14). Daraus: **Weiß + Navy + Blau** als Basis, Akzent sparsam in der Blau-Familie; Gelb/Grün entfernt. Hero-Highlight (rotierendes Wort) = `#9fbaea` (hell, sichtbar auf Foto). **Regel:** Premium kommt von Zurückhaltung (wenig Farbfläche, Fotografie führt), nicht von der Farbsättigung.

- **Hero: blaue Halbtransparenz-Überlagerung entfernt.**
  → *Problem/Wunsch:* Auftraggeberin wollte die blaue (Navy-)Tönung über dem Hero-Foto weg.
  → *Fix:* Navy-Gradient durch neutrales, leichtes Schwarz-Gradient ersetzt (nur unten + minimal oben für Lesbarkeit von Text/Header) plus `text-shadow` auf Hero-Texten. Foto bleibt warm/natürlich, kein Blaustich. **Hinweis:** Restdunkelung bleibt aus Accessibility-Gründen (Kontrast Text auf Bild) erhalten.

- **Bild-Werkzeugkette: WebP-Export.**
  → *Problem:* `sips` (macOS 12) kann WebP nicht schreiben (Exit 1); `cwebp`/ImageMagick nicht installiert.
  → *Fix:* Python **Pillow** (WebP-Support vorhanden) erzeugt WebP + JPEG-Fallback, Qualität iterativ gesenkt bis ≤300 KB. `<picture>` mit WebP-`source` + JPEG-`img`.

- **„design apartments“-Rendering (Popcorn) im Bildordner.**
  → *Problem:* `192C…PNG` zeigt ein Motiv aus einem anderen Projekt (Design Apartments).
  → *Entscheidung:* Für DONAU HÖFE **nicht** verwendet.

- **Screenshot-Segmente verrutscht (sips).**
  → *Problem:* `sips -c … --cropOffset` schneidet aus der **Bildmitte**, nicht von oben → falsche Ausschnitte.
  → *Fix:* Vollseiten-Screenshot mit **Pillow** in absolute Streifen zerlegt (`crop((0, top, w, bot))`).

- **Headless-Chrome Reveal-Sichtbarkeit.**
  → *Problem:* Reveal-Elemente (`opacity:0` bis IntersectionObserver) könnten im Screenshot unsichtbar bleiben.
  → *Fix:* Screenshot mit `--virtual-time-budget` (≥3000 ms), damit der 2,5 s-Sicherheits-Fallback feuert; im Produktivcode bleibt der Fallback bestehen.

## 2026-06-17 — Galerie/Hero Feinschliff (Desktop+Mobil)
- Closing: schwarze Linie unter dem Foto entfernt (war `border-top` der Kontakt-Sektion). Caption ohne Schatten, ~1,5 cm tiefer. Mobil: gleiche Linie weg.
- Mobil-Hero: nur rechte Bildhälfte (Kinder), Höhe vergrößert (`object-position:82%`, höher).

## 2026-06-17 — Typewriter-Wort, Texte, Mobil-Hero-Foto
- Hero-Headline: Wort lebendiges/bezahlbares/nachhaltiges als **Schreibmaschine** (tippen/löschen) in GLEAM #ffe687 + blinkende Caret; mobil orange (lesbar auf Weiß); reduced-motion → statisch.
- Text: Hero-Sub „In Gundelfingen a.d. Donau …"; Projekt-H2 „Hier entsteht ein neues Zuhause."; **Fläche nur Block 2 → 24.000 m²** (Kennzahl/Meta bleiben 22.000 — so gewünscht). Negativ-Begriffe entfernt: „Schwarz-Areal", „Brachfläche", „ehemalig", „Areal" (auch OG/JSON-LD/alt).
- Closing-Caption ~1 cm tiefer (Ursache: `.band .container` Padding 7rem → `#closing` padding-bottom reduziert).
- Mobil-Hero: eigenes Foto „фото первый экран для телефона" via `<picture media>`, zentriert.

## 2026-06-17 — Recht + Security + Formular
- Text „Investieren in die Zukunft" → „Investieren **Sie** in die Zukunft" (H1, OG, Twitter, OG-Bild neu).
- Mobil: Tipp-Wort auf eigener Zeile (`<br class="only-mob">`) → kein Springen; H1 mobil etwas kleiner (kein Abschneiden).
- **Pflicht-Checkbox** Datenschutz-Zustimmung vor dem Button (unchecked, required, Link); JS-Validierung blockiert Versand ohne Häkchen.
- **Honeypot** (`name="_gotcha"`, off-screen) gegen Spam-Bots; JS bricht still ab, Formspree filtert serverseitig.
- `<meta name="referrer" content="strict-origin-when-cross-origin">`; keine externen `target=_blank`-Links; keine Secrets im Repo (geprüft); Enforce HTTPS aktiv.
- **impressum.html** neu (Struktur wie datenschutz.html, § 5 DDG vollständig: GU-FI GmbH, Anschrift, GF, HRB 36880 AG Augsburg, USt-IdNr. DE436392539, § 18 MStV). Footer auf ALLEN Seiten: „Impressum · Datenschutz". In sitemap.xml ergänzt.
- Datenschutz korrigiert: Schriften **self-hosted** (kein Google Fonts), Karte = statisches Bild (keine externen Dienste) → **kein Cookie-Banner nötig**.
- Recht-Nische (Investment): keine Renditeversprechen; Disclaimer „unverbindlich, Änderungen vorbehalten" vorhanden.
- Favicon = `фавикон.png` (Kundin), Multi-Size .ico (16/32/48) + Cache-Bust `?v=2`.

## 2026-06-17 — Formspree angebunden
- Kontaktformular `action` = https://formspree.io/f/maqzzbly; Empfaenger = gufigmbh@gmail.com (Formspree-Konto). Hidden `_subject`. Reply-To = E-Mail-Feld des Absenders (Formspree-Auto).
