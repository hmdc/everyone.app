const { run } = require("@probot/adapter-github-actions");
const app = require("./action");

run(app);
