import { ICommand } from 'interfaces';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import path from 'path';

export default class Command implements ICommand {
  category: string;
  countdown: number;
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;

  constructor(
    // countdown is the number of seconds to wait before executing the command again
    data: SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>,
    countdown = 10,
  ) {
    // category is always the name of the folder the command is in
    this.category = path.basename(path.resolve(__dirname, '../'));
    this.countdown = countdown;
    this.data = data;
    this.execute = execute;
  }
}