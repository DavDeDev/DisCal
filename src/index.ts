import googleAuth from './calendar';
import dsAuth from './createBot';
import { calendar_v3 } from 'googleapis';
import { CustomClient } from './interfaces/CustomClient';

// Make an API request (list the user's upcoming events)

async function main() {
    // Create a new instance of the Google Calendar API
    const calendar: calendar_v3.Calendar = await googleAuth().catch((error) => {
        console.error('Error:', error);
        return error;
    });

    const client : CustomClient = await dsAuth(calendar);
}

main().catch((error) => {
    console.error('Error:', error);
});
