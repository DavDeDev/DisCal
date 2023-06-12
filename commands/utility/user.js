const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user."),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
	// NOTE: for a better UX, Discord gives three seconds to return a reply, otherwise it will show an error message. If your command takes longer you can let them know by deferring the reply.

    const locales = {
      pl: "Witaj Świecie!",
      de: "Hallo Welt!",
    };
    // interaction.locale is the locale of the user who ran the command
    await interaction.reply(
      locales[interaction.locale] ?? "Hello World (default is english)"
    );

    await wait(4000);
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`,
    );
  },
};
