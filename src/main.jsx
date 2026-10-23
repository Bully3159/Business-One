import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import {
  SquaresFour,
  ChartBar,
  TrendUp,
  ShoppingCart,
  Package,
  Buildings,
  SlidersHorizontal,
  CaretDown,
  CaretRight,
  ArrowRight,
  ArrowUpRight,
  SidebarSimple,
  ShieldCheck,
  SignOut,
  User,
  Clock,
  CalendarBlank,
  Database,
  Info,
  X,
  ArrowLeft,
} from "@phosphor-icons/react";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-sans/latin-700.css";
import "./style.css";
import "./modern.css";
import { reports } from "./data";
import { Action, FilterBar, Select, Source, Notice, fmt } from "./components";
import {
  Dashboard,
  AgingPage,
  GoodsPage,
  FinancePage,
  AnalysisPage,
  AbcPage,
  StockPage,
  Comparison,
  Capital,
  Account,
  pageDataset,
} from "./pages";
const icons = {
  Overzicht: SquaresFour,
  Finance: ChartBar,
  Sales: TrendUp,
  Purchase: ShoppingCart,
  Inventory: Package,
  Management: Buildings,
  Beheer: SlidersHorizontal,
};
const theme = {
  ...webLightTheme,
  fontFamilyBase: '"IBM Plex Sans",sans-serif',
  colorBrandBackground: "#087f86",
  colorBrandBackgroundHover: "#066b71",
  colorBrandBackgroundPressed: "#055a60",
  colorBrandForeground1: "#087f86",
  colorBrandForeground2: "#066b71",
  colorBrandStroke1: "#087f86",
  colorNeutralStrokeAccessible: "#bac8d0",
  borderRadiusMedium: "6px",
};
function readRoute() {
  return reports.some((r) => r.id === location.hash.slice(1))
    ? location.hash.slice(1)
    : "dashboard";
}
function Logo() {
  return (
    <div className="brand">
      <div className="wordmark">
        NE<span>X</span>US
      </div>
      <strong>Nexus Reporting Services</strong>
      <small>REPORTING PORTAL</small>
    </div>
  );
}
function App() {
  const [id, setId] = useState(readRoute);
  const [mobile, setMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [groups, setGroups] = useState(["Finance"]);
  const [period, setPeriod] = useState(null);
  const [login, setLogin] = useState(false);
  const page = reports.find((r) => r.id === id);
  const [cols, rows] = pageDataset(id);
  useEffect(() => {
    const onHash = () => {
      setId(readRoute());
      setPeriod(null);
      setMobile(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    setGroups(page.group === "Overzicht" ? ["Finance"] : [page.group]);
    document.querySelector("nav")?.scrollTo(0, 0);
    document.title = `${page.title} | Nexus Reporting`;
  }, [id]);
  function go(next) {
    if (next === id) {
      setMobile(false);
      return;
    }
    location.hash = next;
  }
  const sourceStart = ["age", "debtors", "creditors"].includes(id)
    ? "2026-10-22"
    : [
          "turnover",
          "goods",
          "capital",
          "debtors",
          "creditors",
          "reconciliation",
        ].includes(id)
      ? "2026-01-01"
      : "2025-01-01";
  const sourceEnd = sourceStart.startsWith("2026")
    ? "2026-10-22"
    : ["dashboard", "abc"].includes(id)
      ? "2025-12-31"
      : "2025-01-31";
  const changed =
    period && (period.from !== sourceStart || period.to !== sourceEnd);
  if (login)
    return (
      <FluentProvider theme={theme}>
        <div className="login-page">
          <div className="login-story">
            <Logo />
            <div>
              <span className="eyebrow">NEXUS REPORTING SERVICES</span>
              <h1>
                Inzicht dat
                <br />
                richting geeft.
              </h1>
              <p>
                Finance, verkoop, inkoop en voorraad.
                <br />
                Eén heldere blik op je organisatie.
              </p>
            </div>
            <span>
              <ShieldCheck /> SAP Business One · Alleen-lezen rapportages
            </span>
          </div>
          <div className="login-form">
            <Logo />
            <div>
              <span className="badge">ONTWERPVOORBEELD</span>
              <h1>Welkom terug.</h1>
              <p>Verken de vernieuwde rapportagewerkplek.</p>
              <Notice title="Geen live aanmelding">
                Dit is een interactief ontwerp met gegevens uit de screenshots.
                Je hoeft geen inloggegevens in te voeren.
              </Notice>
              <Action primary onClick={() => setLogin(false)}>
                Open de werkplek <ArrowRight />
              </Action>
              <p className="login-help">
                Wachtwoord vergeten? Neem contact op met je beheerder.
              </p>
            </div>
          </div>
        </div>
      </FluentProvider>
    );
  return (
    <FluentProvider theme={theme}>
      <a className="skip" href="#main">
        Ga naar inhoud
      </a>
      <div
        className={
          "app " +
          (collapsed ? "nav-collapsed " : "") +
          (mobile ? "nav-open" : "")
        }
      >
        <aside className="sidebar">
          <button
            className="brand-button"
            aria-label="Naar dashboard"
            onClick={() => go("dashboard")}
          >
            <Logo />
          </button>
          <div className="workspace-label">
            <span className="workspace-symbol">N</span>
            <div>
              <strong>Nexus Reporting Services</strong>
              <small>Rapportagewerkplek</small>
            </div>
            <CaretDown size={15} />
          </div>
          <nav aria-label="Hoofdnavigatie">
            <button
              className={"nav-overview " + (id === "dashboard" ? "active" : "")}
              onClick={() => go("dashboard")}
            >
              <SquaresFour size={20} />
              <span>Dashboard</span>
              <span className="nav-shortcut">01</span>
            </button>
            <span className="nav-caption">RAPPORTMODULES</span>
            {[
              "Finance",
              "Sales",
              "Purchase",
              "Inventory",
              "Management",
              "Beheer",
            ].map((group) => {
              const Icon = icons[group],
                expanded = groups.includes(group);
              return (
                <div className="nav-group" key={group}>
                  <button
                    className={
                      "nav-group-toggle " +
                      (page.group === group ? "current" : "")
                    }
                    aria-expanded={expanded}
                    onClick={() => {
                      if (collapsed) setCollapsed(false);
                      setGroups((g) =>
                        g.includes(group)
                          ? g.filter((v) => v !== group)
                          : [...g, group],
                      );
                    }}
                  >
                    <Icon size={20} />
                    <span>{group}</span>
                    <span className="nav-count">
                      {reports.filter((r) => r.group === group).length}
                    </span>
                    {expanded ? (
                      <CaretDown size={13} />
                    ) : (
                      <CaretRight size={13} />
                    )}
                  </button>
                  {expanded && (
                    <div className="nav-children">
                      {reports
                        .filter((r) => r.group === group)
                        .map((r) => (
                          <button
                            key={r.id}
                            aria-current={id === r.id ? "page" : undefined}
                            className={id === r.id ? "active" : ""}
                            onClick={() => go(r.id)}
                          >
                            {r.nav || r.title}
                            {id === r.id && <span />}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <div className="sidebar-bottom">
            <ShieldCheck size={20} />
            <div>
              <strong>SAP Business One</strong>
              <span>Alleen-lezen rapportages</span>
            </div>
            <span className="connection-dot" />
          </div>
        </aside>
        {mobile && (
          <button
            className="nav-scrim"
            aria-label="Menu sluiten"
            onClick={() => setMobile(false)}
          />
        )}
        <div className="workspace">
          <header className="topbar">
            <button
              className="icon-button toggle-nav"
              aria-label="Navigatie in- of uitklappen"
              onClick={() => {
                if (innerWidth < 768) setMobile(!mobile);
                else setCollapsed(!collapsed);
              }}
            >
              <SidebarSimple size={21} />
            </button>
            <div className="breadcrumb">
              <span>Werkplek</span>
              <CaretRight size={13} />
              <strong>
                {page.group === "Overzicht" ? "Dashboard" : page.group}
              </strong>
            </div>
            <div className="topbar-right">
              <span className="demo-tag">SCREENSHOTGEGEVENS</span>
              <button
                className="user-button"
                onClick={() => go("account")}
                aria-label="Mijn account"
              >
                <span className="avatar">PA</span>
                <span>
                  <strong>Patricio</strong>
                  <small>Finance</small>
                </span>
                <CaretDown size={13} />
              </button>
              <button
                className="icon-button"
                aria-label="Afmelden uit ontwerpvoorbeeld"
                title="Afmelden uit ontwerpvoorbeeld"
                onClick={() => setLogin(true)}
              >
                <SignOut size={20} />
              </button>
            </div>
          </header>
          <main id="main" tabIndex={-1}>
            <div className="page-heading">
              <div>
                <div className="eyebrow">
                  {page.group === "Overzicht"
                    ? "RAPPORTAGEWERKPLEK"
                    : page.group.toUpperCase()}
                  <span>/</span>NEXUS REPORTING
                </div>
                <h1>{page.title}</h1>
                <details className="page-context">
                  <summary>
                    Over dit rapport <Info size={13} />
                  </summary>
                  <p>{page.description}</p>
                </details>
              </div>
              <div className="administration">
                <span className="admin-icon">
                  <Buildings size={22} />
                </span>
                <label>
                  Administratie
                  <select aria-label="Administratie">
                    <option>Nexus Reporting Services</option>
                  </select>
                </label>
                <span className="currency">SRD</span>
              </div>
            </div>
            <div className="snapshot-note">
              <span className="prototype-dot" />
              <span>Interactief voorbeeld</span>
              <details>
                <summary>
                  Gegevens <Info size={12} />
                </summary>
                <p>
                  Ontwerp op basis van je screenshots. Geen live SAP-verbinding.
                  Grafiekpunten zijn indicatief; tabelbedragen zijn overgenomen.
                </p>
              </details>
            </div>
            {id !== "account" && (
              <>
                <Source />
                <FilterBar
                  key={id}
                  id={id}
                  period={period}
                  onPeriod={setPeriod}
                  columns={cols}
                  rows={rows}
                >
                  {["debtors", "creditors"].includes(id) && (
                    <Select label="Ouderdom vanaf" options={["Vervaldatum"]} />
                  )}
                  <span className="period-label">
                    <CalendarBlank size={15} />
                    {sourceStart.startsWith("2026")
                      ? "Peildatum 22 okt. 2026"
                      : id === "dashboard" || id === "abc"
                        ? "Boekjaar 2025"
                        : "Januari 2025"}
                  </span>
                </FilterBar>
              </>
            )}
            {changed ? (
              <div className="no-period">
                <CalendarBlank size={40} />
                <h2>Geen brongegevens voor deze periode</h2>
                <p>
                  De screenshots bevatten gegevens voor {sourceStart} tot{" "}
                  {sourceEnd}. Voor een andere periode is een live databron
                  nodig.
                </p>
                <Action primary onClick={() => setPeriod(null)}>
                  Toon beschikbare periode
                </Action>
              </div>
            ) : (
              <div className="page-content" key={id}>
                {id === "dashboard" ? (
                  <Dashboard go={go} />
                ) : ["debtors", "creditors"].includes(id) ? (
                  <AgingPage credit={id === "creditors"} />
                ) : ["reconciliation", "goods"].includes(id) ? (
                  <GoodsPage />
                ) : ["profit", "trial", "balance"].includes(id) ? (
                  <FinancePage id={id} go={go} />
                ) : ["sales", "purchase", "inventory"].includes(id) ? (
                  <AnalysisPage id={id} />
                ) : id === "abc" ? (
                  <AbcPage />
                ) : ["age", "turnover"].includes(id) ? (
                  <StockPage turnover={id === "turnover"} />
                ) : id === "comparison" ? (
                  <Comparison go={go} />
                ) : id === "capital" ? (
                  <Capital go={go} />
                ) : (
                  <Account go={go} />
                )}
              </div>
            )}
            <footer className="page-footer" id="source-info">
              <span>
                <ShieldCheck size={14} /> Nexus Reporting Services · SAP
                Business One · Alleen-lezen
              </span>
              <span>Bronmoment 22 okt. 2026 · 12:38:17</span>
            </footer>
          </main>
        </div>
      </div>
    </FluentProvider>
  );
}
createRoot(document.getElementById("root")).render(<App />);
