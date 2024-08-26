import { Client, GatewayIntentBits, PermissionsBitField } from 'discord.js';
import slash from './command.js';
import connect from './DB/connect.js';
import { Guild } from './Models/guildModel.js';
import generate from './geminiApi.js';


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
    ]
});

// db connection
connect()
// Commands
slash()




client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
        case "ping":
            await interaction.reply("Pong!!!")
            break;
        case "activechatbot":
            if ((interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))) {
                const channel = await Guild.findOne({ guildId: interaction.guildId })
                if (!channel) {
                   await Guild.create({
                        guildName: interaction.guild,
                        guildId: interaction.guildId,
                        channelId: interaction.channelId,
                    })

                } else {
                    if (interaction.channelId !== channel.channelId) {
                        const updatedChannel = await Guild.findByIdAndUpdate({ id: channel.id }, { channelId: interaction.channelId }, { new: true })
                        await interaction.reply(`Chat Bot changed to <#${updatedChannel.channelId}>`)
                    } else {
                        await interaction.reply(`ChatBot is already setted in <#${channel.channelId}>`)
                        return null
                    }
                }
                await interaction.reply(`Setted Chat Bot at <#${interaction.channelId}>`)
            } else {
                await interaction.reply("You are not an Admin")
            }
            break;

        default:
            break;
    }
});

client.on('messageCreate', async (m) => {
    if (!m.author.bot) {
        try {
            console.time("timer")
            const channel = await Guild.findOne({ channelId: m.channelId })
            if (channel) {
                await m.channel.sendTyping()
                const response = await generate(m.content)
                await m.reply(response)
            }
            console.timeEnd("timer")
        } catch (error) {
            console.log(error.message)
        }
    } else {
        console.log('bot msg')
        return null
    }
})

client.login(process.env.BOT_TOKEN);