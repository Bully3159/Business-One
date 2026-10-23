import React, { useState, useEffect, useRef } from "react";
import { Button } from "@fluentui/react-components";
import {
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Download,
  Printer,
  CheckCircle,
  ShieldCheck,
  Warning,
  CalendarBlank,
  MagnifyingGlass,
  X,
  FileText,
  Info,
  CaretRight,
  ArrowsClockwise,
  ChartBar,
  ChartLine,
  Table as TableIcon,
} from "@phosphor-icons/react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
export const fmt = (x, d = 2) =>
  x === null || x === undefined
    ? "Niet beschikbaar"
    : typeof x === "number"
      ? x.toLocaleString("nl-NL", {
          minimumFractionDigits: d,
          maximumFractionDigits: d,
        })
      : x;
export const money = (x) => fmt(x);
export function Action({ children, primary = false, icon, onClick, ...props }) {
  return (
    <Button
      appearance={primary ? "primary" : "outline"}
      icon={icon}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
}
export function Panel({ title, sub, action, children, className = "" }) {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-head">
        <div>
          <h2>{title}</h2>
          {sub && (
            <details className="panel-context">
              <summary aria-label={"Toelichting bij " + title}>
                <Info size={15} />
              </summary>
              <p>{sub}</p>
            </details>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
export function Source() {
  return (
    <details className="source-compact">
      <summary>
        <ShieldCheck size={14} />
        <span>Bron · 22 okt. 2026</span>
        <span className="source-check">Aangesloten</span>
      </summary>
      <p>
        SQL-rapportagebron · laatste bronsync 22 oktober 2026, 12:38:17. Bron
        bijgewerkt. Deze versie bevat screenshotgegevens, zonder live
        SAP-verbinding.
      </p>
    </details>
  );
}
export function Notice({ children, title = "Aandachtspunt", danger = false }) {
  return (
    <details className={"notice disclosure " + (danger ? "danger" : "")}>
      <summary>
        <Warning size={18} />
        <strong>{title}</strong>
        <span>Details</span>
      </summary>
      <p>{children}</p>
    </details>
  );
}
export function Stats({ items }) {
  return (
    <div className="stats">
      {items.map(([label, value, unit = "SRD", note], i) => (
        <div className="stat" key={label}>
          <span className="stat-label">{label}</span>
          <div
            className={"stat-value " + (value === null ? "unavailable" : "")}
          >
            {fmt(
              value,
              unit === "" ||
                unit === "posities" ||
                unit === "artikel-magazijnen"
                ? 0
                : 2,
            )}{" "}
            {value !== null && <small>{unit}</small>}
          </div>
          {note && (
            <span className="stat-note" title={note}>
              <Info size={13} />
              <span className="sr-only">{note}</span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
export function Buckets({ labels, values, unit = "SRD", onSelect, selected }) {
  return (
    <div className="buckets">
      {labels.map((label, i) => (
        <button
          className={"bucket " + (selected === i ? "selected" : "")}
          key={label}
          onClick={() => onSelect?.(selected === i ? null : i)}
          disabled={!onSelect}
        >
          <span>{label}</span>
          <strong>{fmt(values[i], unit === "SRD" ? 2 : 0)}</strong>
          <small>{unit}</small>
          <div className="track">
            <i
              style={{
                width: `${Math.max(1, (values[i] / Math.max(...values)) * 100)}%`,
              }}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
export function Evidence({ children, count }) {
  return (
    <details className="evidence">
      <summary>
        <ShieldCheck size={17} /> Bron, berekening & aandachtspunten{" "}
        {count && <span>{count} toelichtingen</span>}
      </summary>
      <div>
        <p>
          Bron: aangeleverde screenshots van Nexus Reporting Services. Bronsync:
          22 oktober 2026, 12:38:17. Bedragen in SRD, tenzij anders vermeld.
        </p>
        {children}
        <p>
          Deze versie bevat een vaste selectie van zichtbare gegevens.
          Niet-zichtbare regels en onderliggende SAP-documenten zijn niet
          beschikbaar zonder databron.
        </p>
      </div>
    </details>
  );
}
export function Ranked({ title, sub, items, go, unit = "SRD", note }) {
  return (
    <Panel
      title={title}
      sub={sub}
      action={
        go && (
          <button className="text-button" onClick={go}>
            Bekijk rapport <ArrowRight />
          </button>
        )
      }
    >
      <div className="ranked">
        {items.map(([label, value], i) => (
          <div className="rank-row" key={label}>
            <span className="rank-no">{String(i + 1).padStart(2, "0")}</span>
            <div className="rank-info">
              <div>
                <span>{label}</span>
                <strong>
                  {fmt(value)} <small>{unit}</small>
                </strong>
              </div>
              <div className="track">
                <i
                  style={{
                    width: `${(Math.abs(value) / Math.max(...items.map((x) => Math.abs(x[1])))) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {note && (
        <details className="chart-caption">
          <summary>Broninformatie</summary>
          <p>{note}</p>
        </details>
      )}
    </Panel>
  );
}
export function exportCsv(title, columns, rows) {
  const esc = (x) =>
    '"' + String(x ?? "Niet beschikbaar").replaceAll('"', '""') + '"';
  const text =
    "\uFEFF" +
    [
      columns,
      ...rows.map((r) =>
        r.map((v) => (typeof v === "number" ? String(v).replace(".", ",") : v)),
      ),
    ]
      .map((row) => row.map(esc).join(";"))
      .join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([text], { type: "text/csv;charset=utf-8" }),
  );
  a.download = title + ".csv";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
export async function exportExcel(title, columns, rows) {
  const { default: ExcelJS } = await import("exceljs");
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Nexus Reporting Services";
  const sheet = workbook.addWorksheet("Rapport");
  sheet.addRow(columns);
  rows.forEach((r) => sheet.addRow(r));
  sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  sheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF087F86" },
  };
  sheet.columns.forEach((col, i) => {
    col.width = i === 0 ? 32 : 24;
    col.numFmt = "#,##0.00;[Red]-#,##0.00";
  });
  sheet.views = [{ state: "frozen", ySplit: 1 }];
  sheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: rows.length + 1, column: columns.length },
  };
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([await workbook.xlsx.writeBuffer()], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
  );
  a.download = title + ".xlsx";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
export function Export({ title, columns = [], rows = [] }) {
  return (
    <div className="export-actions">
      <Action icon={<Printer />} onClick={() => window.print()}>
        PDF / afdrukken
      </Action>
      <Action
        icon={<Download />}
        onClick={() => exportExcel(title, columns, rows)}
      >
        Excel
      </Action>
    </div>
  );
}
export function FilterBar({ id, onPeriod, period, children, columns, rows }) {
  const fixed = [
    "age",
    "turnover",
    "goods",
    "capital",
    "debtors",
    "creditors",
    "reconciliation",
  ].includes(id);
  const initial = {
    from: ["age", "debtors", "creditors"].includes(id)
      ? "2026-10-22"
      : fixed
        ? "2026-01-01"
        : "2025-01-01",
    to: fixed
      ? "2026-10-22"
      : id === "dashboard" || id === "abc"
        ? "2025-12-31"
        : "2025-01-31",
  };
  const [draft, setDraft] = useState(initial);
  useEffect(() => {
    if (period === null) setDraft(initial);
  }, [period]);
  return (
    <form
      className="filter-bar"
      onSubmit={(e) => {
        e.preventDefault();
        onPeriod(draft);
      }}
    >
      <div className="filters">
        <label>
          {["debtors", "creditors", "age"].includes(id) ? "Peildatum" : "Vanaf"}
          <input
            required
            aria-label="Vanaf"
            type="date"
            value={draft.from}
            onChange={(e) => setDraft({ ...draft, from: e.target.value })}
          />
        </label>
        {!["debtors", "creditors", "age"].includes(id) && (
          <label>
            Tot en met
            <input
              required
              type="date"
              min={draft.from}
              value={draft.to}
              onChange={(e) => setDraft({ ...draft, to: e.target.value })}
            />
          </label>
        )}
        {children}
        <Action primary type="submit" icon={<ArrowsClockwise />}>
          Toepassen
        </Action>
      </div>
      <Export title={id} columns={columns} rows={rows} />
    </form>
  );
}
export function Select({ label, options = ["Alle"], value, onChange }) {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((x) => (
          <option key={x}>{x}</option>
        ))}
      </select>
    </label>
  );
}
export function DataTable({
  title,
  sub,
  columns,
  rows,
  detail = true,
  footer,
  formatDigits = 2,
  tools,
  empty = "Geen resultaten. Pas je zoekopdracht of filters aan.",
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(null);
  const [sortDir, setSortDir] = useState(1);
  const dialog = useRef(null);
  let visible = rows.filter((r) =>
    r.some((v) =>
      String(v ?? "")
        .toLowerCase()
        .includes(query.toLowerCase()),
    ),
  );
  if (sort !== null)
    visible = [...visible].sort(
      (a, b) =>
        (typeof a[sort] === "number"
          ? a[sort] - b[sort]
          : String(a[sort]).localeCompare(String(b[sort]), "nl")) * sortDir,
    );
  const pageSize = 10;
  const pages = Math.max(1, Math.ceil(visible.length / pageSize));
  const safePage = Math.min(page, pages - 1);
  useEffect(() => {
    setPage(0);
  }, [query, rows]);
  useEffect(() => {
    if (row) dialog.current?.showModal();
  }, [row]);
  return (
    <Panel
      title={title}
      sub={sub}
      action={<span className="count">{rows.length} zichtbare regels</span>}
    >
      <div className="table-tools">
        <div className="search">
          <MagnifyingGlass size={18} />
          <input
            type="search"
            aria-label={"Zoeken in " + title}
            placeholder="Zoek op naam, code of omschrijving…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {tools}
        <Action
          icon={<Download />}
          onClick={() => exportCsv(title, columns, visible)}
        >
          Exporteer selectie
        </Action>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {columns.map((c, i) => (
                <th
                  key={c}
                  className={typeof rows[0]?.[i] === "number" ? "numeric" : ""}
                >
                  <button
                    onClick={() => {
                      setSort(i);
                      setSortDir(sort === i ? -sortDir : 1);
                    }}
                  >
                    {c}{" "}
                    {sort === i ? (
                      sortDir === 1 ? (
                        <ArrowUp size={12} />
                      ) : (
                        <ArrowDown size={12} />
                      )
                    ) : null}
                  </button>
                </th>
              ))}
              {detail && (
                <th>
                  <span className="sr-only">Details</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {visible
              .slice(safePage * pageSize, (safePage + 1) * pageSize)
              .map((r, i) => (
                <tr key={i}>
                  {r.map((v, j) => (
                    <td
                      className={
                        (typeof v === "number" ? "numeric " : "") +
                        (typeof v === "number" && v < 0 ? "negative" : "")
                      }
                      key={j}
                    >
                      {fmt(
                        v,
                        /Posten|dagen|onbekend|Verschil met bronstand|Vraagvariatie|maandvraag|Voorraad$|Uitgiften/.test(
                          columns[j],
                        )
                          ? /Vraagvariatie|maandvraag/.test(columns[j])
                            ? 6
                            : 0
                          : formatDigits,
                      )}
                    </td>
                  ))}
                  {detail && (
                    <td>
                      <button
                        className="detail-button"
                        aria-label={"Details van " + r[0]}
                        onClick={() => setRow(r)}
                      >
                        Details <CaretRight size={14} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            {!visible.length && (
              <tr>
                <td colSpan={columns.length + 1}>
                  <div className="empty">
                    <MagnifyingGlass size={28} />
                    <strong>Geen resultaten</strong>
                    <p>{empty}</p>
                    <button
                      className="text-button"
                      onClick={() => setQuery("")}
                    >
                      Wis zoekopdracht
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <span>
          {visible.length
            ? `${safePage * pageSize + 1}–${Math.min((safePage + 1) * pageSize, visible.length)} van ${visible.length}`
            : "0"}{" "}
          regels{" "}
          <span className="muted">
            · {footer || "Selectie uit de screenshots"}
          </span>
        </span>
        <div>
          <Action
            aria-label="Vorige pagina"
            disabled={safePage === 0}
            onClick={() => setPage(safePage - 1)}
          >
            Vorige
          </Action>
          <span>
            {safePage + 1} / {pages}
          </span>
          <Action
            disabled={safePage >= pages - 1}
            onClick={() => setPage(safePage + 1)}
          >
            Volgende <CaretRight />
          </Action>
        </div>
      </div>
      <dialog
        ref={dialog}
        onCancel={() => setRow(null)}
        onClick={(e) => {
          if (e.target === dialog.current) {
            dialog.current.close();
            setRow(null);
          }
        }}
      >
        <div className="dialog-head">
          <div>
            <span className="eyebrow">REGELDETAILS</span>
            <h2>{row?.[1] || row?.[0]}</h2>
          </div>
          <button
            aria-label="Sluiten"
            className="icon-button"
            onClick={() => {
              dialog.current.close();
              setRow(null);
            }}
          >
            <X size={22} />
          </button>
        </div>
        <dl>
          {row &&
            columns.map((c, i) => (
              <React.Fragment key={c}>
                <dt>{c}</dt>
                <dd>{fmt(row[i], formatDigits)}</dd>
              </React.Fragment>
            ))}
        </dl>
        <Notice title="Onderliggende documenten">
          SAP-boekingen en brondocumenten zijn niet meegeleverd. De zichtbare
          regelgegevens staan hierboven.
        </Notice>
      </dialog>
    </Panel>
  );
}
export function Chart({
  title,
  sub,
  data,
  keys = ["value"],
  labels = ["Bedrag"],
  bar = false,
  approx = false,
  total,
  go,
}) {
  const [mode, setMode] = useState(bar ? "bar" : "line");
  return (
    <Panel
      title={title}
      sub={sub}
      action={
        <div className="segmented">
          {[
            ["line", ChartLine, "Lijngrafiek"],
            ["bar", ChartBar, "Staafgrafiek"],
            ["table", TableIcon, "Tabel"],
          ].map(([v, Icon, label]) => (
            <button
              key={v}
              aria-label={label}
              aria-pressed={mode === v}
              className={mode === v ? "active" : ""}
              onClick={() => setMode(v)}
            >
              <Icon size={17} />
            </button>
          ))}
        </div>
      }
    >
      {total !== undefined && (
        <div className="chart-total">
          {fmt(total)} <small>SRD</small>
        </div>
      )}
      {mode === "table" ? (
        <div className="chart-data">
          <table>
            <thead>
              <tr>
                <th>Periode</th>
                {labels.map((l) => (
                  <th key={l}>{l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  {keys.map((k) => (
                    <td key={k}>{fmt(r[k])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="chart">
          <ResponsiveContainer width="100%" height="100%">
            {mode === "bar" ? (
              <BarChart
                data={data}
                margin={{ top: 16, right: 8, bottom: 0, left: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#e8edf0"
                  strokeDasharray="3 5"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#5b707d" }}
                />
                <YAxis
                  width={48}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) =>
                    Math.abs(v) >= 1e6 ? (v / 1e6).toFixed(0) + " mln" : v
                  }
                  tick={{ fontSize: 11, fill: "#5b707d" }}
                />
                <Tooltip
                  formatter={(v, i) => [fmt(v), labels[keys.indexOf(i)] || i]}
                  contentStyle={{
                    borderRadius: 6,
                    border: "1px solid #dce4e9",
                  }}
                />
                <ReferenceLine y={0} stroke="#d3dce1" />
                {keys.map((k, i) => (
                  <Bar
                    isAnimationActive={false}
                    key={k}
                    dataKey={k}
                    fill={i ? "#b8c3f0" : "#00a9a0"}
                    radius={[3, 3, 0, 0]}
                    maxBarSize={26}
                  />
                ))}
              </BarChart>
            ) : (
              <AreaChart
                data={data}
                margin={{ top: 16, right: 12, bottom: 0, left: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#e8edf0"
                  strokeDasharray="3 5"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#5b707d" }}
                />
                <YAxis
                  width={48}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) =>
                    Math.abs(v) >= 1e6 ? (v / 1e6).toFixed(0) + " mln" : v
                  }
                  tick={{ fontSize: 11, fill: "#5b707d" }}
                />
                <Tooltip
                  formatter={(v, i) => [fmt(v), labels[keys.indexOf(i)] || i]}
                />
                {keys.map((k, i) => (
                  <Area
                    isAnimationActive={false}
                    key={k}
                    dataKey={k}
                    stroke={i ? "#5868db" : "#00a9a0"}
                    type="monotone"
                    fill={i ? "#5868db10" : "#00a9a018"}
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 5 }}
                    strokeDasharray={i ? "5 4" : undefined}
                  />
                ))}
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
      <div className="chart-foot">
        <div className="legend">
          {labels.map((l, i) => (
            <span key={l}>
              <i style={{ background: i ? "#bc8a35" : "#087f86" }} />
              {l}
            </span>
          ))}
        </div>
        {go && (
          <button className="text-button" onClick={go}>
            Bekijk rapport <ArrowRight />
          </button>
        )}
      </div>
      {approx && (
        <details className="chart-caption">
          <summary>Indicatieve grafiek</summary>
          <p>
            Visuele reconstructie uit de screenshot. Grafiekpunten zijn
            indicatief; getoonde totalen zijn overgenomen.
          </p>
        </details>
      )}
    </Panel>
  );
}
