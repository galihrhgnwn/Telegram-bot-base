require("dotenv").config();
const { Bot } = require("grammy");
const fs = require("fs");
const path = require("path");

const bot = new Bot(process.env.BOT_TOKEN);

const pluginsPath = path.join(__dirname, "plugins/cmd");
fs.readdirSync(pluginsPath).forEach((file) => {
  if (file.endsWith(".js")) {
    const plugin = require(path.join(pluginsPath, file));
    if (typeof plugin === "function") {
      plugin(bot);
      console.log(`Loaded plugin: ${file}`);
    }
  }
});

bot.start();
console.log("running...");
