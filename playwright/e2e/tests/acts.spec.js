import { test, expect } from "../fixtures/scorm.ts";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import { ScoPage } from "../poms/sco-page.ts";
import logs from "../utils/logs.json" with { type: "json" };

const timestamp = dayjs().format("YYYY_MM_DD_HHmm");
const __dirname = import.meta.dirname;

logs[timestamp] = {};

test.beforeEach(async ({ page }, testInfo) => {
  testInfo.setTimeout(5000_000);

  await page.goto("https://acts.dldart.org/#/");
  await page
    .getByLabel("Select the PIF file to upload")
    .setInputFiles(path.join(__dirname, "../utils/sco.zip"));
  await page.getByRole("button", { name: "Begin Test" }).click();
  await page
    .locator("label")
    .filter({ hasText: "Assessment Quiz, pretest," })
    .click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page
    .locator("label")
    .filter({ hasText: "Run the SCO Runtime" })
    .click();
});

test("test pass", async ({ page }) => {
  const score = 0.81;

  const pagePromise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Launch SCO" }).click();

  const testPage = new ScoPage(await pagePromise);
  const length = await testPage.getLength();

  await testPage.start();
  await testPage.setCheckpoint(score);

  const results = await runTest(testPage);

  await testPage.exit();
  await page.getByRole("button", { name: "Complete Test" }).click();

  logs[timestamp].pass = {
    summary:
      "https://acts.dldart.org" +
      (await page
        .getByRole("link", { name: "View the test summary" })
        .getAttribute("href")),
    download:
      "https://acts.dldart.org" +
      (await page
        .getByRole("link", { name: "Download all logs of this test" })
        .getAttribute("href")),
  };

  await expect(results).toEqual(
    "Score: " +
      Math.round((Math.round(length * score) / length) * 10000) / 100 +
      "%",
  );
});

test("test fail", async ({ page }) => {
  const score = 0.5;

  const pagePromise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Launch SCO" }).click();

  const testPage = new ScoPage(await pagePromise);
  const length = await testPage.getLength();

  await testPage.start();
  await testPage.setCheckpoint(score);

  const results = await runTest(testPage);

  await testPage.exit();
  await page.getByRole("button", { name: "Complete Test" }).click();

  logs[timestamp].fail = {
    summary:
      "https://acts.dldart.org" +
      (await page
        .getByRole("link", { name: "View the test summary" })
        .getAttribute("href")),
    download:
      "https://acts.dldart.org" +
      (await page
        .getByRole("link", { name: "Download all logs of this test" })
        .getAttribute("href")),
  };

  await expect(results).toEqual(
    "Score: " +
      Math.round((Math.round(length * score) / length) * 10000) / 100 +
      "%",
  );
});

test.afterAll(() => {
  fs.writeFileSync(
    path.join(__dirname, "../utils/logs.json"),
    JSON.stringify(logs, null, 2),
  );
});

async function runTest(page) {
  // await expect(testPage).isAnswered();
  const checkpoint = await page.getCheckpoint();
  const length = await page.getLength();
  let index = 0;
  while (index < length) {
    const curr = await page.getAid();
    if (curr != "content") {
      if (index < checkpoint) {
        await page.answerCorrect();
      } else {
        await page.answerIncorrect();
      }

      index = await nav(index, page);
    } else {
      await page.next();
      await expect(await page.getIdElem()).toHaveCount(1);
    }
  }
  return await page.results();
}

async function nav(index, page) {
  const aid = await page.getAid();
  const length = await page.getLength();
  if (index < length - 1) {
    await page.next();
    await expect(await page.getIdElem()).toHaveCount(1);

    try {
      await expect(page).isAnswered();
    } catch (e) {
      e.message += "\n\tCaught at " + index + ": " + aid;
    }

    return index + 1;
  } else {
    await page.submit();
    await expect(page).isAnswered();
  }
}
