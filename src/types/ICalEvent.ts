import { EventType } from './';

// Represent a Calendar Event object compatible with the application
export interface ICalEvent {
    // https://developers.google.com/calendar/api/v3/reference/events/insert
    title: string;
    url: string;
    type: EventType;
    isFree: boolean;
    location: string;
    start: Date;
    end: Date;
}