import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command, CustomClient } from '../../classes';

export const info: Command = new Command(
    __dirname,
    new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get information about the bot.'),
    async (interaction: ChatInputCommandInteraction<CacheType>) => {
        await interaction.reply({
            embeds: [(interaction.client as CustomClient).getEmbedInfo()],
            ephemeral: true,
        });
    },
);