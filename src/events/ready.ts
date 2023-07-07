import { Events } from 'discord.js';

import { ICustomClient, IEvent } from '@/types';

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'

/**
 * Ready event triggered when the client is authenticate
 */
export const ready: IEvent = {
    name: Events.ClientReady,
    execute: (client: ICustomClient) => {
        console.log(`✅ Logged in as ${client.user?.tag}`);
        console.groupEnd();
        console.log('🌑 Setup completed');
    },
    once: true,
};