const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5, // Optional: Set the cooldown in seconds for this command
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
