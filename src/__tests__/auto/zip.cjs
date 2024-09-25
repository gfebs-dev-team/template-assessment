const child_process = require("child_process");

child_process.execSync(
  `rm src/views/auto/test.zip; cd dist; zip -r ../src/views/auto/test.zip *`,
);
