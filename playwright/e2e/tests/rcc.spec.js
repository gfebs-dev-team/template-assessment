import { test, expect } from "../fixtures/scorm.ts";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import config from "../../../gfebs.config.js";
import { ScoPage } from "../poms/sco-page.ts";
import logs from "../utils/logs.json" with { type: "json" };

const courseData = config.data.course;
const timestamp = dayjs().format("YYYY_MM_DD_HHmm");
const __dirname = import.meta.dirname;

logs[timestamp] = {};

test.beforeEach(async ({ page }, testInfo) => {
  testInfo.setTimeout(5000_000);
  await page.goto("https://content.atis.army.mil/#/content/courses?f=1430");
  const folder =
    (courseData.courseCode ? courseData.courseCode + " " : "") +
    courseData.title;
  const course = courseData.title + " - " + courseData.topic;
  await page.getByText(folder).click();
  await page.getByText("View Content").click();
  await page.getByText(course).click();
});

test("testing fail", async ({ page }) => {
  const score = 0.5;

  await page.getByText("Version", { exact: true }).click();
  await page
    .locator("input#version-file-picker")
    .setInputFiles(path.join(__dirname, "../utils/sco.zip"));
  await page.getByRole("button", { name: "Import Course" }).click();

  const pagePromise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Test" }).click();

  const testPage = new ScoPage(await pagePromise);
  const length = await testPage.getLength();

  await testPage.start();
  await testPage.setCheckpoint(score);

  const results = await runTest(testPage);

  await testPage.exit();

  await expect(
    await page
      .frameLocator("#contentFrame")
      .getByText("You may now close this window."),
  ).toBeVisible({ timeout: 10000 });

  await page.getByRole("link", { name: "Debug Logs" }).click();
  await page.getByRole("button", { name: "Share" }).click();
  await page.getByRole("button", { name: "Copy Link" }).click();

  const handle = await page.evaluateHandle(() =>
    navigator.clipboard.readText(),
  );
  const clipboardContent = await handle.jsonValue();
  logs[timestamp].rccFailPath = clipboardContent;

  await expect(results).toEqual(
    "Score: " +
      Math.round((Math.round(length * score) / length) * 10000) / 100 +
      "%",
  );
});

test("testing pass", async ({ page }) => {
  const score = 0.81;
  await page
    .locator("#course-detail-panel-versions div")
    .filter({ hasText: "Versions" })
    .click();
  await page.locator(".table-versions .version-row .controls").first().click();

  const pagePromise = page.waitForEvent("popup");
  await page.getByRole("menuitem", { name: "Test" }).click();

  const testPage = new ScoPage(await pagePromise);
  const length = await testPage.getLength();

  await testPage.start();
  await testPage.setCheckpoint(score);

  const results = await runTest(testPage);

  await testPage.exit();

  await expect(
    await page
      .frameLocator("#contentFrame")
      .getByText("You may now close this window."),
  ).toBeVisible({ timeout: 10000 });

  await page.getByRole("link", { name: "Debug Logs" }).click();
  await page.getByRole("button", { name: "Share" }).click();
  await page.getByRole("button", { name: "Copy Link" }).click();

  const handle = await page.evaluateHandle(() =>
    navigator.clipboard.readText(),
  );
  const clipboardContent = await handle.jsonValue();
  logs[timestamp].rccPassPath = clipboardContent;

  await expect(results).toEqual(
    "Score: " +
      Math.round((Math.round(length * score) / length) * 10000) / 100 +
      "%",
  );
});

test.afterAll(async () => {
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
