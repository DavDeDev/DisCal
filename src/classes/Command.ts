import { ICommand } from '@/interfaces';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import path from 'path';

export default class Command implements ICommand {
  category: string;
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;

  constructor(
    data: SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>,
  ) {
    // category is always the name of the folder the command is in
    this.category = path.basename(path.resolve(__dirname, '../'));
    this.data = data;
    this.execute = execute;
  }
}