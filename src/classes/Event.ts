import { ICustomClient } from '@/interfaces';
import { Interaction } from 'discord.js';
import IEvent from 'interfaces/IEvent';


export default class Event implements IEvent {
    public name: string;
    public once: boolean;
    public execute: (interaction: Interaction | ICustomClient) => Promise<void> | void;
    constructor(name: string, execute: (interaction: Interaction | ICustomClient) => Promise<void> | void, once = false) {
        this.name = name;
        this.once = once;
        this.execute = execute;
    }
}