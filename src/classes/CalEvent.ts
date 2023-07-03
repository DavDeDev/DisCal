import { EventType, ICalEvent } from 'types';

export class CalEvent implements ICalEvent {
    title: string;
    url: string;
    type: EventType;
    isFree: boolean;
    location: string;
    start: Date;
    end: Date;
    description: string;

    constructor(title: string, url: string, type: EventType, isFree: boolean, location: string, start: Date, end: Date, description = '') {
        this.title = title;
        this.url = url;
        this.type = type;
        this.isFree = isFree;
        this.location = location;
        this.start = start;
        this.end = end;
        this.description = description;
    }
}