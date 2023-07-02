import { EventType } from 'types';

export interface ICalEvent {
    // https://developers.google.com/calendar/api/v3/reference/events/insert
    title: string;
    url: string;
    start: Date;
    end: Date;
    location: string;
    type: EventType;
}