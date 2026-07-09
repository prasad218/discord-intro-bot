import { client } from "./bot.js";
import config from "./config.js";

import { handleIntroduction } from "./handlers/introductionHandler.js";
import { handleSpam } from "./handlers/spamHandler.js";

client.once("clientReady", () => {
    console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {

    console.log("========== MESSAGE RECEIVED ==========");
    console.log("Author:", message.author.username);
    console.log("Channel:", message.channel.id);
    console.log("Content:", message.content);

    // AI Spam Detection
    const spam = await handleSpam(message);

    if (spam) {
        return;
    }

    // Existing Introduction Bot
    await handleIntroduction(message);

});

client.login(config.discordToken); 