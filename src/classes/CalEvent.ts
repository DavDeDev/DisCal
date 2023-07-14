import { calendar_v3 } from 'googleapis';
import { EventType, ICalEvent } from '../types';

/**
* CalEvent contains all the information about an event, can be converted to a Google Calendar compatible event
*/
export class CalEvent implements ICalEvent {
    title: string;
    url: string;
    type: EventType;
    isFree: boolean;
    location: string;
    start: Date;
    end: Date;

    constructor(title: string, url: string, type: EventType, isFree: boolean, location: string, start: Date, end: Date) {
        this.title = title;
        this.url = url;
        this.type = type;
        this.isFree = isFree;
        this.location = location;
        this.start = start;
        this.end = end;
    }

    /**
     * It converts the CalEvent object to a Google Calendar compatible event object
     * 
     * @returns a Google Calendar API compatible event object
     */
    toGoogleCalendarEvent(): calendar_v3.Schema$Event {
        return {
            'summary': `${this.type}*${this.title}`,
            'location': this.location,
            'description': `${this.isFree}*${this.url}`,
            'start': {
                'dateTime': this.start.toISOString(),
                'timeZone': process.env.TZ || 'America/Toronto',
            },
            'end': {
                'dateTime': this.end.toISOString(),
                'timeZone': process.env.TZ || 'America/Toronto',
            },
        };
    }
}