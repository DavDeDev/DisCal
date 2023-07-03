import { EventType, ICalEvent } from 'types';

export class CalEvent implements ICalEvent {
    title: string;
    url: string;
    type: EventType;
    isFree: boolean;
    location: string;
    time: string;
    description: string;

    constructor(title: string, url: string, type: EventType, isFree: boolean, location: string, time: string, description = '') {
        this.title = title;
        this.url = url;
        this.type = type;
        this.isFree = isFree;
        this.location = location;
        this.time = time;
        this.description = description;
    }
    // Title: Hackathon * EthToronto Location: Online Time: July 15 from 10-4 Description: free - https://openai.com/product
    toString(): string {
        return `Title: ${this.type} - ${this.title}; Location: ${this.location}; Time: ${this.time}; Description: ${this.isFree ? 'free' : '$$'} - ${this.url}`;
    }
}