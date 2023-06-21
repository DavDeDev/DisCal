# Discord Bot with Google Calendar Integration

This Discord bot is built using Discord.js and integrates with the Google Calendar API. It allows users to read and write events from a Google Calendar directly within a Discord server.
Features

- Create events: Users can create events by using a command in Discord, and the bot will add the event to the specified Google Calendar.
- List events: Users can list upcoming events from the Google Calendar by using a command in Discord.
- Reminder notifications: The bot can send reminder notifications for upcoming events to specified Discord channels.

## Prerequisites

To use this bot, you'll need the following:

- Node.js (version 14 or higher)
- A Discord bot token. You can obtain one by creating a bot on the Discord Developer Portal.
- A Google Cloud project with the Google Calendar API enabled. You'll need to create credentials and obtain a JSON file with the necessary authentication information.

## Installation

- Clone or download the bot's source code from the repository.
- Run npm install to install the required dependencies.
- Create a `.env` file.
- Open `.env` and fill in the required information:
  - DISCORD_TOKEN: Your Discord bot token.
- UPDATES ON GCP...


## Usage

- Invite the bot to your Discord server using the OAuth2 URL generated in the Discord Developer Portal.
- Ensure the bot has the necessary permissions to read and send messages, as well as manage channels if you want to enable reminder notifications.
- Start the bot by running `npm start` in the project directory.
- The bot should now be online and ready to respond to commands in Discord.

## Available Commands

None for now :/

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.
Contributing

Contributions are welcome!

This project is licensed under the MIT License.