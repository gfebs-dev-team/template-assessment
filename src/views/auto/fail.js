import { Builder, By, until } from "selenium-webdriver";
import answers from "./answers.json" assert { type: "json" };
import { assert } from "chai";
import * as path from "path";

describe("Run ACTS Testing", function () {
  it("Assessment - Passed", async function () {
    let driver = await new Builder().forBrowser("chrome").build();
    const actions = driver.actions({ async: false });
    try {
      //open the dev server
      const originalWindow = await driver.getWindowHandle();

      const scormPackage = path.resolve("./src/views/auto/test.zip");
      await driver.get("https://acts.dldart.org/#/");

      await driver
        .findElement(By.css("input[type='file']"))
        .sendKeys(scormPackage);

      await driver.findElement(By.css("button.q-btn")).click();

      let runSCOLoc = By.css("div.q-list label:nth-child(1)");

      await driver.wait(until.elementLocated(runSCOLoc), 5000);

      actions.pause(1000).perform();

      let runSCO = driver.findElement(runSCOLoc);

      actions.move({ origin: runSCO }).click().pause(1000).perform();

      let launchLoc = By.css(
        "#q-app > div > div > div > div > div.steps > div:nth-child(5) > div.border-wrap > div.step-content.q-pa-sm > div > p:nth-child(4) > button",
      );

      await driver.wait(until.elementLocated(launchLoc), 5000);

      let launch = driver.findElement(launchLoc);

      actions.move({ origin: launch }).click().pause(1000).perform();

      await driver.wait(
        async () => (await driver.getAllWindowHandles()).length === 2,
        10000,
      );

      const windows = await driver.getAllWindowHandles();
      windows.forEach(async (handle) => {
        if (handle !== originalWindow) {
          await driver.switchTo().window(handle);
        }
      });

      // RUN TEST HERE
      const results = runTest(driver, actions);
      // RUN TEST HERE

      await driver.switchTo().window(originalWindow);

      let completeLoc = By.css(
        "#q-app > div > div > div > div > div.steps > div:nth-child(5) > div.border-wrap > div.step-content.q-pa-sm > div > div > p:nth-child(2) > button.q-btn.q-btn-item.non-selectable.no-outline.q-btn--standard.q-btn--rectangle.bg-primary.text-white.q-btn--actionable.q-focusable.q-hoverable.q-btn--no-uppercase.float-right",
      );
      await driver.wait(until.elementLocated(completeLoc), 5000);

      let complete = driver.findElement(completeLoc);

      actions.move({ origin: complete }).click().pause(1000).perform();

      let downloadLoc = By.css('a[target="_self"]');
      await driver.wait(until.elementLocated(downloadLoc), 15000);

      let download = driver.findElement(downloadLoc);
      console.log(await download.getAttribute("href"));

      actions.pause(2000).perform();

      actions.move({ origin: download }).click().pause(2000).perform();

      //await driver.wait(until.elementIsNotVisible(runSCO));

      assert.equal(results, "Score: 50%");
      console.log("TEST PASSED");
    } finally {
      //close the browser
      await driver.quit();
    }
  });
});

function runTest(driver, actions) {}
