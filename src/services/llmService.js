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

    return response.content;
} 