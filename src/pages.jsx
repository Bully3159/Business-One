import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Warning,
  ShieldCheck,
  ChartBar,
  CalendarBlank,
  ArrowUpRight,
  Clock,
  LockKey,
} from "@phosphor-icons/react";
import {
  Action,
  Panel,
  Stats,
  Notice,
  Ranked,
  Chart,
  DataTable,
  Buckets,
  Evidence,
  Select,
  fmt,
  money,
} from "./components";
import * as D from "./data";
export const agingCols = [
  "Relatie",
  "Naam",
  "Open bedrag",
  "Achterstallig",
  "Niet toegewezen credit",
  "Posten",
];
export const goodsCols = [
  "Beweging",
  "Zonder rekening",
  "71070 · W.V.R.Engros NV",
  "80072 · Opbrengst Verk.HJ Engros",
  "Totaal",
];
export const articleCols = [
  "Artikel",
  "Omschrijving",
  "Waarde",
  "ABC",
  "XYZ",
  "Vraagvariatie",
  "Gem. maandvraag",
];
export const ageCols = [
  "Artikel",
  "Omschrijving",
  "Magazijn",
  "Voorraad",
  "Oudste dagen",
  "Ouderdom onbekend",
  "Verschil met bronstand",
];
export const turnoverCols = [
  "Artikel",
  "Omschrijving",
  "Magazijn",
  "Gem. voorraad",
  "Uitgiften",
  "Omloop",
  "Voorraaddagen",
  "Dekking dagen",
];
export const profitCols = [
  "Rubriek / rekening",
  "Gekozen periode",
  "Cumulatief kalenderjaar",
  "Zelfde periode vorig jaar",
  "Cumulatief vorig jaar",
  "Verschil",
  "Verschil %",
];
export const trialCols = [
  "Rubriek / grootboekrekening",
  "Rapport",
  "Beginstand",
  "Debet",
  "Credit",
  "Mutatie",
  "Eindstand",
];
export function pageDataset(id) {
  switch (id) {
    case "debtors":
      return [agingCols, D.debtorRows];
    case "creditors":
      return [agingCols, D.creditorRows];
    case "abc":
      return [articleCols, D.articles];
    case "age":
      return [ageCols, D.ageRows];
    case "turnover":
      return [turnoverCols, D.turnoverRows];
    case "goods":
    case "reconciliation":
      return [goodsCols, D.goodsRows];
    case "profit":
      return [profitCols, D.profitRows];
    case "trial":
      return [trialCols, D.trialRows];
    case "sales":
      return [["Klant", "Netto omzet"], D.salesCustomers];
    case "purchase":
      return [["Leverancier", "Open orderwaarde"], D.attentionVendors];
    case "inventory":
      return [["Artikel", "Voorraadwaarde"], D.stockTop];
    default:
      return [
        ["Kengetal", "Waarde"],
        [
          [
            "Resultaat in periode",
            id === "dashboard" ? 26715556.84 : 2478032.28,
          ],
          ["Netto omzet", id === "dashboard" ? 209582120.03 : 11982326.44],
          ["Voorraadwaarde", 39698591.12],
        ],
      ];
  }
}
const months = [
  "jan",
  "feb",
  "mrt",
  "apr",
  "mei",
  "jun",
  "jul",
  "aug",
  "sep",
  "okt",
  "nov",
  "dec",
];
const result = [2.5, 3.5, 2.4, 2.8, 4, 3.9, 5.9, 3.7, 4.7, -6, -5.6, 5.8].map(
  (v, i) => ({ name: months[i], value: v * 1e6, previous: 0 }),
);
const revenue = [
  12, 14, 13.5, 20, 18.5, 21.5, 22.5, 17.5, 18, 23, 17, 15.5,
].map((v, i) => ({ name: months[i], value: v * 1e6 }));
const purchases = [
  0, 0.8, 28.3, 9.8, 17, 14.2, 15.3, 7.2, 6.8, 13, 14.5, 5.8,
].map((v, i) => ({ name: months[i], value: v * 1e6 }));
const daily = [
  0, 0.03, 0.01, 0.06, 0.09, 0.4, 0.22, 0.14, 0.16, 0.33, 0.14, 0.58, 0.28,
  0.96, 0.37, 0.33, 0.59, 0.31, 0.64, 0.35, 0.08, 0.85, 0.47, 1, 0.34,
].map((v, i) => ({
  name: String(i + 2),
  value: v * 1e6,
  profit: v * 0.25 * 1e6,
}));
export function Dashboard({ go }) {
  return (
    <>
      <div className="dashboard-intro">
        <div>
          <span className="eyebrow">FINANCIEEL OVERZICHT · 2025</span>
          <h2>Een jaar in perspectief.</h2>
          <p>De belangrijkste cijfers van Nexus Reporting Services.</p>
        </div>
        <span className="badge success">
          <CheckCircle /> Broncontrole aangesloten
        </span>
      </div>
      <Stats
        items={[
          [
            "Resultaat in de periode",
            26715556.84,
            "SRD",
            "Geboekt nettoresultaat · positief = winst",
          ],
          ["Netto verkoop", 209582120.03, "SRD", "Gefactureerde netto verkoop"],
          ["Inkoopwaarde", 131186499.02, "SRD", "Gefactureerde netto inkoop"],
          [
            "Actuele voorraadwaarde",
            39698591.12,
            "SRD",
            "Laatste geslaagde bronsync",
          ],
        ]}
      />
      <div className="balance-strip">
        <span className="round-icon">
          <CheckCircle size={22} />
        </span>
        <div>
          <strong>Balans in evenwicht</strong>
          <p>Per 31 dec. 2025 · inclusief cumulatief resultaat</p>
        </div>
        <div className="balance-number">
          <span>Werkelijk verschil</span>
          <strong>
            0,00 <small>SRD</small>
          </strong>
        </div>
        <button className="text-button" onClick={() => go("balance")}>
          Bekijk balans <ArrowRight />
        </button>
      </div>
      <div className="grid-two">
        <Chart
          title="Resultaat per maand"
          sub="Ontwikkeling per maand · 2025 en 2024 · SRD"
          data={result}
          keys={["value", "previous"]}
          labels={["2025", "2024"]}
          bar
          approx
          go={() => go("profit")}
        />
        <Chart
          title="Netto verkoop per maand"
          sub="Commercieel · gefactureerde netto verkoop"
          data={revenue}
          bar
          approx
          go={() => go("sales")}
        />
        <Ranked
          title="Top 5 klanten"
          sub="Netto factuurwaarde per klant"
          items={D.customers}
          go={() => go("sales")}
          note="Creditnota’s afgetrokken · 1.096 relaties/magazijnen in de volledige rapportselectie."
        />
        <Chart
          title="Inkoopwaarde per maand"
          sub="Factuurregels minus creditnota’s · excl. btw en vracht"
          data={purchases}
          bar
          approx
          go={() => go("purchase")}
        />
        <Ranked
          title="Top 5 leveranciers"
          sub="Netto factuurwaarde per leverancier"
          items={D.vendors}
          go={() => go("purchase")}
          note="Creditnota’s afgetrokken · 24 relaties/magazijnen in de volledige rapportselectie."
        />
        <Ranked
          title="Huidige voorraad per magazijn"
          sub="Vastgelegde SAP-bronstand · onafhankelijk van periodefilter"
          items={D.warehouses}
          unit="voorraadeenheden"
          go={() => go("inventory")}
          note="Magazijnwaarde is niet beschikbaar. Uiteenlopende artikeleenheden zijn niet omgerekend. 11 magazijnen in de volledige bron."
        />
      </div>
      <Notice title="Kengetallen klaar voor inrichting">
        Controleer de rekeningindeling voor marges, EBIT, EBITDA en financiële
        ratio’s. Dezelfde periode vorig jaar heeft een resultaat van 0,00 SRD;
        verschil +26.715.556,84 SRD.
      </Notice>
      <details className="evidence">
        <summary>Grootste afwijkingen & aansluiting</summary>
        <p>
          De screenshot bevat geen uitgeklapte details van dit onderdeel.
          Aanvullende brongegevens zijn nodig om de afwijkingen te verklaren.
        </p>
      </details>
      <Panel title="Verder in de rapportages" sub="Jouw werkgebieden">
        <div className="module-links">
          {[
            ["Finance", "profit", "Balans, resultaat en grootboek"],
            ["Sales", "sales", "Omzet, klanten en documenten"],
            ["Purchase", "purchase", "Inkoop, leveranciers en orders"],
            ["Inventory", "inventory", "Voorraad en bewegingen"],
            ["Management", "comparison", "Administraties en werkkapitaal"],
          ].map(([title, id, desc]) => (
            <button key={id} onClick={() => go(id)}>
              <ChartBar size={20} />
              <strong>{title}</strong>
              <p>{desc}</p>
              <ArrowUpRight size={18} />
            </button>
          ))}
        </div>
      </Panel>
      <Evidence count={6}>
        <p>
          Rapporten zijn alleen-lezen. Voorraadwaardering per magazijn
          ontbreekt. Financiële ratio’s wachten op goedgekeurde
          rekeningclassificatie.
        </p>
      </Evidence>
    </>
  );
}
export function AgingPage({ credit = false }) {
  const [selected, setSelected] = useState(null);
  const rows = credit ? D.creditorRows : D.debtorRows;
  const labels = D.agingLabels;
  return (
    <>
      <Stats
        items={[
          ["Open op peildatum", credit ? 154480366.45 : 10485853.95],
          ["Relaties", credit ? 26 : 239, "", "In de volledige bronselectie"],
          [
            "Relatieboekingen",
            "Sluiten aan",
            "",
            "Aansluiting met SAP gecontroleerd",
          ],
        ]}
      />
      <Buckets
        labels={labels}
        values={credit ? D.creditorAges : D.debtorAges}
        selected={selected}
        onSelect={setSelected}
      />
      {selected !== null ? (
        <Panel title={labels[selected]} sub="Ouderdomsselectie">
          <Notice title="Regels per ouderdom niet meegeleverd">
            De screenshot toont het totaal van deze categorie, maar geen
            uitsplitsing per relatie. Hieronder blijft de volledige zichtbare
            relatielijst beschikbaar.
          </Notice>
          <Action onClick={() => setSelected(null)}>Selectie wissen</Action>
        </Panel>
      ) : null}
      <DataTable
        title={credit ? "Crediteuren" : "Debiteuren"}
        sub={`${credit ? "26" : "239"} relaties in de bron · bedragen in SRD`}
        columns={agingCols}
        rows={rows}
        footer="Alleen de zichtbare relaties zijn overgenomen"
      />
      <Evidence>
        <p>
          Ouderdom op vervaldatum. Open posten op 22 oktober 2026, met
          betalingen en verrekeningen tot die datum. Negatieve bedragen in niet
          toegewezen credit blijven apart zichtbaar.
        </p>
      </Evidence>
    </>
  );
}
export function GoodsPage() {
  return (
    <>
      <div className="reconcile-banner">
        <div>
          <Warning size={24} />
          <div>
            <h2>Aansluiting controleren</h2>
            <p>
              Er zijn goederenbewegingen zonder voorraadrekening. Bekijk ‘Zonder
              rekening’; de totaalaansluiting kan daardoor niet worden
              bevestigd.
            </p>
          </div>
        </div>
        <div>
          <span>Eindvoorraad</span>
          <strong>
            39.698.591,12 <small>SRD</small>
          </strong>
        </div>
        <div>
          <span>Grootboek / verschil</span>
          <strong className="warning-text">Niet beschikbaar</strong>
        </div>
      </div>
      <DataTable
        title="Goederenbeweging"
        sub="1 jan. 2026 – 22 okt. 2026 · bedragen in SRD"
        columns={goodsCols}
        rows={D.goodsRows}
      />
      <Evidence count={6}>
        <p>
          Bedragen per voorraadrekening. De screenshot bevat twee toegewezen
          grootboekrekeningen en een kolom ‘Zonder rekening’. De eindvoorraad is
          een bronwaarde; grootboek en aansluitverschil zijn niet beschikbaar.
        </p>
      </Evidence>
    </>
  );
}
export function FinancePage({ id, go }) {
  const [zeros, setZeros] = useState(true);
  const [level, setLevel] = useState("3");
  const [view, setView] = useState("Rubrieken");
  const trial = id === "trial";
  const balance = id === "balance";
  const base = trial || balance ? D.trialRows : D.profitRows;
  let rows = base.filter((r) => !zeros || r.slice(2).some((v) => v !== 0));
  if (level === "1")
    rows = rows.filter((r, i) => i === 0 || i === rows.length - 1);
  return (
    <>
      <Stats
        items={[
          ["Resultaat in periode", 2478032.28, "SRD", "Positief = winst"],
          ["Balans na resultaat", 0, "SRD", "Debet = credit"],
          ["Grootboek", "In evenwicht", "", "Balans sluit aan"],
        ]}
      />
      <Notice
        title={
          balance ? "Balansbron beperkt beschikbaar" : "Rapporttoelichting"
        }
      >
        {balance
          ? "Er is geen afzonderlijke balansscreenshot meegeleverd. Deze weergave toont de beschikbare balansrekeningen uit de proefbalans; een volledige balans is nog niet beschikbaar."
          : "Bekijk de aandachtspunten voor deze periode. Brutowinst, EBIT en EBITDA zijn nog niet beschikbaar door ontbrekende rekeningclassificatie."}
      </Notice>
      <div className="report-tabs">
        {[
          ["balance", "Balans"],
          ["profit", "Winst & verlies"],
          ["trial", "Proefbalans"],
        ].map(([key, name]) => (
          <button
            key={key}
            onClick={() => go(key)}
            className={id === key ? "active" : ""}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="finance-controls">
        <div className="segmented">
          {["Rubrieken", "Grootboeklijst"].map((v) => (
            <button
              key={v}
              className={view === v ? "active" : ""}
              onClick={() => setView(v)}
            >
              {v}
            </button>
          ))}
        </div>
        <label className="check">
          <input
            type="checkbox"
            checked={zeros}
            onChange={(e) => setZeros(e.target.checked)}
          />{" "}
          Zonder nulregels
        </label>
        <Select
          label="Detailniveau"
          options={["1", "3", "5"]}
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
      </div>
      {view === "Grootboeklijst" && (
        <Notice title="Grootboekdetails">
          Alleen de in de screenshots zichtbare rubrieken en rekening 11082 zijn
          beschikbaar. Voor een volledige grootboeklijst is de SAP-bron nodig.
        </Notice>
      )}
      <DataTable
        key={id}
        title={
          balance
            ? "Beschikbare balansrekeningen"
            : trial
              ? "Proefbalans"
              : "Resultaatrapport"
        }
        sub="Gekozen periode · 1 jan. 2025 – 31 jan. 2025 · SRD"
        columns={trial || balance ? trialCols : profitCols}
        rows={rows}
        footer={
          trial
            ? "91 van 335 rekeningen in de oorspronkelijke selectie"
            : "SAP-rubrieken · kalenderjaarvergelijkingen"
        }
      />
      {trial && (
        <div className="balance-strip">
          <CheckCircle size={22} />
          <strong>Totaal geselecteerde rekeningen</strong>
          <span className="push">
            Debet <b>174.555.523,05</b> · Credit <b>174.555.523,05</b> · Saldo{" "}
            <b>0,00 SRD</b>
          </span>
        </div>
      )}
      <Evidence>
        <p>
          Broncontrole & aansluiting: 65.742 grootboekregels, aangesloten.
          SAP-bronvolgorde. Rubrieken volgen de SAP-structuur en tellen niet
          dubbel mee. Nulregels verbergen is een lokale weergavefilter.
        </p>
      </Evidence>
    </>
  );
}
export function AnalysisPage({ id }) {
  const purchase = id === "purchase",
    inventory = id === "inventory";
  const items = purchase
    ? D.attentionVendors
    : inventory
      ? D.stockTop
      : D.salesCustomers;
  const [group, setGroup] = useState("Top 10");
  return (
    <>
      <Stats
        items={
          purchase
            ? [
                ["Netto inkoopwaarde", 0],
                ["Open PO-regelwaarde · actueel", 5255786.6],
                [
                  "Achterstallige PO-regelwaarde",
                  5255786.6,
                  "SRD",
                  "Aandacht vereist",
                ],
              ]
            : inventory
              ? [
                  ["Voorraadwaarde · actueel", 39698591.12],
                  ["Aanvulling nodig", 0, "artikel-magazijnen"],
                  [
                    "Negatieve voorraad",
                    1,
                    "artikel-magazijnen",
                    "Controleer de voorraadpositie",
                  ],
                ]
              : [
                  ["Netto omzet", 11982326.44],
                  ["Documentbrutowinst", 3023657.92],
                  ["Documentmarge", 25.23, "%"],
                ]
        }
      />
      <details className="evidence">
        <summary>
          Proces & activiteit{" "}
          <span>{purchase ? 13 : inventory ? 7 : 8} aanvullende cijfers</span>
        </summary>
        <p>
          De screenshots bevatten geen uitgeklapte procescijfers. Aanvullende
          brongegevens zijn nodig.
        </p>
      </details>
      {purchase ? (
        <>
          <div className="grid-two">
            <Panel title="Inkoopwaarde per dag" sub="Tijdlijn · SRD">
              <div className="empty">
                <CalendarBlank size={30} />
                <strong>Geen activiteit voor deze selectie</strong>
                <p>Geen gefactureerde inkoop in januari 2025.</p>
              </div>
            </Panel>
            <Panel
              title="Verwachte ontvangsten · open regels"
              sub="Tijdlijn · SRD"
            >
              <div className="empty">
                <Clock size={30} />
                <strong>Geen activiteit voor deze selectie</strong>
                <p>De screenshot toont geen ontvangsten in deze tijdlijn.</p>
              </div>
            </Panel>
          </div>
          <DataTable
            title="Inkoopactiviteit per week"
            sub="ISO-week · maandag · aantallen per documenttype"
            columns={["Week", "Inkooporders", "Ontvangsten", "Inkoopfacturen"]}
            rows={[
              ["2025-W01 · 1–5 jan.", 1, 0, 0],
              ["2025-W02 · 6–12 jan.", 16, 17, 0],
              ["2025-W03 · 13–19 jan.", 4, 4, 0],
              ["2025-W04 · 20–26 jan.", 5, 5, 0],
              ["2025-W05 · 27–31 jan.", 6, 3, 0],
            ]}
            formatDigits={0}
          />
          <div className="grid-two">
            <Ranked
              title="Inkoopactiviteit"
              items={[
                ["Inkooporder", 32],
                ["Goederenontvangst", 29],
              ]}
              unit="documenten"
            />
            <Ranked
              title="Open PO-regelwaarde · actueel"
              items={[
                ["Achterstallig", 5255786.6],
                ["Binnen leverdatum", 0],
              ]}
            />
            <Ranked title="Aandacht vereist · leveranciers" items={items} />
            <Ranked
              title="Leveringssignaleringen"
              items={[
                ["Deellevering · nog open restwaarde", 4744081.01],
                ["Vandaag te ontvangen", 0],
              ]}
              note="Signaleringen kunnen overlappen."
            />
          </div>
        </>
      ) : (
        <>
          <Chart
            title={
              inventory
                ? "Voorraadbewegingen · periode"
                : "Omzet en documentbrutowinst per dag"
            }
            sub={
              inventory
                ? "Inkomend en uitgaand · SRD"
                : "2 jan. 2025 – 31 jan. 2025 · SRD"
            }
            total={inventory ? 130442659.33 : 11982326.44}
            data={
              inventory
                ? daily.map((r, i) => ({
                    ...r,
                    value: i === 5 ? 100e6 : i === 0 ? 35e6 : 1e6,
                    profit: i === 5 ? 102e6 : 0,
                  }))
                : daily
            }
            keys={["value", "profit"]}
            labels={
              inventory
                ? ["Inkomend", "Uitgaand"]
                : ["Netto omzet", "Documentbrutowinst"]
            }
            approx
          />
          <div className="section-toolbar">
            <h2>Analyse naar dimensie</h2>
            <Select
              label="Weergave"
              options={["Top 10", "Alle zichtbare regels"]}
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
          </div>
          {group === "Top 10" ? (
            <Ranked
              title={
                inventory
                  ? "Top 10 artikelen op voorraadwaarde"
                  : "Top 10 klanten"
              }
              sub="Hoog naar laag · SRD"
              items={items}
              note={
                inventory
                  ? "10 van 754 artikelen getoond · Overig: 22.646.799,48 SRD"
                  : "10 van 661 klanten getoond · Overig: 8.930.324,82 SRD"
              }
            />
          ) : (
            <DataTable
              title={inventory ? "Artikelen" : "Klanten"}
              columns={[
                inventory ? "Artikel" : "Klant",
                inventory ? "Voorraadwaarde" : "Netto omzet",
              ]}
              rows={items}
            />
          )}
        </>
      )}
      {inventory && (
        <Notice title="Voorraad volgt de laatste geslaagde bronsync">
          De gekozen periode bepaalt bewegingen en activiteit. De actuele
          voorraadwaarde is onafhankelijk van de periodefilter.
        </Notice>
      )}
      <Evidence count={purchase ? 10 : inventory ? 11 : 6}>
        <p>
          {purchase
            ? "Ontvangsten en facturen zijn activiteit in de periode, geen aansluitcontrole op orders uit dezelfde week. Eerste en laatste week volgen alleen de geselecteerde dagen."
            : "Klik op tabeldetails voor de zichtbare gegevens. Onderliggende SAP-documenten zijn niet meegeleverd."}
        </p>
      </Evidence>
    </>
  );
}
export function AbcPage() {
  const [cell, setCell] = useState(null);
  const [abc, setAbc] = useState("Alle");
  const [xyz, setXyz] = useState("Alle");
  const rows = D.articles.filter(
    (r) =>
      (abc === "Alle" || r[3] === abc) &&
      (xyz === "Alle" || r[4] === xyz) &&
      (!cell || (r[3] === cell[0] && r[4] === cell[1])),
  );
  return (
    <>
      <div className="grid-two abc-layout">
        <section>
          <div className="section-toolbar">
            <div>
              <h2>Waarde × vraagvariatie</h2>
              <p className="muted">
                Kies een vak om bijbehorende artikelen te bekijken.
              </p>
            </div>
            {cell && (
              <button className="text-button" onClick={() => setCell(null)}>
                Wis selectie
              </button>
            )}
          </div>
          <div className="matrix">
            <span></span>
            {["X · Regelmatig", "Y · Wisselend", "Z · Onregelmatig"].map(
              (l) => (
                <span key={l} className="matrix-label">
                  {l}
                </span>
              ),
            )}
            {["A", "B", "C"].map((a, i) => (
              <React.Fragment key={a}>
                <span className="matrix-axis">
                  {a}
                  <small>{["Hoog", "Midden", "Laag"][i]}</small>
                </span>
                {D.abcCells.slice(i * 3, i * 3 + 3).map(([id, count, val]) => (
                  <button
                    key={id}
                    aria-pressed={cell === id}
                    className={`matrix-cell ${id.endsWith("Z") ? "amber" : ""} ${cell === id ? "selected" : ""}`}
                    onClick={() => setCell(cell === id ? null : id)}
                  >
                    <span>{id}</span>
                    <strong>
                      {count}
                      <small>artikelen</small>
                    </strong>
                    <small>{fmt(val)} SRD</small>
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>
          <p className="panel-note">
            441 artikelen buiten de negen vakken: geen positieve waarde, geen
            vraag of onvoldoende historie.
          </p>
        </section>
        <Ranked
          title="Waardeconcentratie"
          sub="Zichtbare topartikelen · positieve waarden · totaal 209.582.120,03 SRD"
          items={D.articles.slice(0, 7).map((r) => [r[1], r[2]])}
        />
      </div>
      <DataTable
        title={cell ? `Artikelen · ${cell}` : "Artikelen"}
        sub="Indeling berekend over 754 artikelen · 12 volledige maanden"
        columns={articleCols}
        rows={rows}
        tools={
          <>
            <Select
              label="ABC"
              options={["Alle", "A", "B", "C"]}
              value={abc}
              onChange={(e) => setAbc(e.target.value)}
            />
            <Select
              label="XYZ"
              options={["Alle", "X", "Y", "Z", "Onvoldoende historie"]}
              value={xyz}
              onChange={(e) => setXyz(e.target.value)}
            />
          </>
        }
      />
      <Evidence>
        <p>
          Waardebasis: netto omzet. Gekozen periode: 1 januari tot en met 31
          december 2025. De classificatiegrenzen zijn niet uitgeklapt in de
          screenshot en zijn daarom niet opnieuw berekend.
        </p>
      </Evidence>
    </>
  );
}
export function StockPage({ turnover = false }) {
  const [warehouse, setWarehouse] = useState("Alle");
  const [bucket, setBucket] = useState(null);
  let rows = (turnover ? D.turnoverRows : D.ageRows).filter(
    (r) => warehouse === "Alle" || r[2] === warehouse,
  );
  if (bucket !== null) {
    rows = rows.filter((r) =>
      bucket === 5
        ? r[4] > 365
        : bucket === 6
          ? r[5] > 0
          : bucket === 7
            ? r[3] < 0
            : bucket === 8
              ? r[3] === 0
              : r[4] >= [0, 31, 61, 91, 181][bucket] &&
                r[4] <= [30, 60, 90, 180, 365][bucket],
    );
  }
  return (
    <>
      <Stats
        items={[
          ["Geregistreerde voorraadwaarde", null, "SRD"],
          ["Artikel/magazijnposities", 8294, ""],
          ["Historie niet volledig bekend", 516, ""],
          ["Negatieve voorraad", 1, ""],
          ["Hoeveelheidsverschil", 0, ""],
        ]}
      />
      <Notice title="Onvolledige voorraadgeschiedenis">
        De historische hoeveelheden kunnen niet volledig worden gecontroleerd.
        De selectie bevat een negatieve of onvolledige hoeveelhedenhistorie.
      </Notice>
      {turnover ? (
        <Stats
          items={[
            ["Omloopsnelheid op waarde", null],
            ["Voorraaddagen op waarde", null],
          ]}
        />
      ) : (
        <Buckets
          labels={D.stockAgeLabels}
          values={D.stockAges}
          unit="posities"
          selected={bucket}
          onSelect={setBucket}
        />
      )}
      <DataTable
        title="Voorraadposities"
        sub={
          turnover
            ? "Operationele voorraadomloop · geboekte verkoopuitgiften op boekingsdatum"
            : "Voorraadleeftijd · FIFO-simulatie op boekingsdatum"
        }
        columns={turnover ? turnoverCols : ageCols}
        rows={rows}
        formatDigits={turnover ? 6 : 0}
        tools={
          <Select
            label="Magazijn"
            options={[
              "Alle",
              ...new Set(
                (turnover ? D.turnoverRows : D.ageRows).map((r) => r[2]),
              ),
            ]}
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
          />
        }
        footer="8.294 posities in de volledige bron"
      />
      <Evidence>
        <p>
          Peildatum: 22 oktober 2026. Geen schatting voor ontbrekende
          voorraadwaarde, voorraaddagen of dekking. De zichtbare regels zijn
          overgenomen zonder een berekende bronhistorie te suggereren.
        </p>
      </Evidence>
    </>
  );
}
export function Comparison({ go }) {
  return (
    <>
      <Panel
        title="Bronsync per administratie"
        sub="1 toegankelijke administratie"
      >
        <div className="admin-source">
          <ShieldCheck size={24} />
          <strong>Nexus Reporting Services</strong>
          <span>22 okt. 2026 · 12:38:17</span>
          <span className="badge success">Bron bijgewerkt</span>
        </div>
      </Panel>
      <Ranked
        title="Resultaat in periode"
        sub="SRD · 1 administratie · eigen schaal"
        items={[["Nexus Reporting Services", 2478032.28]]}
      />
      <DataTable
        title="Administratievergelijking"
        sub="Totalen per valuta · zonder eliminaties"
        columns={[
          "Administratie",
          "Valuta",
          "Resultaat in periode",
          "Netto omzet",
          "Netto inkoop",
          "Actuele voorraadwaarde",
        ]}
        rows={[
          [
            "Nexus Reporting Services · HJ Group",
            "SRD",
            2478032.28,
            11982326.44,
            0,
            39698591.12,
          ],
          ["Totaal SRD", "SRD", 2478032.28, 11982326.44, 0, 39698591.12],
        ]}
      />
      <div className="quick-links">
        <Action onClick={() => go("profit")}>
          Resultaat openen <ArrowRight />
        </Action>
        <Action onClick={() => go("sales")}>
          Verkoopanalyse <ArrowRight />
        </Action>
        <Action onClick={() => go("inventory")}>
          Voorraad bekijken <ArrowRight />
        </Action>
      </div>
      <Evidence count={7}>
        <p>
          Voorraad: laatste geslaagde bronsync. Elke valuta heeft een eigen
          schaal. Export gebruikt de zichtbare selectie en houdt totalen per
          valuta gescheiden.
        </p>
      </Evidence>
    </>
  );
}
export function Capital({ go }) {
  const cash = [
    ["Debiteuren · netto open", 10485853.95],
    ["Debiteuren · vervallen", 10489473.99],
    ["Debiteuren · ouder dan 90 dagen", 10435019.19],
    ["Crediteuren · netto open", 154480366.45],
    ["Crediteuren · vervallen", 217225439.7],
  ];
  return (
    <>
      <div className="grid-two">
        <Ranked
          title="Waar zit het geld?"
          sub="Eén administratie · dezelfde peildatum · bedragen in SRD"
          items={cash}
        />
        <Panel
          title="Van overzicht naar actie"
          sub="Bekijk achterstallige posten, voorraad die blijft liggen en betaalverplichtingen."
        >
          <div className="capital-actions">
            {[
              ["Debiteuren · netto open", "debtors"],
              ["Debiteuren · vervallen", "debtors"],
              ["Debiteuren · ouder dan 90 dagen", "debtors"],
              ["Crediteuren · netto open", "creditors"],
              ["Crediteuren · vervallen", "creditors"],
              ["Voorraadboekwaarde · peildatum", "age"],
              ["Voorraadposities · herkomst onbekend", "age"],
              ["Voorraadomloop · geboekte kostwaarde", "turnover"],
              ["Voorraaddagen · geboekte kostwaarde", "turnover"],
            ].map(([label, id]) => (
              <button key={label} onClick={() => go(id)}>
                {label}
                <ArrowRight size={17} />
              </button>
            ))}
          </div>
        </Panel>
      </div>
      <Stats
        items={[
          ["Voorraadboekwaarde · peildatum", null],
          ["Kas en bank", null],
          ["Werkkapitaal", null],
        ]}
      />
      <Notice title="Kengetallen nog niet beschikbaar">
        De financiële rekeningclassificatie is nog niet goedgekeurd. Historische
        hoeveelheden kunnen niet volledig worden gecontroleerd.
      </Notice>
      <Stats
        items={[
          ["Voorraadposities · herkomst onbekend", 516, "posities"],
          ["Voorraadomloop", null],
          ["Voorraaddagen", null],
          ["Current ratio", null],
          ["Quick ratio", null],
        ]}
      />
      <div className="section-toolbar">
        <h2>Vorderingen per ouderdom</h2>
        <button className="text-button" onClick={() => go("debtors")}>
          Debiteurenaging openen <ArrowRight />
        </button>
      </div>
      <Buckets labels={D.agingLabels} values={D.debtorAges} />
      <div className="section-toolbar">
        <h2>Verplichtingen per ouderdom</h2>
        <button className="text-button" onClick={() => go("creditors")}>
          Crediteurenaging openen <ArrowRight />
        </button>
      </div>
      <Buckets labels={D.agingLabels} values={D.creditorAges} />
      <div className="section-toolbar">
        <h2>Voorraadouderdom</h2>
        <button className="text-button" onClick={() => go("age")}>
          Voorraadouderdom openen <ArrowRight />
        </button>
      </div>
      <Buckets labels={D.stockAgeLabels} values={D.stockAges} unit="posities" />
      <Evidence>
        <p>
          Peildatum 22 oktober 2026; cyclus 1 januari – 22 oktober 2026. Ratio’s
          worden niet berekend zolang de bronclassificatie onvolledig is.
        </p>
      </Evidence>
    </>
  );
}
export function Account({ go }) {
  const [message, setMessage] = useState(false);
  return (
    <div className="account-layout">
      <Panel title="Profiel" sub="Persoonlijke toegang">
        <div className="profile-avatar">PA</div>
        <h2>Patricio</h2>
        <p className="muted">Nexus Reporting Services</p>
        <span className="badge">Finance</span>
        <div className="profile-note">
          <ShieldCheck size={20} />
          <span>
            SAP Business One
            <br />
            <strong>Alleen-lezen rapportages</strong>
          </span>
        </div>
      </Panel>
      <Panel
        title="Wachtwoord wijzigen"
        sub="Gebruik 12 tot 128 tekens, met een hoofdletter, kleine letter en cijfer. Kies een uniek wachtwoord."
      >
        <div className="account-form">
          <Notice title="Accountbeheer vereist een live koppeling">
            Deze ontwerpversie is niet verbonden met je account. Voer hier geen
            echt wachtwoord in.
          </Notice>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setMessage(true);
            }}
          >
            {[
              "Huidig wachtwoord",
              "Nieuw wachtwoord",
              "Herhaal nieuw wachtwoord",
            ].map((label) => (
              <label key={label}>
                {label}
                <input
                  type="password"
                  disabled
                  aria-label={label}
                  placeholder="Beschikbaar na koppeling"
                />
              </label>
            ))}
            <div className="quick-links">
              <Action disabled primary icon={<LockKey />}>
                Wachtwoord wijzigen
              </Action>
              <Action onClick={() => go("dashboard")}>
                Naar rapportages <ArrowRight />
              </Action>
            </div>
          </form>
          {message && (
            <p role="status">Accountbeheer is nog niet aangesloten.</p>
          )}
        </div>
      </Panel>
    </div>
  );
}
