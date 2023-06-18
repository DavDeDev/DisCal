import { Client, Collection, ClientOptions } from 'discord.js';
import { calendar_v3 } from 'googleapis';

export class CustomClient extends Client {
  commands: Collection<string, any>;
  cooldowns: Collection<string, any>;
  calendar: calendar_v3.Calendar;
  constructor(intents: ClientOptions, calendar: calendar_v3.Calendar) {
    super(intents);
    this.commands = new Collection();
    this.cooldowns = new Collection();
    this.calendar = calendar;
  }
}

