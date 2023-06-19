import { Interaction } from 'discord.js';
import { ICustomClient } from 'interfaces/ICustomClient';

export default interface IEvent {
    name: string;
    // function to execute when the event is triggered
    execute: (interaction:ICustomClient) => void;
    once?: boolean;
}