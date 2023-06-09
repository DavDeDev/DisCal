const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5, // Optional: Set the cooldown in seconds for this command
	category: 'fun', // Optional: Put the command in a category (NOTE: the folder name will be the category name)
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		// ephemeral : true means that only the user who used the command will see the reply
		await interaction.reply({ content: 'Secret Pong!', ephemeral: true }); 
	},
};
