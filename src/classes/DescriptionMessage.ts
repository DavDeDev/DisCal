import { time } from 'discord.js';
import { EventType, IDescriptionEmbed } from 'types';

export class DescriptionMessage implements IDescriptionEmbed {
    type: EventType;
    cost: 'Free' | '$$';
    location: string;
    start: Date;
    end: Date;
    constructor(type: EventType, paid: boolean, location: string, start: Date, end: Date) {
        this.type = type;
        this.cost = paid ? 'Free' : '$$';
        this.location = location;
        this.start = start;
        this.end = end;
    }
    toString(): string {
        console.log(this.start.getTime());
        return `**${this.type} - ${this.cost}**
        _${this.location}_
        \n**TIME**
        ${time(this.start)} - ${time(this.end)}`;
    }

}