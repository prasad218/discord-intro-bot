const INTRODUCTION_KEYWORDS = [
    "i'm",
    "i am",
    "my name is",
    "from",
    "student",
    "developer",
    "engineer",
    "designer",
    "programmer",
    "software",
    "interested",
    "working",
    "study",
    "studying",
    "love",
    "passionate",
    "learning",
    "currently",
    "hello everyone",
    "hi everyone"
];

const MIN_LENGTH = 25;

export function validateIntroduction(content) {

    const message = content.toLowerCase().trim();

    // Minimum length
    if (message.length < MIN_LENGTH) {
        return {
            valid: false,
            reason: "Your introduction is too short."
        };
    }

    // Check if it looks like an introduction
    const hasKeyword = INTRODUCTION_KEYWORDS.some(keyword =>
        message.includes(keyword)
    );

    if (!hasKeyword) {
        return {
            valid: false,
            reason: "This doesn't look like an introduction."
        };
    }

    return {
        valid: true
    };
} 