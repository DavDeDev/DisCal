const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  category: "calendar",
  data: new SlashCommandBuilder()
    .setName("add-event")
    .setDescription("Adds an event to the calendar.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("conference")
        .setDescription("Add conference to calendar"),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("hackathon")
        .setDescription("Add hackathon to calendar"),
    ),
  async execute(interaction) {
    // We defer the interaction to ensure the bot doesn't time out
    await wait(2000);
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply(`Event added ${interaction.guild.name}`);
  },
};
