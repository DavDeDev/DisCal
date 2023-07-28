import { Command, EventEmbed, CalEvent, CustomClient } from '../../classes';
import { EventType } from '../../types';
import { SlashCommandBuilder, SlashCommandStringOption, SlashCommandBooleanOption, ChatInputCommandInteraction, CacheType, ButtonStyle, ButtonBuilder, ActionRowBuilder, Message, CollectorFilter, ReactionCollector, GuildScheduledEventCreateOptions } from 'discord.js';
import { OpenGraphScraperOptions, OgObject } from 'open-graph-scraper/dist/lib/types';

import ogs from 'open-graph-scraper';
import dayjs, { Dayjs } from 'dayjs';


/**
 * Add an event to the calendar and generate the embed message.
 */
export const addEvent: Command = new Command(
    __dirname,

    // https://discord.com/channels/222078108977594368/824411059443204127/1124741436747813004
    new SlashCommandBuilder()
        .setName('new-event')
        .setDescription('Add an event to the calendar.')
        .addStringOption((option: SlashCommandStringOption) => option
            .setName('url')
            .setDescription('🔗 url of the event')
            .setRequired(true),
        )
        .addStringOption((option: SlashCommandStringOption) => option
            .setName('type')
            .setDescription('🧑‍💻 type of the event')
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
            .setName('start_time')
            .setDescription('🕑 start timestamp of the event 📢 Format: YYYY-MM-DD HH:mm')
            .setRequired(true),
        )
        .addStringOption((option: SlashCommandStringOption) => option
            .setName('end_time')
            .setDescription('🕝 end timestamp of the event 📢 Format: YYYY-MM-DD HH:mm')
            .setRequired(true),
        )
        .addStringOption((option: SlashCommandStringOption) => option
            .setName('location')
            .setDescription('📍 location of the event (Default: Online)')
            .setRequired(false),
        )
        .addStringOption((option: SlashCommandStringOption) => option
            .setName('title')
            .setDescription('name of the event (By default, the title is retrieved from the url)')
            .setRequired(false),
        )
        .addBooleanOption((option: SlashCommandBooleanOption) => option
            .setName('free')
            .setDescription('free or not? (Default: Free)')
            .setRequired(false),
        ) as SlashCommandBuilder,

    async (interaction: ChatInputCommandInteraction<CacheType>) => {

        await interaction.deferReply({ ephemeral: true });

        console.log('Add-event options:');
        console.table((interaction.options as any)._hoistedOptions);

        const type: EventType = interaction.options.getString('type', true) as EventType;
        const url: string = interaction.options.getString('url', true);
        const isFree: boolean = interaction.options.getBoolean('free', false) ?? true;
        const location: string = interaction.options.getString('location', false) ?? 'Online';

        const ogOptions: OpenGraphScraperOptions = {
            'url': url,
            // ? Doesn't work as expected
            // onlyGetOpenGraphInfo: false,
        };
        // ! Retrieve Title, Description, image
        const metaData: OgObject = await ogs(ogOptions)
            .then((data) => {
                return data.result;
            }).catch(async (error) => {
                // Invalid url is caught here
                await interaction.editReply(`🔴 ${error.result.error}`);
                throw new Error(`${error.result.error}`);
            });

        // TODO: Integrate OpenAI to get the event schedule from text
        const eventStartDate: Dayjs = dayjs(
            interaction.options.getString('start_time', true),
            ['YYYY-MM-DD HH:mm a', 'YYYY-MM-DD HH:mm A'],
            false,
        );

        const eventEndDate: Dayjs = dayjs(
            interaction.options.getString('end_time', true),
            ['YYYY-MM-DD HH:mm a', 'YYYY-MM-DD HH:mm A'],
            false,
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


        const title: string = interaction.options.getString('title', false) ?? metaData.ogTitle ?? 'Not retrieved';

        let image: string;
        // If the image is not found, use the default image
        try {
            image = new URL(metaData.ogImage?.[0]?.url ?? '').toString();
        }
        catch (error) {
            image = new URL(EventType.getDefaultImage(type)).toString();
        }
        // console.log(image);

        const event: CalEvent = new CalEvent(
            title,
            url,
            type,
            isFree,
            location,
            eventStartDate.toDate(),
            eventEndDate.toDate(),
        );

        const embed: EventEmbed = event.toEmbedMessage(image);

        // Confirm button
        const confirmButton = new ButtonBuilder()
            .setCustomId('send')
            .setLabel('Send')
            .setStyle(ButtonStyle.Success);

        // Cancel button
        const cancelButton = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary);


        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(confirmButton, cancelButton);

        const response: Message<boolean> = await interaction.editReply(
            { content: 'Confirm your choice', embeds: [embed], components: [row] },
        );

        const buttonCollectorFilter: CollectorFilter<any> = (i: any) => {
            i.deferUpdate();
            return !i.user.bot && i.user.id === interaction.user.id;
        };

        const confirmation = await response.awaitMessageComponent({ time: 30_000, filter: buttonCollectorFilter })
            .catch(async () => {
                await interaction.editReply(
                    { content: '❌ Confirmation not received within 30 seconds, cancelling...', embeds: [], components: [] },
                );
                throw new Error('Confirmation not received within 30 seconds, cancelling...');
            });

        if (confirmation.customId === 'send') {
            //TODO: Uncomment this when the calendar is ready
            await (interaction.client as CustomClient).calendar.insertEvent(event.toGoogleCalendarEvent());
            await interaction.editReply({ content: `✅ [Event](<${url}>) added to the calendar.`, embeds: [], components: [] });
        }
        else if (confirmation.customId === 'cancel') {
            await interaction.editReply({ content: '❌ Cancelled.', embeds: [], components: [] });
            return;
        }

        const message: Message = await interaction.followUp({ embeds: [embed] });

        const reactionCollectorFilter: CollectorFilter<any> = (reaction, user) => {
            return user.bot === false && (reaction.emoji.name === '✅' || reaction.emoji.name === '❌');
        };

        // Create a collector until the start date of the event
        const timer = (eventStartDate.diff(dayjs()) < 2147483647) ? eventStartDate.diff(dayjs()) : undefined;
        const collector: ReactionCollector = message.createReactionCollector({ filter: reactionCollectorFilter, time: timer });

        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === '✅') {
                message.reactions.cache.get('❌')?.users.remove(user.id);
                embed.markAttendance(user.id);
                await message.edit({ embeds: [embed] });
            }
            else if (reaction.emoji.name === '❌') {
                message.reactions.cache.get('✅')?.users.remove(user.id);
                embed.markAbsence(user.id);
                await message.edit({ embeds: [embed] });
            }
        });

        const thread = await message.startThread({
            name: `${eventStartDate.format('MMM D, YYYY h:mm A')} - ${title}`,
            reason: `Event thread for ${type} - ${title}`,
        });

        await interaction.guild?.scheduledEvents.create(event.toDiscordScheduledEvent(image, thread.url));

        await message.react('✅');
        await message.react('❌');
    },
);
