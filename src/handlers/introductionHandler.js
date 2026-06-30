import config from "../config.js";
import { generateIntroductionReply } from "../services/llmService.js";
import { validateIntroduction } from "../middleware/introductionValidator.js";
import {
    hasBeenWelcomed,
    markAsWelcomed
} from "../middleware/welcomeTracker.js";

export async function handleIntroduction(message) {
    try {

        // Ignore bot messages
        if (message.author.bot) return;

        // Only work in introductions channel
        if (message.channel.id !== config.introChannelId) return;

        // Validate introduction first
        const validation = validateIntroduction(message.content);

        if (!validation.valid) {
            await message.reply(
                `❌ ${validation.reason}\n\n` +
                "Please introduce yourself by including:\n" +
                "• Your name\n" +
                "• Where you're from\n" +
                "• Your interests"
            );
            return;
        }

    
        // User already introduced
        if (hasBeenWelcomed(message.author.id)) {
            await message.reply(
                "👋 You've already introduced yourself. Welcome again!"
            );
            return;
        }

        console.log(`📨 Introduction from ${message.author.username}`);

        // Typing indicator
        await message.channel.sendTyping();

        // Generate AI reply
        const reply = await generateIntroductionReply(message.content);

        // Send reply
        await message.reply(reply);

        // Remember this user
        markAsWelcomed(message.author.id);

        console.log(`✅ Welcome message sent to ${message.author.username}`);

    } catch (error) {

        console.error("❌ Error generating welcome message:", error);

        await message.reply(
            "⚠️ Sorry! I couldn't generate a welcome message right now. Please try again later."
        );

    }
} 