import { Client, Collection, ChatInputCommandInteraction, GatewayIntentBits } from 'discord.js';
import { ICommand, ICustomClient } from '@interfaces/index';
import { calendar_v3 } from 'googleapis';

export default class CustomClient extends Client implements ICustomClient {
  commands: Collection<ICommand['data']['name'], ICommand>;
  countdowns: Collection<ICommand['data']['name'], Collection<ChatInputCommandInteraction['user']['id'], number>>;
  calendar: calendar_v3.Calendar;

  constructor(intents: GatewayIntentBits, commands: Collection<string, ICommand>, countdowns: Collection<string, Collection<string, number>>, calendar: calendar_v3.Calendar) {
    super({ intents });
    this.commands = commands ?? new Collection();
    this.countdowns = countdowns ?? new Collection();
    this.calendar = calendar as calendar_v3.Calendar;
  }
}
