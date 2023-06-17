import { Client } from 'discord.js';
import ready from '@events/ready';

export default async function dsAuth() {
    // Create a new client instance
    const client: Client = new Client({ intents: 1 });

    await client.login(process.env.DISCORD_TOKEN).then(() => { console.log('logged'); });

    return client;
}