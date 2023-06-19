import { ICustomClient } from 'interfaces';
import { Client, Interaction } from 'discord.js';
import { IEvent } from 'interfaces';


export class Event implements IEvent {
    public name: string;
    public once: boolean;
    public execute: (interaction: ICustomClient) => void;
    constructor(name: string, execute: (interaction: Client) => void, once = false) {
        this.name = name;
        this.once = once;
        this.execute = execute;
    }
}