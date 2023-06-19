import Command from 'classes/Command';
import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';


export const ping = new Command(5,
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async (interaction: ChatInputCommandInteraction<CacheType>) => {
        await interaction.reply('Pong!');
    },
);