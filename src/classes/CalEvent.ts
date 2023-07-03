import { EventType, ICalEvent } from 'types';

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

    // Transform the CalEvent into a Google Calendar compatible Event
    toGoogleCalendarEvent(): any {
        return {
            'summary': `${this.type}*${this.title}`,
            'location': this.location,
            'description': `${this.isFree}*${this.url}`,
            'start': {
                'dateTime': this.start.toISOString(),
                'timeZone': 'Canada/Toronto',
            },
            'end': {
                'dateTime': this.end.toISOString(),
                'timeZone': 'Canada/Toronto',
            },
        };
    }
}