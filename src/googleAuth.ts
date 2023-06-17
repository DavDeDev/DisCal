import { calendar_v3, google } from 'googleapis';
// JWT is more specific then GoogleAuth => for Service Accounts
import { JWT } from 'google-auth-library';
// Load client secrets from a local file.
import dotenv from 'dotenv';
import credentials from './credentials.json';
import path from 'path';

export default async function googleAuth() {
    dotenv.config({ path: path.resolve(__dirname, '.env') });
    console.log(path.resolve(__dirname, '.env'));
    // Load the service account credentials

    // Create a new JWT client using the credentials
    const client: JWT = new JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    // Authenticate the client
    await client.authorize();

    // Create a new instance of the Google Calendar API
    const calendar: calendar_v3.Calendar = google.calendar({ version: 'v3', auth: client });

    // // Make an API request (list the user's upcoming events)
    // const response = await calendar.events.list({
    //     calendarId: process.env.CALENDAR_ID,
    //     timeMin: new Date().toISOString(),
    //     maxResults: 10,
    //     singleEvents: true,
    //     orderBy: 'startTime',
    // });

    // // Log the upcoming events
    // const events : calendar_v3.Schema$Event[] | undefined = response.data.items;
    return calendar;
}
