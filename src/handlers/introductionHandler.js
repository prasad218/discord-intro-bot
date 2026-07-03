import config from "../config.js";

import {
    generateIntroductionReply,
    moderateIntroduction
} from "../services/llmService.js";

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

        // Ignore replies
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

        // Already welcomed
        if (hasBeenWelcomed(message.author.id)) {

            await message.reply(
                "👋 You've already introduced yourself. Welcome again!"
            );

            return;

        }

        // AI Moderation
        const moderation = await moderateIntroduction(message.content);

        if (moderation === "REJECT") {

            await message.reply(
                "❌ Your introduction contains inappropriate, promotional, or offensive content.\n\n" +
                "Please keep introductions respectful and genuine."
            );

            return;

        }

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

        // Duplicate detection
        if (isDuplicateIntroduction(message.content)) {

            await message.reply(
                "⚠️ This introduction appears very similar to an existing introduction.\n\n" +
                "Please write your own unique introduction."
            );

            return;

        }

        console.log(`📨 Introduction from ${message.author.username}`);

        await message.channel.sendTyping();

        // Generate AI welcome
        const reply = await generateIntroductionReply(message.content);

        await message.reply(reply);

        // Save introduction
        saveIntroduction(message.content);

        // Remember user
        markAsWelcomed(message.author.id);

        console.log(`✅ Welcome message sent to ${message.author.username}`);

    }
    catch (error) {

        console.error("❌ Error:", error);

        await message.reply(
            "⚠️ Sorry! I couldn't process your introduction right now. Please try again later."
        );

    }

} 