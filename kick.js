// kick.js
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a member from the server',
    execute: async (message, args) => {
        // Check if the user has permission to kick
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return message.reply("❌ You don't have permission to kick members.");
        }

        // Get the member to kick
        const member = message.mentions.members.first();
        if (!member) return message.reply("❌ Please mention a valid member to kick.");

        // Check if the bot can kick the member
        if (!member.kickable) {
            return message.reply("❌ I cannot kick this member. They may have higher roles than me.");
        }

        // Get reason
        const reason = args.slice(1).join(' ') || "No reason provided";

        // Attempt to kick
        try {
            await member.kick(reason);
            message.channel.send(`✅ ${member.user.tag} has been kicked. Reason: ${reason}`);

            // Optional: DM the user
            try {
                await member.send(`You have been kicked from **${message.guild.name}**. Reason: ${reason}`);
            } catch (err) {
                console.log(`Could not DM ${member.user.tag}.`);
            }

        } catch (error) {
            console.error(error);
            message.reply("❌ There was an error trying to kick this member.");
        }
    }
};