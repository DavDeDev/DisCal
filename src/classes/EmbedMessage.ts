import { EventType, ICalEvent } from 'types';
import { APIEmbed, APIEmbedField, inlineCode } from 'discord.js';

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
        this.title = `${EventType.getEmoji(CalEvent.type)} - ${CalEvent.title}`;
        this.url = CalEvent.url;
        this.fields[0].value = inlineCode(CalEvent.location);
        this.fields[1].value = inlineCode(CalEvent.start.toLocaleString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        })) as string;
        this.fields[2].value = inlineCode(CalEvent.end.toLocaleString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }));
        this.color = EventType.getColor(CalEvent.type);
    }
}