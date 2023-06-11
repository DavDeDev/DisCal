const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
	cooldown: 10, // Optional: Set the cooldown in seconds for this command
	category: 'fun', // Optional: Put the command in a category (NOTE: the folder name will be the category name)
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your input!')
        // Consider Options as arguments for a function
        .addStringOption(option => option.setName('input').setDescription('The input to echo back'))
        .addChannelOption(option => option.setName('channel').setDescription('The channel to echo in'))
        .addBooleanOption(option=>option.setName('ephemeral').setDescription('Whether the reply should be ephemeral')),
    async execute(interaction) {
        const input = interaction.options.getString('input');
        const channel = interaction.options.getChannel('channel');
        const ephemeral = interaction.options.getBoolean('ephemeral');
        if(channel) await interaction.reply({content:input,ephemeral:ephemeral});
    }
};
