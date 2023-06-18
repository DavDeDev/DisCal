import { CustomClient } from './interfaces/CustomClient';
import { Collection } from 'discord.js';
import { calendar_v3 } from 'googleapis';

export default async function createBot(calendar: calendar_v3.Calendar) {
    // Create a new client instance
    const client: CustomClient = new CustomClient({ intents: 1 }, calendar);

    await client.login(process.env.DISCORD_TOKEN).then(() => { console.log('logged'); });

    return client;
}