import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Telegraf, Markup } from "telegraf";

const botToken = process.env.BOT_TOKEN;
if (!botToken) {
  console.error("BOT_TOKEN environment variable is required");
  process.exit(1);
}

const webAppUrl = process.env.WEB_APP_URL || "https://hdr2029.github.io/tgtasker/";
const STATS_COMMAND = "35892";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storageDir = path.resolve(__dirname, "..", "storage");
const usersStorePath = path.join(storageDir, "users.json");

const users = new Set();
let isStoreLoaded = false;

const ensureStoreLoaded = async () => {
  if (isStoreLoaded) {
    return;
  }

  await fs.mkdir(storageDir, { recursive: true });

  try {
    const raw = await fs.readFile(usersStorePath, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      parsed.forEach((id) => {
        if (id) {
          users.add(String(id));
        }
      });
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn("Failed to load users store", error);
    }
  }

  isStoreLoaded = true;
};

const persistUsers = async () => {
  try {
    await fs.writeFile(usersStorePath, JSON.stringify(Array.from(users)), "utf8");
  } catch (error) {
    console.warn("Failed to persist users store", error);
  }
};

const registerUser = async (ctx) => {
  await ensureStoreLoaded();
  const id = ctx.from?.id;

  if (!id) {
    return;
  }

  const key = String(id);
  if (users.has(key)) {
    return;
  }

  users.add(key);
  await persistUsers();
};

await ensureStoreLoaded();

const bot = new Telegraf(botToken);

bot.start(async (ctx) => {
  await registerUser(ctx);

  const keyboard = Markup.inlineKeyboard([
    Markup.button.webApp("Wella Mini App", webAppUrl),
  ]);

  return ctx.reply("Wella Telegram.", keyboard);
});

bot.command(STATS_COMMAND, async (ctx) => {
  await ensureStoreLoaded();
  const total = users.size;
  await ctx.reply(`Кількість користувачів бота: ${total}`);
});

bot.catch((err, ctx) => {
  console.error(`Bot error for ${ctx?.updateType ?? "unknown update"}:`, err);
});

await bot.launch();

console.log("Bot is up and running");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
