# Wella Telegram Bot

Simple Telegram bot built with [Telegraf](https://telegraf.js.org/) that sends a welcome message and a button opening the Wella mini app.

## Prerequisites
- Node.js 20+
- Telegram bot token from [@BotFather](https://t.me/BotFather)

## Setup
1. Copy .env.example to .env and fill in BOT_TOKEN. Optionally override WEB_APP_URL.
2. Install dependencies:
   `ash
   npm install
   `
3. Run the bot:
   `ash
   npm start
   `

When a user sends /start, the bot replies with a greeting and an inline button that opens the mini app WEB_APP_URL inside Telegram.
