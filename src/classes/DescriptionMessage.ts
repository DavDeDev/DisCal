import { EventType, IDescriptionEmbed } from 'types';

export class DescriptionMessage implements IDescriptionEmbed {
    type: EventType;
    cost: 'Free' | '$$';
    location: string;
    start: Date;
    end: Date;
    constructor(type: EventType, cost: boolean, location: string, start: Date, end: Date) {
        this.type = type;
        this.cost = cost ? 'Free' : '$$';
        this.location = location;
        this.start = start;
        this.end = end;
    }
    toString(): string {
        return `Type: ${this.type}\nCost: ${this.cost}\nLocation: ${this.location}\nStart: ${this.start}\nEnd: ${this.end}`;
    }

}