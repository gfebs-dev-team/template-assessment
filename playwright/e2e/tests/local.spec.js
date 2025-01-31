import { expect } from "../fixtures/scorm.ts";
import { ScoPage } from "../poms/sco-page.ts";
import { test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({ page }, testInfo) => {
  testInfo.setTimeout(5000_000);
  //Call 'npm run preview first'
  await page.goto("http://localhost:4173");
});

test("testing all correct", async ({ page }) => {
  const score = 1;
  const sco = new ScoPage(page);
  const length = await sco.getLength();

  await sco.start();
  await sco.setCheckpoint(score);

  const results = await runTest(sco);

  await expect(results).toEqual(
    "Score: " +
      Math.round((Math.round(length * score) / length) * 10000) / 100 +
      "%",
  );
});

test("testing all incorrect", async ({ page }) => {
  const score = 0;
  const sco = new ScoPage(page);
  const length = await sco.getLength();

  await sco.start();
  await sco.setCheckpoint(score);

  const results = await runTest(sco);

  await expect(results).toEqual(
    "Score: " +
      Math.round((Math.round(length * score) / length) * 10000) / 100 +
      "%",
  );
});

test("testing pass", async ({ page }) => {
  const score = 0.81;
  const sco = new ScoPage(page);
  const length = await sco.getLength();

  await sco.start();
  await sco.setCheckpoint(score);
  console.log(await sco.getCheckpoint());

  const results = await runTest(sco);

  await expect(results).toEqual(
    "Score: " +
      Math.round((Math.round(length * score) / length) * 10000) / 100 +
      "%",
  );
});

test("testing fail", async ({ page }) => {
  const score = 0.5;
  const sco = new ScoPage(page);
  const length = await sco.getLength();

  await sco.start();
  await sco.setCheckpoint(score);
  console.log(await sco.getCheckpoint());

  const results = await runTest(sco);

  await expect(results).toEqual(
    "Score: " +
      Math.round((Math.round(length * score) / length) * 10000) / 100 +
      "%",
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
