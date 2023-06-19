import { Command } from 'classes';
import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';


export const ping: Command = new Command(
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async (interaction: ChatInputCommandInteraction<CacheType>) => {
        await interaction.reply('Pong!');
    },
);
