import dotenv from "dotenv";

dotenv.config();

console.log("==================================");
console.log("INTRO_CHANNEL_ID =", process.env.INTRO_CHANNEL_ID);
console.log("==================================");

export default {
    discordToken: process.env.DISCORD_TOKEN,
    introChannelId: process.env.INTRO_CHANNEL_ID,

    aiService: process.env.AI_SERVICE,
    model: process.env.MODEL,

    openRouterApiKey: process.env.OPENROUTER_API_KEY,
}; 