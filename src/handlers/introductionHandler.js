import config from "../config.js";
import { generateIntroductionReply } from "../services/llmService.js";
import { validateIntroduction } from "../middleware/introductionValidator.js";

import {
    hasBeenWelcomed,
    markAsWelcomed
} from "../middleware/welcomeTracker.js";

import {
    isDuplicateIntroduction,
    saveIntroduction
} from "../middleware/duplicateDetector.js";

export async function handleIntroduction(message) {
    try {

        // Ignore bot messages
        if (message.author.bot) return;

        // Ignore replies to other messages
        if (message.reference) return;

        // Ignore simple greetings
        const ignoredMessages = [
            "hi",
            "hello",
            "hey",
            "welcome",
            "thanks",
            "thank you",
            "nice",
            "cool",
            "yo",
            "sup",
            "good morning",
            "good afternoon",
            "good evening"
        ];

        if (
            ignoredMessages.includes(
                message.content.toLowerCase().trim()
            )
        ) {
            return;
        }

        // Only respond in introductions channel
        if (message.channel.id !== config.introChannelId) return;

        // Validate introduction
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

        // Duplicate introduction detection
        if (isDuplicateIntroduction(message.content)) {
            await message.reply(
                "⚠️ This introduction appears very similar to an existing introduction.\n\n" +
                "Please write your own unique introduction."
            );
            return;
        }

        console.log(`📨 Introduction from ${message.author.username}`);

        // Show typing indicator
        await message.channel.sendTyping();

        // Generate AI reply
        const reply = await generateIntroductionReply(message.content);

        // Send AI reply
        await message.reply(reply);

        // Save introduction for future duplicate detection
        saveIntroduction(message.content);

        // Mark user as welcomed
        markAsWelcomed(message.author.id);

        console.log(`✅ Welcome message sent to ${message.author.username}`);

    } catch (error) {

        console.error("❌ Error generating welcome message:", error);

        await message.reply(
            "⚠️ Sorry! I couldn't generate a welcome message right now. Please try again later."
        );
    }
}