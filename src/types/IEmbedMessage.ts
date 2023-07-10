import { APIEmbed } from 'discord.js';

export interface IEmbedMessage extends APIEmbed{

    attendees?: Set<string>;
    absentees?: Set<string>;
}