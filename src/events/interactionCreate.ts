import { Events, Collection } from 'discord.js';

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction : any) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        // Get the collection of cooldowns from the client
        const { cooldowns } = interaction.client;

        // Because we are using the name of the command as the key for the collection of cooldowns, we check if the command name exists in the collection. If it doesn't, we add it along with a new collection of timestamps.
        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection());
        }

        const now = Date.now();
        // We get the collection of <key: UserID, value: timeStamp> for a specific command
        const timestamps = cooldowns.get(command.data.name);
        const defaultCooldownDuration = 3;
        // If the command doesn't have cooldown specified we use the default one
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000; 
        // Convert to milliseconds

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
            }
        }

        // We update the last usage timestamp for the user
        timestamps.set(interaction.user.id, now);
        // We delete the timestamp after the cooldown period ends
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);


        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
        }
        console.log(`Command ${interaction.commandName} was executed.`);
    },
};