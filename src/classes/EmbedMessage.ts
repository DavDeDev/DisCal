import { EventType, ICalEvent } from 'types';
import { APIEmbed, APIEmbedField } from 'discord.js';

export class EmbedMessage implements APIEmbed {
    color: number;
    title: string;
    url: string;
    fields: APIEmbedField[] = [
        {
            name: 'Location',
            value: '',
            inline: false,
        },
        {
            name: 'Start',
            value: '',
            inline: true,
        },
        {
            name: 'End',
            value: '',
            inline: true,
        },

    ];

    constructor(CalEvent: ICalEvent) {
        this.title = `${CalEvent.title} (${EventType.getEmoji(CalEvent.type)})`;
        this.url = CalEvent.url;
        this.fields[0].value = CalEvent.location;
        this.fields[1].value = CalEvent.start.toLocaleString();
        this.fields[2].value = CalEvent.end.toLocaleString();
        this.color = EventType.getColor(CalEvent.type);
    }
}