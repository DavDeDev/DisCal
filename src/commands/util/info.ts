// import { ICommand } from '../../interfaces/ICommand';

import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from '../../classes';

// class MyCommand implements ICommand {
//   category: string;
//   data: SlashCommandBuilder;

//   constructor(category: string, data: SlashCommandBuilder) {
//     this.category = category;
//     this.data = data;
//   }

//   async execute(interaction: ChatInputCommandInteraction): Promise<void> {
//     // Add your implementation for the execute method here
//   }
// }

export const info: Command = new Command(
    __dirname,
    new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get information about the bot.'),
    async (interaction: ChatInputCommandInteraction<CacheType>) => {
        await interaction.reply({
            content: 'This is a bot made for the [Hackathon Hackers](https://hackathonhackers.com) Discord server.',
            ephemeral: true,
        });
    },
);