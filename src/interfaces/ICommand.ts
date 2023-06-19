import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { calendar_v3 } from 'googleapis';

export interface ICommand {
    countdown: number;
    category: string;
    data: SlashCommandBuilder;
}