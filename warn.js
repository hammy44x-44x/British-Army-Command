// warn.js
const { PermissionsBitField } = require('discord.js');

// In-memory warning storage
const warnings = {};

module.exports = {
    name: 'warn',
    description: 'Warn a member',
    execute: async (message, args) => {
        // Check if the user has permission to manage messages
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply("❌ You don't have permission to warn members.");
        }

        // Get the member to warn
        const member = message.mentions.members.first();
        if (!member) return message.reply("❌ Please mention a valid member to warn.");

        // Get the reason
        const reason = args.slice(1).join(' ') || "No reason provided";

        // Initialize warnings array if not existing
        if (!warnings[member.id]) warnings[member.id] = [];

        // Add the warning
        warnings[member.id].push({
            reason: reason,
            date: new Date().toISOString(),
            moderator: message.author.tag
        });

        // Confirmation message
        message.channel.send(`⚠️ ${member.user.tag} has been warned. Reason: ${reason}`);

        // Optional: DM the user
        try {
            await member.send(`You have been warned in **${message.guild.name}**. Reason: ${reason}`);
        } catch (err) {
            console.log(`Could not DM ${member.user.tag}.`);
        }
    }
};