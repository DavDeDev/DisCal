import { Client, Collection, ChatInputCommandInteraction, GatewayIntentBits } from 'discord.js';
import { ICommand, ICustomClient } from '@/types';
import { calendar_v3 } from 'googleapis';
import { Command } from '@/classes';

export class CustomClient extends Client implements ICustomClient {
  commands: Collection<Command['data']['name'], Command>;
  countdowns: Collection<Command['data']['name'], Collection<ChatInputCommandInteraction['user']['id'], number>>;
  calendar: calendar_v3.Calendar;

  constructor(
    intents: GatewayIntentBits,
    commands: Collection<string, ICommand> = new Collection(),
    countdowns: Collection<string, Collection<string, number>> = new Collection(),
    calendar: calendar_v3.Calendar,
  ) {
    super({ intents });
    this.commands = commands;
    this.countdowns = countdowns;
    this.calendar = calendar as calendar_v3.Calendar;
  }
}