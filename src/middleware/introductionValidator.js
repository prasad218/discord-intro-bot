const INTRODUCTION_KEYWORDS = [
    "i'm",
    "i am",
    "my name is",
    "from",
    "student",
    "developer",
    "engineer",
    "interested",
    "working",
    "study",
    "studying",
    "love",
    "passionate"
];

const MIN_LENGTH = 25;

export function validateIntroduction(content) {

    const message = content.toLowerCase().trim();

    // Check minimum length
    if (message.length < MIN_LENGTH) {
        return {
            valid: false,
            reason: "Your introduction is too short."
        };
    }

    // Check if at least one introduction keyword exists
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