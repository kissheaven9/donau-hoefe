# DONAU HÖFE — Landingpage

Einseitige Landingpage für das Wohnquartier **DONAU HÖFE** (Gundelfingen a.d. Donau, Bayerisch-Schwaben), Projektträger **GU-FI GmbH**. Zielgruppe: **Investoren** (Grundstückserwerb, Projektentwicklung nach Maß, gemeinsame Entwicklung). Statisches HTML/CSS + minimal JS, vorgesehen für GitHub Pages.

> Hinweis Sprache: Projektkommunikation mit Olga auf Russisch, **Website-Inhalt ausschließlich Deutsch**.

## Projektstruktur
```
donau-hoefe/
├── index.html              # Landingpage (alle Sektionen)
├── datenschutz.html        # Pflicht-Datenschutzseite (DE)
├── _designsystem.html      # interner Design-System-Board (nicht Teil der Seite)
├── README.md               # dieses Dokument
├── DEV-LOG.md              # Fehler-/Entscheidungstagebuch
└── assets/
    ├── css/styles.css      # gesamtes Design-System + Layout (Anti-Cache ?v=N)
    ├── js/app.js           # Wort-Rotation, Mobile-Nav, Reveal, Formular
    └── img/                # optimierte Bilder (WebP + JPEG-Fallback, ≤300 KB)
```

## Sektionen (Reihenfolge)
Header (fix) → Hero → Das Projekt → Das Quartier (Bild-Mosaik) → Kennzahlen → Nachhaltigkeit → Wohnen im Quartier → Lage → Entwicklung → Für Investoren (Masterplan OPLA + 3 Formate) → Projektträger → Kontakt (dunkel, Formular) → Footer/Impressum.

## Design-System (aus Olgas Figma-Datei umgesetzt)
Quelle: `дизайн сайта компьютерная версия.и палитра.fig` (Frame 1516 px breit) — dekodiert und exakt nachgebaut.
- **Schriften:** Saira Condensed (Display/H1–H3, GROSSBUCHSTABEN) + Saira (Text/UI). Ersatz für **AdihausDIN** (Figma-Original, proprietär/adidas → nicht web-einbettbar). Bei vorhandener Lizenz via `@font-face` tauschbar.
- **Farben:** Oliv `#1e3006` (Text, Linien, Headlines) · Creme `#fffadd` (Text auf Foto) · Oliv-Grün `#6a8043` (Sekundärtext, Button-Text) · **Orange `#ed7a13` (Akzent: Zahlen, Highlights, Pin)** · Graphit `#40413f` · Weiß. Helle Gelbtöne `#ffe687/#fffc9e` für Verläufe.
- **Buttons (einheitlich):** `.btn` = Pfeil-Pille mit Outline (Text-Farbe kontextabhängig). Varianten: `--cream` (auf Foto), `--solid` (Oliv-Fläche), `--orange` (Formular-CTA).
- **Highlight inline:** `.mark` = oranger Hinterleger (z. B. „23.700 m²“, „barrierefrei“).
- **Muster:** Sektionskopf = Label (`.eyebrow`, ggf. Icon) + Linie (`.rule`) + GROSS-Headline. Foto-Bänder (`.band`) mit Text-Overlay; Bild/Text-Splits; Bild-Mosaik (3+2).
- **Adaptiv:** mobile-first, Breakpoints 980 / 760 / 520 px. Typo per `clamp()`.
- **Hinweis Inhalt:** Kennzahl & Projekttext auf `23.700 m²` vereinheitlicht; Tippfehler `QNG`, `2027` korrigiert; Kontaktformular + Impressum ergänzt (nicht im Figma, aber nötig).

## Bilder
- Quelle: Renderings aus `../гундельфинген/`. Optimiert nach `assets/img/` als WebP + JPEG-Fallback, je ≤300 KB.
- `loading="lazy"` überall außer Hero (`fetchpriority="high"`).
- alt-Texte deutsch; Visualisierungen mit „Visualisierung“ gekennzeichnet, Masterplan „Städtebauliches Konzept · OPLA“.

## Interaktion (app.js)
- Hero: Wort-Rotation `lebendiges → bezahlbares → nachhaltiges` (2,4 s; deaktiviert bei `prefers-reduced-motion`).
- Header wird beim Scrollen solide; Mobile-Navigation (Burger, Esc/Klick schließt).
- Reveal beim Scrollen (IntersectionObserver) + 2,5 s-Sicherheits-Fallback, damit Inhalt garantiert sichtbar bleibt.
- Kontaktformular: clientseitige Validierung + Versand via **Formspree** (Endpoint in `index.html`, Platzhalter `DEIN_FORMSPREE_ID`). Ohne Endpoint: Demo-Bestätigung.

## Offene Punkte
- [ ] Lage: Karten-Bild + bestätigte Entfernungen einsetzen.
- [ ] Formspree-Endpoint eintragen (`action` im `#contactForm`).
- [ ] Inhaltliche Feinabstimmung / ggf. Umbau einzelner Sektionen zu Bild-Karten.

## Lokal ansehen
`python3 -m http.server 8124` im Ordner `donau-hoefe/`, dann `http://localhost:8124/`.

## Anti-Cache
CSS/JS werden mit `?v=N` eingebunden; bei Änderungen Versionsnummer erhöhen.
