import googleAuth from './googleAuth';
import { calendar_v3, google } from 'googleapis';

// Make an API request (list the user's upcoming events)

async function main() {
    // Load the service account credentials



    // Create a new instance of the Google Calendar API
    const calendar: calendar_v3.Calendar = await googleAuth().catch((error) => {
        console.error('Error:', error);
        return error;
    });

    // Make an API request (list the user's upcoming events)
    const response = await calendar.events.list({
        calendarId: 'f609c53be785abc6e830a58fd40659a9673da4ddb9fde7665e0acbfba68430f2@group.calendar.google.com',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    });

    // Log the upcoming events
    const events: calendar_v3.Schema$Event[] | undefined = response.data.items;
    // Log the upcoming events
    if (events) {
        if (events.length) {
            console.log('Upcoming events:');
            events.forEach((event, index) => {
                const start: string | null | undefined = event.start?.dateTime || event.start?.date;
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
