import { time } from 'discord.js';
import { EventType, IDescriptionEmbed } from '../types';


/**
 * Represents the description that appears in the embed message.
 */
export class DescriptionMessage implements IDescriptionEmbed {
    type: EventType;
    cost: 'Free' | '$$';
    location: string;
    start: Date;
    end: Date;
    /**
   * Constructs the description for the embed message destructuring the Event details.
   * @param type The type of the event.
   * @param isFree Whether the event is free or not.
   * @param location The location of the event.
   * @param start The start date/time of the event.
   * @param end The end date/time of the event.
   */
    constructor(type: EventType, isFree: boolean, location: string, start: Date, end: Date) {
        this.type = type;
        this.cost = isFree ? 'Free' : '$$';
        this.location = location;
        this.start = start;
        this.end = end;
    }
    toString(): string {
        return `**${this.type} - ${this.cost}**
        ${this.location == 'Online' ? '🌐' : '📍'} _${this.location}_
        \n🕑 **TIME**
        ${time(this.start)} - ${time(this.end)}`;
    }

}