# Nexus Reporting Services

Een herontwerp van de Nexus/SAP Reporting-werkplek op basis van de 17 aangeleverde screenshots. React, Vite, officiële Fluent UI-componenten, Phosphor-iconen, Recharts en lokaal gehoste IBM Plex Sans.

## Downloaden en openen

Klik op **Code → Download ZIP** op GitHub en pak het bestand uit. Open daarna `docs/Nexus-Reporting.html` in Chrome, Edge, Firefox of Safari. Er is geen installatie nodig. Je kunt ook alleen `docs/Nexus-Reporting.zip` downloaden en uitpakken.

## Ontwikkelen

Node.js 22.12+ of 24 wordt ondersteund.

```sh
npm ci
npm run dev -- --port 5173
```

Open de door Vite getoonde lokale ontwikkelserver. De bestaande checkout is de werkmap; een extra Git-worktree is niet nodig.

```sh
npm run build
npm run preview
```

## Wat werkt

- Dashboard en navigatie naar Finance, Sales, Purchase, Inventory, Management en Mijn account.
- Tabellen met lokale zoekopdrachten, numerieke sortering, paginering en toegankelijke regeldialogen.
- ABC/XYZ-matrix met selectie, ABC- en XYZ-filters; magazijnfilter in voorraadtabellen; voorraadouderdomselectie.
- Schakelen tussen lijn, staaf en tabel voor grafieken.
- Excel-export met echte numerieke cellen, kopregels en filters. CSV-export van de gefilterde en gesorteerde tabelselectie. PDF via de afdrukfunctie van de browser.
- Datumselectie met een expliciete melding als de gevraagde periode ontbreekt.
- Mobiele navigatie, horizontaal scrollbare tabellen, toetsenbordbediening en afdrukopmaak.
- Een aanmeldontwerp dat zonder echte inloggegevens toegang geeft tot het voorbeeld.

## Herkomst en beperkingen

Dit is een zelfstandig interactief ontwerp, geen wijziging aan de bestaande gepubliceerde website. Er is geen SAP-API, echte authenticatie of server gekoppeld. De tabelgegevens staan los van de presentatie in `src/data.js` en zijn getranscribeerd uit de screenshots. Alleen zichtbare regels zijn beschikbaar; bronselecties van bijvoorbeeld 239 relaties of 8.294 voorraadposities zijn dus niet volledig opgenomen.

Grafiekpunten zijn visueel gereconstrueerd, zijn niet exacte bronwaarden en worden in de interface als indicatief aangeduid. Totalen en zichtbare tabelbedragen zijn overgenomen uit de screenshots. Rekeningclassificaties, voorraadgeschiedenis en ontbrekende ratio’s worden niet verzonnen of opnieuw berekend. Voor Balans was geen afzonderlijke screenshot beschikbaar; die pagina toont expliciet alleen beschikbare balansrekeningen uit de proefbalans. Het woordmerk is typografisch benaderd; voor identieke huisstijl is het originele logo-bestand nodig.

Niet-uitgeklapte details, niet-zichtbare documenten en de bronregels per ouderdom zijn niet beschikbaar. De accountpagina neemt geen wachtwoorden aan; wachtwoord wijzigen vereist een toekomstige beveiligde serverkoppeling. Export omvat alleen de aanwezige gegevens, nooit verzonnen bronregels.

## Browsercontrole

Start eerst de ontwikkelserver. Installeer de Playwright-browser indien nodig:

```sh
npx playwright install chromium
npm run test:smoke
```

Met een bestaande systeembrowser:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:smoke
```

De rooktest controleert alle 17 werkplekschermen, zoeken, sorteren, paginering, lege resultaten, detaildialoog, ABC-selectie, grafiektabel, onbeschikbare periode, CSV/Excel-export, mobiele navigatie en horizontale pagina-overloop op 320, 768, 1024 en 1440 pixels. De test maakt voorbeelden in `docs/`. Die beelden zijn ontwerpvoorbeelden met screenshotgegevens.

## Bestanden

- `src/main.jsx`: werkplekshell, navigatie en routes.
- `src/pages.jsx`: rapportpagina’s.
- `src/components.jsx`: gedeelde tabellen, filters, grafieken en exports.
- `src/data.js`: zichtbare brongegevens.
- `src/style.css`: kleuren, typografie, layouts, responsive en print.

De live website blijft ongewijzigd. Voor ingebruikname zijn een echte databron, autorisatie, authenticatie en deployment in de eigen infrastructuur nodig.

## Zonder installatie openen

`npm run build:standalone` maakt `standalone/index.html`: één HTML-bestand met ingesloten lettertypen, vormgeving, code en screenshotgegevens. Download het bestand en open het in een moderne browser. Er is geen server of internetverbinding nodig. Ook lokale navigatie, zoekfuncties en Excel-export werken offline. Deze versie bevat dezelfde beperkingen als de ontwikkelversie en maakt geen verbinding met SAP.
