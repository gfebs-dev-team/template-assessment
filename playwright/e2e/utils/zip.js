import child_process from "child_process";

child_process.execSync(
  `rm -r dist; vite build; node ./utils/generateManifest.js; cd dist; rm -r ../playwright/e2e/utils/sco.zip; zip -r ../playwright/e2e/utils/sco.zip *`,
);
