import googleAuth from './calendar';
import { calendar_v3 } from 'googleapis';
import CustomClient from './classes/CustomClient';
import dotenv from 'dotenv';
import path from 'path';

// Make an API request (list the user's upcoming events)
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function main() {
    // Create a new instance of the Google Calendar API
    const calendar: calendar_v3.Calendar = await googleAuth().catch((error) => {
        console.error('Error:', error);
        return error;
    });

    const client: CustomClient = new CustomClient(1, undefined, undefined, calendar);

    await client.login(process.env.DISCORD_TOKEN).then(() => { console.log('logged'); });
}

main().catch((error) => {
    console.error('Error:', error);
});
