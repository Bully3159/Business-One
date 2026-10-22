const { chromium } = require("@playwright/test");
const assert = require("assert");
(async () => {
  const b = await chromium.launch({
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {}),
    headless: true,
    args: ["--no-sandbox"],
  });
  const p = await b.newPage({
    viewport: { width: 1440, height: 1000 },
    acceptDownloads: true,
  });
  let errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto("http://localhost:5173");
  for (const id of [
    "dashboard",
    "balance",
    "profit",
    "trial",
    "debtors",
    "creditors",
    "reconciliation",
    "sales",
    "purchase",
    "inventory",
    "abc",
    "age",
    "turnover",
    "goods",
    "comparison",
    "capital",
    "account",
  ]) {
    await p.goto("http://localhost:5173/#" + id);
    await p.waitForTimeout(120);
    assert(await p.locator("h1").textContent());
    assert.equal(
      await p.locator("body").evaluate((e) => e.scrollWidth > innerWidth),
      false,
      "overflow " + id,
    );
    console.log("PASS route " + id);
  }
  await p.goto("http://localhost:5173/#debtors");
  const search = p.getByRole("searchbox");
  await search.fill("SHARK");
  assert.equal(await p.locator("tbody tr").count(), 1);
  assert((await p.locator("tbody").innerText()).includes("565.890,67"));
  await p.getByRole("button", { name: "Details van 300259" }).click();
  await p.locator("dialog").waitFor({ state: "visible" });
  assert((await p.locator("dialog").innerText()).includes("SHARK"));
  await p.keyboard.press("Escape");
  await search.fill("no-match-123");
  assert((await p.locator("tbody").innerText()).includes("Geen resultaten"));
  await p.getByRole("button", { name: "Wis zoekopdracht" }).click();
  await p.getByRole("button", { name: "Volgende", exact: true }).click();
  assert((await p.locator("tbody").innerText()).includes("197.346,63"));
  await p.getByRole("button", { name: "Vorige pagina", exact: true }).click();
  await p
    .getByRole("columnheader", { name: "Open bedrag" })
    .getByRole("button")
    .click();
  assert(
    (await p.locator("tbody tr").first().innerText()).includes("141.755,22"),
  );
  const excelDownload = p.waitForEvent("download");
  await p.getByRole("button", { name: "Excel", exact: true }).click();
  const excelFile = await excelDownload;
  assert(excelFile.suggestedFilename().endsWith(".xlsx"));
  const ExcelJS = require("exceljs");
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(await excelFile.path());
  assert.equal(workbook.worksheets[0].rowCount, 15);
  assert.equal(workbook.worksheets[0].getCell("C2").type, 2);
  console.log("PASS Excel workbook and numeric cells");
  const download = p.waitForEvent("download");
  await p.getByRole("button", { name: "Exporteer selectie" }).click();
  assert((await download).suggestedFilename().endsWith(".csv"));
  console.log("PASS search, empty, modal, pagination, sorting, CSV");
  await p.locator("input[type=date]").first().fill("2024-01-01");
  await p.getByRole("button", { name: "Toepassen", exact: true }).click();
  await p
    .getByRole("heading", { name: "Geen brongegevens voor deze periode" })
    .waitFor();
  await p.getByRole("button", { name: "Toon beschikbare periode" }).click();
  console.log("PASS unsupported period");
  await p.goto("http://localhost:5173/#abc");
  await p.getByRole("button", { name: /AX 23/ }).click();
  assert((await p.locator("tbody").innerText()).includes("DUX SODA"));
  await p.getByRole("button", { name: /BZ 48/ }).click();
  assert((await p.locator("tbody").innerText()).includes("Geen resultaten"));
  console.log("PASS ABC selection");
  await p.goto("http://localhost:5173/#dashboard");
  await p.getByRole("button", { name: "Tabel", exact: true }).first().click();
  assert.equal(await p.locator(".chart-data tbody tr").count(), 12);
  console.log("PASS chart table");
  for (const width of [320, 768, 1024, 1440]) {
    await p.setViewportSize({ width, height: 900 });
    for (const id of [
      "dashboard",
      "debtors",
      "abc",
      "goods",
      "capital",
      "account",
    ]) {
      await p.goto("http://localhost:5173/#" + id);
      await p.waitForTimeout(90);
      assert.equal(
        await p.locator("body").evaluate((e) => e.scrollWidth > innerWidth),
        false,
        "responsive overflow " + width + " " + id,
      );
    }
    console.log("PASS responsive " + width);
  }
  await p.setViewportSize({ width: 390, height: 844 });
  await p.goto("http://localhost:5173/#dashboard");
  await p.screenshot({ path: "docs/mobile.png", fullPage: true });
  await p.getByRole("button", { name: "Navigatie in- of uitklappen" }).click();
  await p.getByRole("button", { name: "Debiteurenaging", exact: true }).click();
  await p.getByRole("heading", {name: "Debiteurenaging", exact: true}).waitFor();
  await p.setViewportSize({ width: 1440, height: 1080 });
  await p.goto("http://localhost:5173/#debtors");
  await p.screenshot({ path: "docs/debtors.png", fullPage: true });
  await p.goto("http://localhost:5173/#dashboard");
  await p.waitForTimeout(200);
  await p.screenshot({ path: "docs/dashboard.png", fullPage: true });
  assert.deepEqual(errors, []);
  console.log("PASS mobile navigation; no runtime errors");
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
