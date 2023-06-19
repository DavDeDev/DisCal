import { Interaction } from 'discord.js';
import { ICustomClient } from 'interfaces/ICustomClient';

export default interface IEvent {
    name: string;
    execute: (interaction: Interaction | ICustomClient) => Promise<void> | void;
    once?: boolean;
}