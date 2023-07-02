import { EventType } from 'types';

export interface IDescriptionEmbed {
    type: EventType;
    cost: 'Free' | '$$';
    location: string;
    start: Date;
    end: Date;
    toString(): string;
}