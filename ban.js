// ban.js
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a member from the server',
    execute: async (message, args) => {
        // Check if the user has permission to ban
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply("❌ You don't have permission to ban members.");
        }

        // Get the member to ban
        const member = message.mentions.members.first();
        if (!member) return message.reply("❌ Please mention a valid member to ban.");

        // Check if the bot can ban the member
        if (!member.bannable) {
            return message.reply("❌ I cannot ban this member. They may have higher roles than me.");
        }

        // Get the reason
        const reason = args.slice(1).join(' ') || "No reason provided";

        // Attempt to ban
        try {
            await member.ban({ reason });
            message.channel.send(`✅ ${member.user.tag} has been banned. Reason: ${reason}`);

            // Optional: DM the user
            try {
                await member.send(`You have been banned from **${message.guild.name}**. Reason: ${reason}`);
            } catch (err) {
                console.log(`Could not DM ${member.user.tag}.`);
            }

        } catch (error) {
            console.error(error);
            message.reply("❌ There was an error trying to ban this member.");
        }
    }
};