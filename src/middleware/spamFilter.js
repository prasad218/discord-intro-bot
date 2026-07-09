const BLACKLIST = [
    "free nitro",
    "crypto",
    "bitcoin",
    "airdrop",
    "earn money",
    "click here",
    "discord.gg",
    "discord.com/invite",
    "@everyone",
    "@here"
];

export function isSpam(content) {

    const message = content.toLowerCase();

    // Blacklisted keywords
    for (const word of BLACKLIST) {
        if (message.includes(word)) {
            return {
                spam: true,
                reason: `Contains "${word}"`
            };
        }
    }

    // Too many URLs
    const urls = message.match(/https?:\/\/\S+/g);

    if (urls && urls.length >= 2) {
        return {
            spam: true,
            reason: "Too many links"
        };
    }

    // Too many mentions
    const mentions = (message.match(/<@/g) || []).length;

    if (mentions >= 5) {
        return {
            spam: true,
            reason: "Too many mentions"
        };
    }

    // Excessive repeated characters
    if (/(.)\1{8,}/.test(message)) {
        return {
            spam: true,
            reason: "Repeated characters"
        };
    }

    return {
        spam: false
    };
} 