import googleAuth from './calendar';
import { calendar_v3 } from 'googleapis';
import CustomClient from 'classes/CustomClient';
import dotenv from 'dotenv';
import path from 'path';
import { ready } from './events/ready';
import { Events } from 'discord.js';
import { JWT } from 'google-auth-library';


async function main() {
    dotenv.config({ path: path.resolve(__dirname, '../.env') });

    // Create a new instance of the Google Calendar API
    const calendar: calendar_v3.Calendar | undefined = await googleAuth()
        .then((auth: JWT) => {
            console.log('Google Authenticated');
            return new calendar_v3.Calendar({ auth });
        })
        .catch((error: Error) => {
            throw new Error('Google Authentication failed' + error);
        });

    // Add commands to the client
    const client: CustomClient = new CustomClient(1, undefined, undefined, calendar);

    client.once(ready.name as Events.ClientReady, (...args) => ready.execute(...args));


    await client.login(process.env.DISCORD_TOKEN)
        .then(() => { console.log('Discord logged'); })
        .catch(() => { console.error('Discord login failed'); });
}

main().catch((error) => {
    console.error('Error:', error);
});
