import { Command, EmbedMessage } from 'classes';
import { CalEvent } from 'classes/CalEvent';
import { EventType } from 'types';
import { SlashCommandBuilder, SlashCommandStringOption, SlashCommandBooleanOption, ChatInputCommandInteraction, CacheType, EmbedBuilder } from 'discord.js';
import { OpenGraphScraperOptions, OgObject } from 'open-graph-scraper/dist/lib/types';

import ogs from 'open-graph-scraper';
import dayjs, { Dayjs } from 'dayjs';


export const addEvent: Command = new Command(
    __dirname,

    // https://discord.com/channels/222078108977594368/824411059443204127/1124741436747813004
    new SlashCommandBuilder()
        .setName('add-event')
        .setDescription('Add an event to the calendar.')
        .addStringOption((option: SlashCommandStringOption) => option
            .setName('url')
            .setDescription('The url of the event.')
            .setRequired(true),
        )
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
            .setName('starttime')
            .setDescription('The start date/time of the event. (Format: YYYY-MM-DD HH:mm)')
            .setRequired(true),
        )
        .addStringOption((option: SlashCommandStringOption) => option
            .setName('endtime')
            .setDescription('The end date/time of the event. (Format: YYYY-MM-DD HH:mm)')
            .setRequired(true),
        )
        .addStringOption((option: SlashCommandStringOption) => option
            .setName('location')
            .setDescription('The location of the event. (Default: Online)')
            .setRequired(false),
        )
        .addBooleanOption((option: SlashCommandBooleanOption) => option
            .setName('free')
            .setDescription('Whether the event is free or not. (Default: Free)')
            .setRequired(false),
        ) as SlashCommandBuilder,

    async (interaction: ChatInputCommandInteraction<CacheType>) => {

        await interaction.deferReply({ ephemeral: true });

        const type: EventType = interaction.options.getString('type', true) as EventType;
        const url: string = interaction.options.getString('url', true);
        const isFree: boolean = interaction.options.getBoolean('free', false) ?? true;
        const location: string = interaction.options.getString('location', false) ?? 'Online';

        // TODO: Integrate OpenAI to get the event schedule from text
        const eventStartDate: Dayjs = dayjs(
            interaction.options.getString('starttime', true),
            ['YYYY-MM-DD HH:mm a', 'YYYY-MM-DD HH:mm A'],
            true,
        );
        console.log(eventStartDate);
        const eventEndDate: Dayjs = dayjs(
            interaction.options.getString('endtime', true),
            ['YYYY-MM-DD HH:mm a', 'YYYY-MM-DD HH:mm A'],
            true,
        );

        // Handle invalid dates
        if (!eventStartDate.isValid() || !eventEndDate.isValid()) {
            await interaction.editReply('🔴 Invalid date format. Please use YYYY-MM-DD HH:mm AM/PM.');
            throw new Error('Invalid date format. Please use YYYY-MM-DD.');
        }
        if (eventStartDate > eventEndDate) {
            await interaction.editReply('🔴 The start date must be before the end date.');
            throw new Error('The start date must be before the end date.');
        }

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
        const image: string = metaData.ogImage?.[0]?.url ?? EventType.getDefaultImage(type);
        console.log(image);

        const event = new CalEvent(
            title,
            url,
            type,
            isFree,
            location,
            eventStartDate.toDate(),
            eventEndDate.toDate(),
        );

        console.log('before embed');
        const embed: EmbedMessage = new EmbedMessage(event, image);
        console.log('after embed');


        await interaction.editReply({ embeds: [embed] });
        // .then(
        //     async (e) => {
        //         e.react('✅');
        //         e.react('❌');
        //     },

        // )
        // .catch(async (error) => {
        //     console.log("error");
        // });

    });
