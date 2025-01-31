import {
  test as base,
  BrowserContext,
  chromium,
  expect as baseExpect,
  Page,
} from "@playwright/test";
import "dotenv/config";
import { ScoPage } from "../poms/sco-page.ts";

type ScormFixture = {
  launchPersistent: () => Promise<{ page: Page }>;
  page: Page;
  sco: ScoPage;
};

export const test = base.extend<ScormFixture>({
  launchPersistent: async ({}, run) => {
    let persistentContext: BrowserContext | undefined;
    await run(async () => {
      if (persistentContext) {
        throw new Error("can only launch one persistent context");
      }
      persistentContext = await chromium.launchPersistentContext(
        process.env.USER_DATA_DIR,
        {
          headless: false,
          permissions: ["clipboard-read", "clipboard-write"],
        },
      );
      const page = persistentContext.pages()[0];
      return { page };
    });
    if (persistentContext) await persistentContext.close();
  },
  page: async ({ launchPersistent }, run) => {
    const { page } = await launchPersistent();
    //btw for some sites it fails immediately without this wait :/
    //if you uncomment this wait with targeting not google.com it will work, otherwise fails
    await page.waitForTimeout(2000);
    await run(page);
  },
  sco: async ({ page }, use) => {
    const sco = new ScoPage(page);
    use(sco);
  },
});

export const expect = baseExpect.extend({
  async isAnswered(sco: ScoPage, expected: Boolean) {
    const assertionName = "isAnswered";
    let pass: boolean;
    let matcherResult: any;

    try {
      await baseExpect(sco.disclaimer).toBeHidden();
      pass = true;
    } catch (e: any) {
      matcherResult = e.matcherResult;
      pass = false;
    }

    const message = pass
      ? () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot,
          }) +
          "\n\n" +
          `Expected: not ${this.utils.printExpected(expected)}\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.actual)}`
            : "")
      : () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot,
          }) +
          "\n\n" +
          `Expected: ${this.utils.printExpected(expected)}\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.actual)}`
            : "");

    return {
      message,
      pass,
      name: assertionName,
      expected,
      actual: matcherResult?.actual,
    };
  },
});
