import { calendar_v3 } from 'googleapis';
import { APIEmbed, APIEmbedImage, APIEmbedThumbnail, CacheType, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, TextBasedChannel } from 'discord.js';


import { Command, CustomClient } from 'classes';

export const getEvents: Command = new Command(
    __dirname,
    new SlashCommandBuilder()
        .setName('get-events')
        .setDescription('Lists the next 10 events')
    ,
    async (interaction: ChatInputCommandInteraction<CacheType>) => {

        await interaction.deferReply();

        const calendar: calendar_v3.Calendar = (interaction.client as CustomClient).calendar;

        const channel: TextBasedChannel = interaction.channel as TextBasedChannel;

        const res = await calendar.events.list({
            calendarId: process.env.EVENTS_CALENDAR_ID,
            // calendarId: 'primary',
            // Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z
            timeMin: new Date().toISOString() as string,
            timeMax: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() as string,
            timeZone: 'Canada/Toronto' as string,
            singleEvents: true as boolean,
            orderBy: 'startTime' as string,
        });


        const events: calendar_v3.Schema$Event[] | undefined = res.data.items;

        if (events === undefined || events.length === 0) {
            console.log('No upcoming events found.');
            await interaction.editReply('No upcoming events found.');
            return;
        }


        await interaction.editReply('Upcoming week\'s events:');
        events.map(async (event) => {
            const embed: APIEmbed = {
                color: 0xf35b05 as number,
                title: event.summary as string,
                url: event.htmlLink as string,
                thumbnail:
                {
                    url: 'https://imgur.com/a/jWsp9WC' as string,
                } as APIEmbedThumbnail,
                description: event.description as string,
                image: {
                    url: 'https://imgur.com/a/jWsp9WC' as string,
                    // width: 100 as number,
                    // height: 100 as number,
                } as APIEmbedImage,
                fields: [
                    {
                        name: 'Start',
                        value: event.start?.dateTime?.toString() as string,
                        inline: true,
                    },
                    {
                        name: 'End',
                        value: event.end?.dateTime?.toString() as string,
                        inline: true,
                    },
                ],
                timestamp: event.created as string,
            };

            // if (event.attendees !== undefined) {
            //     embed.fields?.push({
            //         name: 'Attendees',
            //         value: event.attendees.map((attendee) => attendee.displayName).join('\n'),
            //     });
            // }
            await channel.send({ embeds: [embed] });
        });
    });
