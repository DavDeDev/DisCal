import { EventType, ICalEvent, IEmbedMessage } from 'types';
import { APIEmbed, APIEmbedAuthor, APIEmbedField, APIEmbedImage, channelLink, inlineCode } from 'discord.js';
import { DescriptionMessage } from './DescriptionMessage';


/**
 * Represent the embed object with Calendar details
 */
export class EmbedMessage implements IEmbedMessage {
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
    attendees: Set<string> = new Set();
    absentees: Set<string> = new Set();
    fields: APIEmbedField[] = [
        {
            name: 'Attendees',
            value: '> ' + Array(...this.attendees).join('\n> '),
            inline: true,
        },
        {
            name: 'Absentees',
            value: '> ' + Array.from(this.absentees).join('\n> '),
            inline: true,
        }];

    image: APIEmbedImage;

    constructor(CalEvent: ICalEvent, image: string = EventType.getDefaultImage(CalEvent.type)) {
        this.title = `${CalEvent.title}`;
        this.url = CalEvent.url;
        this.image = { url: image };
        this.description = new DescriptionMessage(CalEvent.type, CalEvent.isFree, CalEvent.location, CalEvent.start, CalEvent.end).toString();
        this.color = EventType.getColor(CalEvent.type);
    }
    markAttendance(person: string) {
        this.attendees.add(person);
        this.absentees.delete(person);
    }

    markAbsence(person: string) {
        this.absentees.add(person);
        this.attendees.delete(person);
    }
}