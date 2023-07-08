import { EventType, ICalEvent } from 'types';
import { APIEmbed, APIEmbedAuthor, APIEmbedField, APIEmbedImage, channelLink, inlineCode } from 'discord.js';
import { DescriptionMessage } from './DescriptionMessage';


/**
 * Represent the embed object with Calendar details
 */
export class EmbedMessage implements APIEmbed {
    /**
     * Author is used to display the link of the calendar or to advertise my GitHub XD
     */
    author: APIEmbedAuthor = {
        name: 'Calendar',
        url: process.env.SHAREABLE_LINK_CALENDAR ?? 'https://github.com/DavDeDev',
    };
    color: number;
    title: string;
    url: string;
    description: string;
    image: APIEmbedImage;

    constructor(CalEvent: ICalEvent, image: string = EventType.getDefaultImage(CalEvent.type)) {
        this.title = `${CalEvent.title}`;
        this.url = CalEvent.url;
        // TODO: Add Width and Height
        this.image = { url: image };
        this.description = new DescriptionMessage(CalEvent.type, CalEvent.isFree, CalEvent.location, CalEvent.start, CalEvent.end).toString();
        this.color = EventType.getColor(CalEvent.type);
    }
}