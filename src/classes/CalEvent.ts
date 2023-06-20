import { EventType, ICalEvent } from 'types';

export class CalEvent implements ICalEvent {
    title: string;
    url: string;
    start: Date;
    end: Date;
    location: string;
    type: EventType;

    constructor(title: string, url: string, start: Date, end: Date, location: string, type: EventType) {
        this.title = title;
        this.url = url;
        this.start = start;
        this.end = end;
        this.location = location;
        this.type = type;
    }
}