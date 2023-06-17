import { calendar_v3, google } from 'googleapis';
// JWT is more specific then GoogleAuth => for Service Accounts
import { JWT } from 'google-auth-library';
// Load client secrets from a local file.
import dotenv from 'dotenv';

dotenv.config();

import credentials from './credentials.json';


async function main() {
    // Load the service account credentials

    // Create a new JWT client using the credentials
    const client : JWT = new JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    // Authenticate the client
    await client.authorize();

    // Create a new instance of the Google Calendar API
    const calendar : calendar_v3.Calendar = google.calendar({ version: 'v3', auth : client });

    // Make an API request (list the user's upcoming events)
    const response = await calendar.events.list({
        calendarId: 'f609c53be785abc6e830a58fd40659a9673da4ddb9fde7665e0acbfba68430f2@group.calendar.google.com',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    });

    // Log the upcoming events
    const events : calendar_v3.Schema$Event[] | undefined = response.data.items;
    // Log the upcoming events
    if (events) {
        if (events.length) {
            console.log('Upcoming events:');
            events.forEach((event, index) => {
                const start : string | null | undefined = event.start?.dateTime || event.start?.date;
                console.log(`${index + 1}. ${event.summary} (${start})`);
            });
        } else {
            console.log('No upcoming events.');
        }
    } else {
        console.log('Unable to fetch events.');
    }
}

main().catch((error) => {
    console.error('Error:', error);
});
