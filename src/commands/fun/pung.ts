import { Command } from 'classes';
import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';


export const pung: Command = new Command(
    new SlashCommandBuilder()
        .setName('pung')
        .setDescription('Replies with peng!'),
    async (interaction: ChatInputCommandInteraction<CacheType>) => {
        await interaction.reply('Peng!');
    },
    __dirname,
);