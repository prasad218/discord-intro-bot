import { ResilientLLM } from "resilient-llm";

import config from "../config.js";

import {
    DEFAULT_MODEL,
    MAX_TOKENS,
    TEMPERATURE
} from "../constants.js";

import { introductionSystemPrompt } from "../prompts/introductionPrompt.js";

const llm = new ResilientLLM({
    aiService: config.aiService,
    model: config.model || DEFAULT_MODEL,
    apiKey: config.openRouterApiKey,
    maxTokens: MAX_TOKENS,
    temperature: TEMPERATURE,
    retries: 3,
    backoffFactor: 2
});


// ==========================================
// Generate AI Welcome Message
// ==========================================

export async function generateIntroductionReply(userMessage) {

    const conversation = [
        {
            role: "system",
            content: introductionSystemPrompt
        },
        {
            role: "user",
            content: userMessage
        }
    ];

    const response = await llm.chat(conversation);

    return response.content.trim();
}



// ==========================================
// AI Moderation
// ==========================================

export async function moderateIntroduction(userMessage) {

    const conversation = [
        {
            role: "system",
            content: `
You are an AI moderation system for a Discord community.

Your ONLY job is to decide whether an introduction should be accepted.

Reject introductions containing:

- insults
- abusive language
- hate speech
- harassment
- bullying
- threats
- sexual content
- spam
- scams
- phishing
- advertisements
- self promotion
- promotional links
- Discord invite links
- Telegram links
- WhatsApp links
- crypto promotions
- referral links
- suspicious URLs
- malicious content

Return ONLY one of these two words.

APPROVE

or

REJECT

Do not explain.
Do not add punctuation.
Do not add any extra words.
`
        },
        {
            role: "user",
            content: userMessage
        }
    ];

    try {

        const response = await llm.chat(conversation);

        const result = response.content
            .trim()
            .toUpperCase();

        console.log("🛡️ Moderation Result:", result);

        if (result.includes("REJECT")) {
            return "REJECT";
        }

        return "APPROVE";

    } catch (error) {

        console.error("Moderation Error:", error);

        // Fail open so genuine users are not blocked
        return "APPROVE";
    }
} 