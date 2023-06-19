import googleAuth from './calendar';
import { calendar_v3 } from 'googleapis';
import CustomClient from 'classes/CustomClient';
import dotenv from 'dotenv';
import path from 'path';
import { ready } from 'events/ready';
import { Collection, Events } from 'discord.js';
import { JWT } from 'google-auth-library';
import { ICommand } from 'interfaces';
import * as commands from 'commands';
import Command from 'classes/Command';

async function main() {
    dotenv.config({ path: path.resolve(__dirname, '../.env') });

    // Create a new instance of the Google Calendar API
    const calendar: calendar_v3.Calendar | undefined = await googleAuth()
        .then((auth: JWT) => {
            console.log('Google Authenticated');
            return new calendar_v3.Calendar({ auth });
        })
        .catch((error: Error) => {
            throw new Error('Google Authentication failed' + error);
        });

    // Create a collection of commands
    const commandsCollection: Collection<string, ICommand> = new Collection();

    for (const [name, command] of Object.entries(commands)) {
        if (command instanceof Command) {
            commandsCollection.set(command.data.name, command);
        }
        else {
			console.error(`[WARNING] The command ${name} is not a valid Command`);
		}
    }

    const countdowns: Collection<string, Collection<string, number>> = new Collection();
    // Add commands to the client
    const client: CustomClient = new CustomClient(1, commandsCollection, undefined, calendar);

    client.once(ready.name as Events.ClientReady, (...args) => ready.execute(...args));


    await client.login(process.env.DISCORD_TOKEN)
        .then(() => { console.log('Discord logged'); })
        .catch(() => { console.error('Discord login failed'); });
}

main().catch((error) => {
    console.error('Error:', error);
});
