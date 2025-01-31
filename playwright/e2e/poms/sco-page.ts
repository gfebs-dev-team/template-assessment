import type { Page, Locator } from "@playwright/test";
import answers from "../utils/answers.json" with { type: "json" };

export class ScoPage {
  private sco: Page;
  private idElem: Locator;
  private checkpoint: number;

  public readonly testLen: number;
  public readonly disclaimer: Locator;
  public logs;

  constructor(public readonly page: Page) {
    this.sco = page;
    this.idElem = page.locator("#app > main > section > section[data-id]");
    this.testLen = Object.keys(answers).length;
    this.disclaimer = this.sco.getByText(
      "Note: All questions must be answered to receive credit. Assessments with unanswered questions will be marked as a fail",
    );
  }

  async getIdElem() {
    return await this.idElem;
  }

  async getAid() {
    return await this.idElem.getAttribute("data-id");
  }

  async setCheckpoint(score) {
    this.checkpoint = Math.round(this.testLen * score);
  }

  async getCheckpoint() {
    return this.checkpoint;
  }

  async getLength() {
    return this.testLen;
  }

  async start() {
    await this.sco.getByRole("button", { name: "Next" }).click();
    await this.sco.getByRole("button", { name: "Start" }).click();
  }

  async next() {
    await this.sco.getByRole("button", { name: "Next" }).click();
  }

  async submit() {
    await this.sco.getByRole("button", { name: "SUBMIT" }).click();
  }

  async results() {
    return await this.sco.locator("#results").innerText();
  }

  async exit() {
    await this.sco.getByRole("button", { name: "EXIT" }).click();
    await this.sco.close();
  }

  async answerCorrect() {
    const curr = await this.idElem.getAttribute("data-id");
    let answer = curr != "content" ? answers[curr] : { type: "" };

    switch (answer.type) {
      case "click": {
        await this.sco.getByTestId(answer.key).click();
        break;
      }
      case "input": {
        await this.sco.getByTestId(answer.key).fill(answer.value);
        break;
      }
      case "choice": {
        await this.sco.locator("#" + answer.key).click();

        break;
      }
      case "check": {
        for (const i of await this.sco.getByRole("checkbox").all()) {
          if (answer.key.includes(await i.getAttribute("id"))) {
            await i.click();
          }
        }

        break;
      }
      case "matching dropdown": {
        const keys = Object.keys(answer.key);

        for (const k of keys) {
          await this.sco.getByLabel(k).selectOption(`${k}[.]${answer.key[k]}`);
        }

        break;
      }
      case "matching drag": {
        const dragItems = Object.keys(answer.key);

        for (const drag of dragItems) {
          await this.sco
            .getByText(drag, { exact: true })
            .dragTo(
              this.sco.locator("[data-drop-id='" + answer.key[drag] + "']"),
            );
        }

        break;
      }
      case "sequence": {
        const order = answer.key;
        let drops = await this.sco.locator("[data-drop-id]").all();

        for (const i in order) {
          await this.sco.getByText(order[i], { exact: true }).dragTo(drops[i]);
        }

        break;
      }
      case "fill-in": {
        answer.key.forEach(async (v, i) => {
          let input = 'input[data-index="' + i + '"]';
          // await this.sco.getByRole()
          await this.sco.locator(input).fill(v);
        });
        break;
      }
    }
  }

  async answerIncorrect() {
    const curr = await this.idElem.getAttribute("data-id");
    let answer = curr != "content" ? answers[curr] : { type: "" };

    switch (answer.type) {
      case "choice": {
        const answerIndex = Number(answer.key.slice(-1));
        let selectInput;

        if (answerIndex > 0) {
          selectInput = 0;
        } else if (answerIndex == 0) {
          selectInput = 1;
        }

        let css = "#" + curr + "_" + selectInput;

        await this.sco.locator(css).click();
        break;
      }
      case "check": {
        for (const i of await this.sco.getByRole("checkbox").all()) {
          if (answer.key.includes(await i.getAttribute("id"))) {
            await i.click();
            await i.click();
          } else {
            await i.click();
          }
        }

        break;
      }
      case "matching dropdown": {
        const keys = Object.keys(answer.key);
        await this.sco.getByLabel(keys[0]).selectOption({ index: 0 });
        break;
      }
      case "matching drag": {
        await this.sco
          .getByTestId("drag")
          .first()
          .dragTo(this.sco.getByTestId("drop").first());
        await this.sco
          .getByTestId("drag")
          .first()
          .dragTo(this.sco.getByTestId("drop").first());

        break;
      }
      case "sequence": {
        const order = answer.key;
        let drops = await this.sco.locator("[data-drop-id]").all();

        await this.sco
          .getByTestId("drag")
          .last()
          .dragTo(await this.sco.getByTestId("drop").first());
        let dragText = await this.sco.getByTestId("drag").allInnerTexts();
        let correct = (a, b) => {
          return a.every((val, index) => val === b[index]);
        };

        if (correct(dragText, order)) {
          await this.sco
            .getByTestId("drag")
            .last()
            .dragTo(await this.sco.getByTestId("drop").first());
        }

        break;
      }
      case "fill-in": {
        await this.sco.locator("input[data-index]").first().fill("empty");
        break;
      }
    }
  }
}
