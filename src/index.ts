import { Collection, Events } from 'discord.js';
import { JWT } from 'google-auth-library';
import { calendar_v3 } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';

import { googleAuth } from '@/util';
import { CustomClient, Command } from 'classes';
import { ready, interactionCreate } from '@/events';
import { ICommand } from 'types';
import * as commands from 'commands';

async function main() {
    console.group('🚀 Start Up...');
    dotenv.config({ path: path.resolve(__dirname, '../.env') });

    // Create a new instance of the Google Calendar API
    const calendar: calendar_v3.Calendar = await googleAuth()
        .then((auth: JWT) => {
            console.log('☁️  Google Authenticated');
            return new calendar_v3.Calendar({ auth });
        })
        .catch((error: Error) => {
            throw new Error('Google Authentication failed' + error);
        });

    // #region Create a collection of commands
    // Create a collection of commands
    const commandsCollection: Collection<string, ICommand> = new Collection();

    for (const [name, command] of Object.entries(commands)) {
        if (command instanceof Command) {
            commandsCollection.set(command.data.name, command);
        }
        else {
            console.warn(`[WARNING] The command ${name} is not a valid Command`);
        }
    }
    // #endregion

    // Create a collection of countdowns
    const countdowns: Collection<string, Collection<string, number>> = new Collection<string, Collection<string, number>>();
    // Add commands to the client
    const client: CustomClient = new CustomClient(1, commandsCollection, countdowns, calendar);

    await client.login(process.env.DISCORD_TOKEN)
        .then(() => {
            console.log('🤖 Discord Authenticated');
        })
        .catch((error: Error) => {
            throw new Error('Discord Authentication failed' + error);
        });

    client.once(
        ready.name as Events.ClientReady,
        (...args) => ready.execute(...args),
    );
    client.on(
        interactionCreate.name as Events.InteractionCreate,
        (...args) => interactionCreate.execute(...args),
    );
}

main().catch((error: Error) => {
    console.error('Error:', error);
});
