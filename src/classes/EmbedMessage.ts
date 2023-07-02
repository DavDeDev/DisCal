import { EventType, ICalEvent } from 'types';
import { APIEmbed, APIEmbedAuthor, APIEmbedField, APIEmbedImage, inlineCode } from 'discord.js';
import { DescriptionMessage } from './DescriptionMessage';


export class EmbedMessage implements APIEmbed {
    // ? Author is always the same or URL of event
    author: APIEmbedAuthor = {
        name: 'Calendar',
        url: process.env.SHAREABLE_LINK_CALENDAR ?? 'https://github.com/DavDeDev',
    };
    color: number;
    title: string;
    url: string;
    description: string;
    image: APIEmbedImage;
    // fields: APIEmbedField[] = [
    //     {
    //         name: 'Location',
    //         value: '',
    //         inline: false,
    //     },
    //     {
    //         name: 'Start',
    //         value: '',
    //         inline: true,
    //     },
    //     {
    //         name: 'End',
    //         value: '',
    //         inline: true,
    //     },

    // ];

    constructor(CalEvent: ICalEvent) {
        this.title = `${EventType.getEmoji(CalEvent.type)} - ${CalEvent.title}`;
        this.url = CalEvent.url;
        this.image = { url: EventType.getDefaultImage(CalEvent.type) };
        this.description = new DescriptionMessage(CalEvent.type, CalEvent.isFree, CalEvent.location, CalEvent.start, CalEvent.end).toString();
        this.color = EventType.getColor(CalEvent.type);
    }
}