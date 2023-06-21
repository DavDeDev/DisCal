// JWT is more specific then GoogleAuth => for Service Accounts
import { JWT } from 'google-auth-library';
// Load client secrets from a local file.
import credentials from '../credentials.json';

export async function googleAuth() {
    // Create a new JWT client using the credentials
    const client: JWT = new JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    // Authenticate the client
    await client.authorize();

    // // Create a new instance of the Google Calendar API
    // const calendar: calendar_v3.Calendar = google.calendar({ version: 'v3', auth: client });

    // return calendar;

    return client;
}
