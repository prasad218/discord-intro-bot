# Discord Introduction Bot

An AI-powered Discord bot that automatically welcomes new members in the introductions channel. The bot validates introductions, generates personalized AI welcome messages with a conversation starter, tracks previously welcomed users, and detects duplicate introductions to improve community onboarding.

---

## Features

- 🤖 AI-powered personalized welcome messages
- 💬 AI-generated conversation starter
- ✅ Introduction validation
- 🔍 Duplicate introduction detection
- 👋 Welcome tracking (prevents multiple introductions from the same user)
- 🚫 Ignores greetings and replies that are not introductions
- ⚡ Built using Discord.js and ResilientLLM

---

# Setup Instructions

## Prerequisites

- Node.js (v18 or later)
- A Discord account
- A Discord server where you have Administrator permissions
- An OpenRouter API Key

---

## Installation

Clone the repository:

```bash
git clone https://github.com/prasad218/discord-intro-bot.git
cd discord-intro-bot
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN
INTRO_CHANNEL_ID=YOUR_INTRODUCTIONS_CHANNEL_ID

OPENROUTER_API_KEY=YOUR_OPENROUTER_API_KEY

AI_SERVICE=openrouter
MODEL=deepseek/deepseek-chat-v3-0324:free
```

Run the bot in development mode:

```bash
npm run dev
```

Or run normally:

```bash
npm start
```

---

# Discord Bot Configuration

1. Go to the Discord Developer Portal:
   https://discord.com/developers/applications

2. Create a new Discord Application.

3. Navigate to **Bot**.

4. Click **Add Bot**.

5. Copy the Bot Token and add it to the `.env` file.

6. Under **Privileged Gateway Intents**, enable:

- Message Content Intent

---

# Required OAuth2 Settings

Navigate to **OAuth2 → URL Generator**

### Scopes

- bot

### Bot Permissions

- View Channels
- Send Messages
- Read Message History
- Embed Links

Generate the invite URL and add the bot to your Discord server.

---

# Discord Channel Setup

Create an introduction channel (for example):

```
#introductions
```

Enable **Developer Mode** in Discord.

Right-click the introductions channel and select **Copy Channel ID**.

Add the channel ID to the `.env` file:

```env
INTRO_CHANNEL_ID=YOUR_CHANNEL_ID
```

---

# Project Workflow

1. User posts an introduction in the introductions channel.
2. Bot validates whether the message is a proper introduction.
3. Duplicate introductions are detected and rejected.
4. Previously welcomed users are identified.
5. The bot generates a personalized AI welcome message.
6. The AI ends the welcome with a conversation-starting question.

---

# Current Features

- AI-powered welcome messages
- Personalized conversation starters
- Introduction validation
- Duplicate introduction detection
- Welcome tracking
- Reply filtering
- Greeting filtering

---

# Future Improvements

- AI content moderation
- Automatic role assignment
- Persistent database for user tracking
- Slash commands
- Analytics dashboard
- Admin configuration commands

---

# Tech Stack

- Node.js
- Discord.js
- ResilientLLM
- OpenRouter API
