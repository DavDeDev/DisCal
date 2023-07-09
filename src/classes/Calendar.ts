import { JWT } from 'google-auth-library';
import { calendar_v3 } from 'googleapis';

/**
 * This class extends the Google Calendar API and adds useful methods
 */
export class Calendar extends calendar_v3.Calendar {
    private calendarId: string = process.env.EVENTS_CALENDAR_ID as string;
    // TODO: Insert event
    insertEvent(event: calendar_v3.Schema$Event) {
        return this.events.insert({
            calendarId: this.calendarId,
            requestBody: event,
        });
    }
    // TODO: List events
    constructor(auth: JWT) {
        super({ auth });
    }

}