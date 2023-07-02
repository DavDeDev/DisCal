import { calendar_v3 } from 'googleapis';
import { APIEmbed, APIEmbedImage, APIEmbedThumbnail, CacheType, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, SlashCommandStringOption, TextBasedChannel } from 'discord.js';
import ogs from 'open-graph-scraper';

import { Command, CustomClient } from 'classes';
import { EventType, ICalEvent } from '@/types';
import { EmbedMessage } from '@/classes/EmbedMessage';
import { CalEvent } from '@/classes/CalEvent';
import { OgObject, OpenGraphScraperOptions } from 'open-graph-scraper/dist/lib/types';

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

        // Check if url is valid
        // try {
        //     const url: URL = new URL(interaction.options.getString('url', true));
        // } catch (error) {
        //     await interaction.editReply('🔴 The url you provided is invalid.');
        //     throw new Error('The url you provided is invalid.');
        // }

        const type: EventType = interaction.options.getString('type', true) as EventType;
        const url: string = interaction.options.getString('url', true);
        const isFree: boolean = interaction.options.getBoolean('free', false) ?? true;
        const location: string = interaction.options.getString('location', false) ?? 'Online';


        const options: OpenGraphScraperOptions = {
            'url': url,
            // ? Doesn't work as expected
            // onlyGetOpenGraphInfo: false,
        };
        // ! Retrieve Title, Description, image
        const metaData: OgObject = await ogs(options)
            .then((data) => {
                return data.result;
            }).catch(async (error) => {
                await interaction.editReply(`🔴 ${error.result.error}`);
                throw new Error(`${error.result.error}`);
            });

        console.log(metaData);

        const title: string = metaData.ogTitle ?? '';
        const description: string = metaData.ogDescription ?? '';


        const event = new CalEvent(
            title,
            url,
            type,
            isFree,
            location,
            new Date('2021-10-10T10:00:00-04:00'),
            new Date('2021-10-10T11:00:00-04:00'),
            description,
        );


        const embed: EmbedMessage = new EmbedMessage(event);

        await interaction.editReply({ embeds: [embed] }).then((eee) => eee.react('✅').then(() => eee.react('❌')));


    });
