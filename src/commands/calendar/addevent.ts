import { calendar_v3 } from 'googleapis';
import { APIEmbed, APIEmbedImage, APIEmbedThumbnail, CacheType, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, SlashCommandStringOption, TextBasedChannel } from 'discord.js';


import { Command, CustomClient } from 'classes';
import { ICalEvent } from '@/types';
import { EmbedMessage } from '@/classes/EmbedMessage';

export const addEvent: Command = new Command(
    __dirname,

    // https://discord.com/channels/222078108977594368/824411059443204127/1124741436747813004
    new SlashCommandBuilder()
        .setName('add-event')
        .setDescription('Add an event to the calendar.')
        .addStringOption((option: SlashCommandStringOption) => option
            .setName('type')
            .setDescription('The type of the event.')
            .setRequired(true)
            .addChoices(
                // TODO: Find a way to make this dynamic
                { name: 'Hackathon', value: 'Hackathon' },
                { name: 'Workshop', value: 'Workshop' },
                { name: 'Social', value: 'Social' },
                { name: 'Conference', value: 'Conference' },
                { name: 'Other', value: 'Other' },
            ),
        )
        .addStringOption((option: SlashCommandStringOption) => option
            .setName('url')
            .setDescription('The url of the event.')
            .setRequired(true),
        )
        .addBooleanOption((option: SlashCommandBooleanOption) => option
            .setName('free')
            .setDescription('Whether the event is free or not.')
            .setRequired(false),
        ) as SlashCommandBuilder,

    async (interaction: ChatInputCommandInteraction<CacheType>) => {

        await interaction.deferReply();

        const event: ICalEvent = {
            title: 'Test Event',
            url: 'https://www.google.com',
            start: new Date('2021-10-10T10:00:00-04:00'),
            end: new Date('2021-10-10T11:00:00-04:00'),
            location: 'Toronto',
            type: 'Hackathon',
        };

        const embed: EmbedMessage = new EmbedMessage(event);

        await interaction.editReply({ embeds: [embed] }).then((eee) => eee.react('✅').then(() => eee.react('❌')));


    });
