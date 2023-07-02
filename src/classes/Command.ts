import { ICommand } from '@/types';
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

import path from 'path';

export class Command implements ICommand {
  category: string;
  countdown: number;
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;

  constructor(
    category: string,
    data:SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>,
    countdown = 10,
  ) {
    // category is always the name of the folder the command is in
    this.category = path.basename(category);
    this.countdown = countdown;
    this.data = data;
    this.execute = execute;
  }
}