import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { calendar_v3 } from 'googleapis';

export interface ICommand {
    countdown: number;
    category: string;
    data: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction, calendar?:calendar_v3.Calendar) => Promise<void>;
}