import { Client, Collection, ChatInputCommandInteraction, GatewayIntentBits, IntentsBitField } from 'discord.js';
import { ICommand, ICustomClient } from '@/types';
import { Command, Calendar } from 'classes';

/**
 * Represents the Discord bot client adding properties to the default Client Class.
 */
export class CustomClient extends Client implements ICustomClient {
  /**
   * The collection of commands.
   */
  commands: Collection<Command['data']['name'], Command>;
  /**
   * The collection of countdowns per each command, per each user.
   */
  countdowns: Collection<Command['data']['name'], Collection<ChatInputCommandInteraction['user']['id'], number>>;
  /**
   * The Calendar object which extends the Google Calendar API class.
   * @see https://developers.google.com/calendar
   */
  calendar: Calendar;

  /**
   * Creates a new instance of the CustomClient class.
   * @param intents The intents to use for the client.
   * @param commands The collection of commands.
   * @param countdowns The collection of countdowns per each command, per each user.
   * @param calendar The Google Calendar API.
   */
  constructor(
    intents: IntentsBitField,
    commands: Collection<string, ICommand> = new Collection(),
    countdowns: Collection<string, Collection<string, number>> = new Collection(),
    calendar: Calendar,
  ) {
    super({ intents });
    this.commands = commands;
    this.countdowns = countdowns;
    this.calendar = calendar;
  }
}