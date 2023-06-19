import { Command, CustomClient } from 'classes';
import { ChatInputCommandInteraction, Collection, Events } from 'discord.js';
import { IEvent } from 'interfaces';


export const interactionCreate: IEvent = {
    name: Events.InteractionCreate,
    execute: async (interaction: ChatInputCommandInteraction) => {
        const client: CustomClient = interaction.client as CustomClient;
        const command: Command | undefined = client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        const commandName: string = command.data.name;

        const userID : string = interaction.user.id;

        // Get the collection of countdowns from the client
        const { countdowns } = client;

        // Because we are using the name of the command as the key for the collection of countdowns, we check if the command name exists in the collection. If it doesn't, we add it along with a new collection of timestamps.
        if (!countdowns.has(commandName)) {
            countdowns.set(commandName, new Collection<ChatInputCommandInteraction['user']['id'], number>());
        }

        const now: number = Date.now();
        // We get the collection of <key: UserID, value: timeStamp> for a specific command
        const timestamps: Collection<ChatInputCommandInteraction['user']['id'], number> = countdowns.get(commandName) as Collection<ChatInputCommandInteraction['user']['id'], number>;

        const cooldownAmount: number = (command.countdown) * 1000;

        if (timestamps.has(userID)) {
            const timestamp = timestamps.get(userID);
            if (timestamp) {
                const expirationTime : number = cooldownAmount as number + timestamp as number;

                if (now < expirationTime) {
                    const expiredTimestamp : number = Math.round(expirationTime as number / 1000);
                    return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
                }
            }
        }


        // We update the last usage timestamp for the user
        timestamps.set(userID, now);
        // We delete the timestamp after the cooldown period ends
        setTimeout(() => timestamps.delete(userID), cooldownAmount);


        try {
            await command.execute(interaction as ChatInputCommandInteraction);
        } catch (error : unknown) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
        }
        console.log(`Command ${interaction.commandName} was executed.`);
    },
    once: false,
};