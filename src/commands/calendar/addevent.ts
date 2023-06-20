import { calendar_v3 } from 'googleapis';
import { APIEmbed, APIEmbedImage, APIEmbedThumbnail, CacheType, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, TextBasedChannel } from 'discord.js';


import { Command, CustomClient } from 'classes';
import { ICalEvent } from '@/types';
import { EmbedMessage } from '@/classes/EmbedMessage';

export const addEvent: Command = new Command(
    __dirname,
    new SlashCommandBuilder()
        .setName('trial')
        .setDescription('Just a test')
    ,
    async (interaction: ChatInputCommandInteraction<CacheType>) => {

        await interaction.deferReply();

        const jsonTrial = {
            type: 'Hackathon',
        };

        const event: ICalEvent = {
            title: 'Test Event',
            url: 'https://www.google.com',
            start: new Date('2021-10-10T10:00:00-04:00'),
            end: new Date('2021-10-10T11:00:00-04:00'),
            location: 'Toronto',
            type: 'Hackathon',
        };

        const embed: EmbedMessage = new EmbedMessage(event);

        await interaction.editReply({ embeds: [embed] }).then((eee) => eee.react("✅").then(() => eee.react("❌")));


    });
