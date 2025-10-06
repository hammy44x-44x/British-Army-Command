const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

const prefix = '!';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Auto-role on member join
client.on('guildMemberAdd', async (member) => {
    // Name of the role to assign
    const roleName = 'BMT pernsool';
    
    // Find the role in the guild
    const role = member.guild.roles.cache.find(r => r.name === roleName);
    if (!role) {
        console.log(`Role "${roleName}" not found in ${member.guild.name}`);
        return;
    }

    try {
        await member.roles.add(role);
        console.log(`Added role "${roleName}" to ${member.user.tag}`);
    } catch (err) {
        console.error(`Failed to add role: ${err}`);
    }
});

// Your other commands here (optional)

// Example: simple ping command
client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        message.channel.send('Pong!');
    }
});

client.login('YOUR_BOT_TOKEN');
