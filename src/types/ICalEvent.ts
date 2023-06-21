import { EventType } from 'types';

export interface ICalEvent {
    title: string;
    url: string;
    start: Date;
    end: Date;
    location: string;
    type: EventType;
}