function getRandomEmoji(emojis) {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}

const emojis = ['🇨🇴', '🎄', '🌲', '🪅', '🙏🏽', '🫂'];

export function addRandomEmoji(message) {
    const randomEmoji = getRandomEmoji(emojis);
    return `${message} ${randomEmoji}`;
}