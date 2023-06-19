import { Client, Events } from 'discord.js';
import { Event } from 'classes';
import { ICustomClient } from 'interfaces';

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
export const ready: Event = new Event(
    Events.ClientReady,
    (client: Client) => { console.log(`Logged in as ${client.user?.tag}!`); }
    , true);
