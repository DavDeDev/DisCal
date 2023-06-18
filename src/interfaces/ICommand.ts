import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface ICommand {
    category: string;
    data: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}