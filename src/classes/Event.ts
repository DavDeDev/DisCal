import { ICustomClient, IEvent } from 'types';
import { Client } from 'discord.js';

export class Event implements IEvent {
    public name: string;
    public once: boolean;
    public execute: (interaction: ICustomClient) => void;
    constructor(name: string, execute: (interaction: Client) => void, once = false) {
        this.name = name;
        this.execute = execute;
        this.once = once;
    }
}