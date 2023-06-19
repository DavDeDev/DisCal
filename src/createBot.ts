import { calendar_v3 } from 'googleapis';
import CustomClient from 'classes/CustomClient';
import dotenv from 'dotenv';

export default async function createBot(calendar: calendar_v3.Calendar) {
    dotenv.config();
    // Create a new client instance
    const client: CustomClient = new CustomClient(1, undefined, undefined, calendar);

    await client.login(process.env.DISCORD_TOKEN).then(() => { console.log('logged'); });

    return client;
}