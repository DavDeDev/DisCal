import { calendar_v3 } from 'googleapis';
import { CacheType, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';


import { Command, CustomClient } from 'classes';

export const list: Command = new Command(
    __dirname,
    new SlashCommandBuilder()
        .setName('list-ten-events')
        .setDescription('Lists the next 10 events'),
    async (interaction: ChatInputCommandInteraction<CacheType>) => {

        await interaction.deferReply();

        const calendar: calendar_v3.Calendar = (interaction.client as CustomClient).calendar;

        const res = await calendar.events.list({
            calendarId: process.env.EVENTS_CALENDAR_ID,
            // calendarId: 'primary',
            timeMin: new Date().toISOString(),  
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });

        const events: calendar_v3.Schema$Event[] | undefined = res.data.items;

        if (events === undefined || events.length === 0) {
            console.log('No upcoming events found.');
            await interaction.editReply('No upcoming events found.');
            return;
        }

        await interaction.editReply('Upcoming 10 events:');
        events.map(async (event) => {
            const start = event.start?.dateTime || event.start?.date;
            console.log(`${start} - ${event.summary}`);
            await interaction.followUp(`${start} - ${event.summary}`);
        });

        // if (!events || events.length === 0) {
        //     console.log('No upcoming events found.');
        //     return;
        // }
        // console.log('Upcoming 10 events:');
        // events.map(async (event) => {
        //     const start = event.start?.dateTime || event.start?.date;
        //     console.log(`${start} - ${event.summary}`);
        //     await interaction.reply(`${start} - ${event.summary}`);
        // });
        // console.log(res);


        // const embed = new EmbedBuilder()
        //     .setTitle('Next Ten Events')
        //     .setColor('#0099ff')
        //     .addFields(
        //         { name: 'Regular field title', value: 'Some value here' }, { name: 'Regular field title', value: 'Some value here' }, { name: 'Regular field title', value: 'Some value here' },
        //     );

        // interaction.followUp({ embeds: [embed] });





        //=================================================================================================
        // await interaction.reply(res.data.items);
    },

);
