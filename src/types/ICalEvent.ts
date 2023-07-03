import { EventType } from 'types';

export interface ICalEvent {
    // https://developers.google.com/calendar/api/v3/reference/events/insert
    title: string;
    url: string;
    type: EventType;
    isFree: boolean;
    location: string;
    time: string;
    description?: string;
}