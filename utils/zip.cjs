const child_process = require("child_process");
const dayjs = require("dayjs");

const zipName = dayjs().format("YYYY_MM_DD_HHmm");

child_process.execSync(`cd dist; zip -r ../exports/${zipName}.zip *`);
