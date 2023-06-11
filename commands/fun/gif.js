const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	category: 'fun',
	data: new SlashCommandBuilder()
	.setName('gif')
	.setDescription('Sends a random gif!')
	.addStringOption(option =>
		option.setName('category')
			.setDescription('The gif category')
			.setRequired(true)
			.addChoices(
				{ name: 'Funny', value: 'gif_funny' },
				{ name: 'Meme', value: 'gif_meme' },
				{ name: 'Movie', value: 'gif_movie' },
			)),
	async execute(interaction) {
		const category = interaction.options.getString('category', true);
        const url  = `https://media.giphy.com/media/Mji4e66iPXDOruTm6W/giphy.gif`         
        await interaction.reply(url);

	},
};
