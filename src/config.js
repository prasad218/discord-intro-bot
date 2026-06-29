import dotenv from "dotenv";

dotenv.config();

export default {
  discordToken: process.env.DISCORD_TOKEN,
  introChannelId: process.env.INTRO_CHANNEL_ID,

  aiService: process.env.AI_SERVICE,
  model: process.env.MODEL,

  openRouterApiKey: process.env.OPENROUTER_API_KEY,
}; 