import { Collection, Events, GatewayIntentBits, IntentsBitField } from 'discord.js';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';
import path from 'path';
import os from 'os';

import { googleAuth } from './util';
import { ready, interactionCreate } from './events';
import { CustomClient, Command, Calendar } from './classes';
import { ICommand } from './types';
import * as commands from './commands';

/**
 * The main function that initializes and runs the application.
 * It performs Google authentication, sets up commands and countdowns,
 * and authenticates the Discord bot.
 */
async function main() {

    console.time('⏱️ Setup completed in');
    console.group('🚀 Start Up...');

    // Load environment variables from .env file
    dotenv.config({ path: path.resolve(__dirname, '../.env') });

    // Create a new instance of the Google Calendar API
    const calendar: Calendar = await googleAuth()
        .then((auth: JWT) => {
            console.log('☁️  Google Authenticated');
            return new Calendar(auth);
        })
        .catch((error: Error) => {
            throw new Error('❌ Google Authentication failed' + error);
        });

    // Create a collection of commands
    const commandsCollection: Collection<string, ICommand> = new Collection();

    // Add valid commands to the commands collection
    for (const [name, command] of Object.entries(commands)) {
        if (command instanceof Command) {
            commandsCollection.set(command.data.name, command);
        }
        else {
            console.warn(`🟡 The command ${name} is not a valid Command`);
        }
    }


    // Create a collection of countdowns
    const countdowns: Collection<string, Collection<string, number>> = new Collection<string, Collection<string, number>>();

    const intents: IntentsBitField = new IntentsBitField().add(GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions);

    // Create a new instance of the Discord Client
    const client: CustomClient = new CustomClient(intents, commandsCollection, countdowns, calendar);

    // Authenticate the Discord bot using the provided token
    await client.login(process.env.DISCORD_TOKEN)
        .then(() => {
            console.log('🤖 Discord Authenticated');
        })
        .catch((error: Error) => {
            throw new Error('❌ Discord Authentication failed: ' + error);
        });

    // Execute the ready event once the client is ready
    client.once(
        ready.name as Events.ClientReady,
        (...args) => {
            ready.execute(...args);
        },
    );

    // Execute the interactionCreate event whenever an interaction occurs
    client.on(
        interactionCreate.name as Events.InteractionCreate,
        (...args) => {
            interactionCreate.execute(...args);
            // check the heap used at every command called
            // console.log(`🪫 Heap Used: ${Math.round(process.memoryUsage().heapUsed / 1048576)} MB
            // Total heap: ${Math.round(process.memoryUsage().heapTotal / 1048576)} MB`);
            // console.log('TOTAL MEMORY ' + (os.totalmem() / 1024 / 1024).toFixed(2) + 'MB');
            // console.log('FREE MEMORY ' + (os.freemem() / 1024 / 1024).toFixed(2) + 'MB');
            // const totalmem = os.totalmem();
            // console.log(process.memoryUsage().heapTotal);
            // console.log(process.memoryUsage().heapUsed);

            // console.log(os.totalmem());
            // console.log(os.totalmem() + process.memoryUsage().heapTotal);
            // console.log('🤚 V8:');
            // console.log(heapStats);
            // console.assert(!Object.values(heapStats).includes(totalmem) && Object.values(heapStats).includes(process.memoryUsage().heapUsed), 'The total memory of the system is not the same as the total memory used by V8.');
            // const cpus = os.cpus();
            // for (let i = 0, len = cpus.length; i < len; i++) {
            //     console.log('CPU %s:', i);
            //     let cpu = cpus[i], total = 0;

            //     for (var type in cpu.times) {
            //         total += cpu.times[type];
            //     }

            //     for (type in cpu.times) {
            //         console.log('\t', type, Math.round(100 * cpu.times[type] / total));
            //     }
            // }
            // console.log(process.cpuUsage());
        },
    );
}

// Call the main function and handle any errors that occur
main().catch((error: Error) => {
    console.error('Error:', error);
});
