import { client } from "./bot.js";
import config from "./config.js";
import { handleIntroduction } from "./handlers/introductionHandler.js";

client.once("clientReady", () => {
    console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {

    console.log("========== MESSAGE RECEIVED ==========");
    console.log("Author:", message.author.username);
    console.log("Channel:", message.channel.id);
    console.log("Content:", message.content);

    await handleIntroduction(message);
});

client.login(config.discordToken); 