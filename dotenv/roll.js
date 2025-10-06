// roll.js
module.exports = {
    name: 'roll',
    description: 'Roll a dice (1-6)',
    execute: (message) => {
        const roll = Math.floor(Math.random() * 6) + 1;
        message.channel.send(`🎲 You rolled a **${roll}**!`);
    }
};
