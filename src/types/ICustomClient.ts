import { ChatInputCommandInteraction, Client, Collection } from 'discord.js';
import { calendar_v3 } from 'googleapis';
import { ICommand } from 'types';

export interface ICustomClient extends Client {
  commands?: Collection<ICommand['data']['name'], ICommand>;
  // <key: command name, value: Collection<key: UserID, value: lastUsageTimeStamp>>
  countdowns?: Collection<ICommand['data']['name'], Collection<ChatInputCommandInteraction['user']['id'], number>>;
  calendar?: calendar_v3.Calendar;
}