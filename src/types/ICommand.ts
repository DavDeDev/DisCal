import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { calendar_v3 } from 'googleapis';

/**
 * Represents the Command object
 */
export interface ICommand {
    // Countdown specific to the command
    countdown: number;
    // Category equal to the name of the folder
    category: string;
    data: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction, calendar?:calendar_v3.Calendar) => Promise<void>;
}