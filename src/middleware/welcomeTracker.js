const welcomedUsers = new Set();

export function hasBeenWelcomed(userId) {
    return welcomedUsers.has(userId);
}

export function markAsWelcomed(userId) {
    welcomedUsers.add(userId);
}      