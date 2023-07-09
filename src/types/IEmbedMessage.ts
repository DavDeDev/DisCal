import { APIEmbed } from 'discord.js';

export interface IEmbedMessage extends APIEmbed{

    attendees?: string[];
    absentees?: string[];
}