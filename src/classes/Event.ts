import { ICustomClient } from '@/types';
import { Client } from 'discord.js';
import { IEvent } from '@/types';


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