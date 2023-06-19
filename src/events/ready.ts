import { Events } from 'discord.js';

import { ICustomClient, IEvent } from 'interfaces';

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
export const ready: IEvent = {
    name: Events.ClientReady,
    execute: (client: ICustomClient) => { console.log(`Logged in as ${client.user?.tag}!`); },
    once: true,
};