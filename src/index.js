import { client } from "./bot.js";
import config from "./config.js";
import { handleIntroduction } from "./handlers/introductionHandler.js";

client.once("clientReady", () => {
    console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    await handleIntroduction(message);
});

client.login(config.discordToken); 