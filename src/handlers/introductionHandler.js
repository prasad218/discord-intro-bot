import config from "../config.js";
import { generateIntroductionReply, moderateIntroduction } from "../services/llmService.js";
import { validateIntroduction } from "../middleware/introductionValidator.js";
import { hasBeenWelcomed, markAsWelcomed } from "../middleware/welcomeTracker.js";
import { isDuplicateIntroduction, saveIntroduction } from "../middleware/duplicateDetector.js";

export async function handleIntroduction(message) {
    try {

        console.log("========== HANDLE INTRODUCTION ==========");

        // Ignore bot messages
        if (message.author.bot) {
            console.log("❌ Ignored Bot");
            return;
        }

        console.log("✅ Step 1");

        // Ignore replies
        if (message.reference) {
            console.log("❌ Ignored Reply");
            return;
        }

        console.log("✅ Step 2");

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
            console.log("❌ Greeting ignored");
            return;
        }

        console.log("✅ Step 3");

        if (message.channel.id !== config.introChannelId) {
            console.log("❌ Wrong Channel");
            console.log("Expected:", config.introChannelId);
            console.log("Received:", message.channel.id);
            return;
        }

       console.log("Expected:", JSON.stringify(config.introChannelId));
console.log("Received:", JSON.stringify(message.channel.id));

console.log("Expected Type:", typeof config.introChannelId);
console.log("Received Type:", typeof message.channel.id);

if (
    String(message.channel.id).trim() !==
    String(config.introChannelId).trim()
) {
    console.log("❌ Wrong Channel");
    return;
}

console.log("✅ Step 4"); 

        console.log("✅ Step 5");

        console.log("Running Moderation...");

        const moderation = await moderateIntroduction(message.content);

        console.log("Moderation Result:", moderation);

        if (moderation === "REJECT") {
            await message.reply("❌ Rejected by AI moderation.");
            return;
        }

        console.log("✅ Step 6");

        const validation = validateIntroduction(message.content);

        console.log("Validation:", validation);

        if (!validation.valid) {
            await message.reply(validation.reason);
            return;
        }

        console.log("✅ Step 7");

        if (isDuplicateIntroduction(message.content)) {
            console.log("Duplicate");
            await message.reply("Duplicate Introduction");
            return;
        }

        console.log("✅ Step 8");

        await message.channel.sendTyping();

        console.log("Calling LLM...");

        const reply = await generateIntroductionReply(message.content);

        console.log("LLM Reply:");
        console.log(reply);

        console.log("✅ Step 9");

        await message.reply(reply);

        console.log("✅ Reply Sent");

        saveIntroduction(message.content);

        markAsWelcomed(message.author.id);

        console.log("Finished Successfully");

    } catch (error) {

        console.error("========== ERROR ==========");
        console.error(error);

        await message.reply(
            "⚠️ Sorry! Something went wrong."
        );
    }
} 