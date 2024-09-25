import { Builder, By, until } from "selenium-webdriver";
import answers from "$/assets/answers.json" assert { type: "json" };
import { assert } from "chai";
import { Select } from "selenium-webdriver";
const TEST_LEN = Object.keys(answers).length;

describe("Essentials PA Tests", function () {
  it("test for passing", async function () {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().setTimeouts({ implicit: 500 });
    try {
      await driver.get("https://localhost:5173");
      // RUN TEST HERE
      let scoreCheck = 0.5;
      const results = await runTest(driver, scoreCheck);

      // await pause(driver).catch((e) => {
      //   console.log(e);
      // });
      let expected =
        Math.round((Math.round(TEST_LEN * scoreCheck) / TEST_LEN) * 10000) /
        100;
      console.log(results);
      assert.equal(results, expected);
      console.log("TEST PASSED");
    } finally {
      //close the browser
      await driver.quit();
    }
  });
});

async function runTest(driver, score) {
  await driver.findElement(By.css("button#landing_next")).click();
  await driver.findElement(By.css("button#landing_start")).click();
  const checkpoint = Math.round(TEST_LEN * score);
  const actions = driver.actions({ async: true });

  let index = 0;
  let running = true;
  while (running) {
    let idElem;
    await driver
      .wait(until.elementLocated(By.css("[data-id]")), 500)
      .then(async () => {
        running =
          (await driver.findElements(By.css("button#assessment_header_submit")))
            .length == 0;
        idElem = await driver.findElement(By.css("[data-id]"));
        let id = await idElem.getAttribute("data-id");

        switch (answers[id].type) {
          case "click":
            if (checkpoint > index) {
              const answer = '[data-name="' + answers[id].key + '"]';
              await driver.findElement(By.css(answer)).click();
            }
            break;
          case "input":
            if (checkpoint > index) {
              const answer = '[data-name="' + answers[id].key + '"]';
              await driver
                .findElement(By.css(answer))
                .sendKeys(answers[id].value);
            }
            break;
          case "choice":
            if (checkpoint > index) {
              const answer = "#" + answers[id].key;
              await driver.findElement(By.css(answer)).click();
            } else {
              const answerIndex = Number(answers[id].key.slice(-1));

              let selectInput;
              if (answerIndex > 0) {
                selectInput = 0;
              } else if (answerIndex == 0) {
                selectInput = 1;
              }

              let css = "#" + id + "_" + selectInput;
              // console.log(css);
              await driver.findElement(By.css(css)).click();
            }
            break;
          case "check":
            if (checkpoint > index) {
              for (const i of await driver.findElements(By.css("input"))) {
                if (answers[id].key.includes(await i.getAttribute("id"))) {
                  await i.click();
                }
              }
            } else {
              for (const i of await driver.findElements(By.css("input"))) {
                if (answers[id].key.includes(await i.getAttribute("id"))) {
                  await i.click();
                  await i.click();
                } else {
                  await i.click();
                }
              }
            }
            break;
          case "matching dropdown":
            if (checkpoint > index) {
              const selectElems = await driver.findElements(By.css("select"));
              for (const s of selectElems) {
                const select = await new Select(s);
                await select.selectByVisibleText(
                  answers[id].key[await s.getAttribute("name")],
                );
              }
            } else {
              const selectElems = await driver.findElements(By.css("select"));
              for (const s of selectElems) {
                const select = await new Select(s);
                await select.selectByIndex(0);
              }
            }
            break;
          case "matching drag":
            if (checkpoint > index) {
              let md_drags = await driver.findElements(By.css("[draggable]"));
              for (const a of md_drags) {
                let drag_text = await a.getText();
                let md_drop = await driver.findElement(
                  By.id(answers[id].key[drag_text]),
                );

                await actions
                  .dragAndDrop(a, md_drop)
                  .perform()
                  .catch((e) => {
                    console.log(e);
                  });
              }
            } else {
              let i_drag = await driver.findElement(
                By.css('[data-name="drag"]'),
              );
              let i_drop = await driver.findElement(
                By.css('[data-name="drop"]'),
              );

              await actions
                .dragAndDrop(i_drag, i_drop)
                .perform()
                .catch((e) => {
                  console.log(e);
                });
            }
            await actions.clear();
            break;
          case "sequence":
            let drops = await driver.findElements(By.css("[data-drop-id]"));
            if (checkpoint > index) {
              for (const drop of drops) {
                const index = Number(await drop.getAttribute("data-drop-id"));
                const drag = await driver.findElement(
                  By.id(answers[id].key[index]),
                );
                await actions
                  .dragAndDrop(drag, drop)
                  .perform()
                  .catch((e) => {
                    console.log(e);
                  });
              }
            } else {
              const wDrop = await drops[0];
              const wDrag = await driver.findElement(By.id(answers[id].key[1]));
              await actions
                .dragAndDrop(wDrag, wDrop)
                .perform()
                .catch((e) => {
                  console.log(e);
                });
            }

            await actions.clear();
            break;
        }

        if (running) {
          await driver
            .findElement(By.css("button#assessment_nav_next"))
            .click();
          index++;
          await driver.wait(until.stalenessOf(idElem), 500);
        } else {
          while (
            (
              await driver.findElements(
                By.css("button#assessment_header_submit"),
              )
            ).length > 0
          ) {
            await driver
              .findElement(By.css("button#assessment_header_submit"))
              .click();
          }
        }
      })
      .catch(async () => {
        await driver.findElement(By.css("button#assessment_nav_next")).click();
      });
  }
  let results = (await driver.findElement(By.css("#results"))).getText();
  await driver.findElement(By.css("button#app_exit"));
  return results;
}

async function pause(driver) {
  let runSCOLoc = By.css("div.q-list label:nth-child(1)");
  await driver.wait(until.elementLocated(runSCOLoc), 100000);
}
