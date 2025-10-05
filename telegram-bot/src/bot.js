import "dotenv/config";
import { Telegraf, Markup } from "telegraf";

const botToken = process.env.BOT_TOKEN;
if (!botToken) {
  console.error("BOT_TOKEN environment variable is required");
  process.exit(1);
}

const webAppUrl =
  process.env.WEB_APP_URL || "https://hdr2029.github.io/tgtasker/";

const bot = new Telegraf(botToken);

bot.start((ctx) => {
  const keyboard = Markup.inlineKeyboard([
    Markup.button.webApp("Wella Mini App", webAppUrl),
  ]);

  return ctx.reply(" Wella Telegram.", keyboard);
});

bot.catch((err, ctx) => {
  console.error(`Bot error for ${ctx?.updateType ?? "unknown update"}:`, err);
});

await bot.launch();

console.log("Bot is up and running");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
