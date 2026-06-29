import config from "../config.js";
import { generateIntroductionReply } from "../services/llmService.js";

export async function handleIntroduction(message) {
    try {
        // Ignore bot messages
        if (message.author.bot) return;

        // Only respond in the introductions channel
        if (message.channel.id !== config.introChannelId) return;

        console.log(`📨 Introduction from ${message.author.username}`);

        // Show typing indicator
        await message.channel.sendTyping();

        // Generate AI reply
        const reply = await generateIntroductionReply(message.content);

        // Reply to the user
        await message.reply(reply);

        console.log("✅ Welcome message sent.");

    } catch (error) {
        console.error("❌ Error generating welcome message:", error);

        await message.reply(
            "Sorry! I couldn't generate a welcome message right now."
        );
    }
} 