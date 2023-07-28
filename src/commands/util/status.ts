import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command, CustomClient } from '../../classes';
import { getServerStatus } from '../../util';
import { StatusEmbed } from '../../classes/StatusEmbed';

export const status: Command = new Command(
    __dirname,
    new SlashCommandBuilder()
        .setName('status')
        .setDescription('Get information about the status of the bot.'),
    async (interaction: ChatInputCommandInteraction<CacheType>) => {
        await interaction.reply({
            embeds: [new StatusEmbed(interaction.client as CustomClient, getServerStatus())],
            ephemeral: true,
        });

        // const channel = interaction.channel;
        // console.log(channel?.threads);
    },
);