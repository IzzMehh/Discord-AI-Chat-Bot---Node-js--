import { REST, Routes } from 'discord.js';
import { configDotenv } from 'dotenv';

configDotenv()

const TOKEN = process.env.BOT_TOKEN
const CLIENT_ID = "1232757369747013633"

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },{
    name:"activechatbot",
    description:"Activate Chat Bot in the current channel!",
  }
];

const rest = new REST({ version: '10' }).setToken(TOKEN);


const slash = async() => {
try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}}

export default slash