import { REST, Routes } from 'discord.js';
import path from 'path';
import dotenv from 'dotenv';

import * as commands from 'commands';
import { Command } from 'classes';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const commandsArray: object[] = [];

for (const [name, command] of Object.entries(commands)) {
    if (command instanceof Command) {
        commandsArray.push(command.data.toJSON());
    }
    else {
        console.warn(`🟡 The command ${name} is not a valid Command`);
    }
}

const rest : REST = new REST().setToken(process.env.DISCORD_TOKEN as string);

/**
 * The main function that deploys the commands to the Discord Server
 */
(async () => {
	try {
		console.log(`🚀 Started refreshing ${commandsArray.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data : any = await rest.put(
            // If you want to deploy commands globally, use the following:
            // Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
			Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID as string, process.env.DISCORD_GUILD_ID as string),
			{ body: commandsArray },
		);
		console.log(`✅ Successfully reloaded ${data.length as number} application (/) commands.`);
	}
	catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();