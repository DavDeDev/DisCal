import { EventType } from './';

/**
 * Represents the Description object that will be included in the embed object
 */
export interface IDescriptionEmbed {
    type: EventType;
    cost: 'Free' | '$$';
    location: string;
    start: Date;
    end: Date;
    toString(): string;
}