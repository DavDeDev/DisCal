import { Command, CustomClient } from 'classes';
import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';


export const ping: Command = new Command(
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async (interaction: ChatInputCommandInteraction<CacheType>) => {
        const client = interaction.client as CustomClient;
        console.log(client.calendar);
        const calendar = client.calendar;
        // TODO: DELETE THIS

        const res = await calendar.events.list({
            calendarId: 'f609c53be785abc6e830a58fd40659a9673da4ddb9fde7665e0acbfba68430f2@group.calendar.google.com',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
          });
          const events = res.data.items;
          if (!events || events.length === 0) {
            console.log('No upcoming events found.');
            return;
          }
          console.log('Upcoming 10 events:');
          events.map((event, i) => {
            const start = event.start?.dateTime || event.start?.date;
            console.log(`${start} - ${event.summary}`);
          });
        



        //=================================================================================================
        await interaction.reply('Pong!');
    },
    __dirname,
);
