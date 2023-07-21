import { APIEmbed, APIEmbedAuthor, APIEmbedField } from 'discord.js';
import { CustomClient } from './';
import { StatusData } from '../types';

export class StatusEmbed implements APIEmbed {

    author: APIEmbedAuthor = {
        name: '@DavDeDev',
        url: 'https://github.com/DavDeDev',
    };
    title = '🖥️ Status 🖥️';
    url = 'https://app.pm2.io/bucket/64b9f2c99a8869bf34f86f49/backend/overview/servers';
    fields: APIEmbedField[] = [];


    constructor(client: CustomClient, status: StatusData) {
        this.fields.push(
            {
                name: 'Bot uptime',
                value: client.uptime as unknown as string,
                inline: true,
            },
            {
                name: 'Heap',
                value: this.printProgress(status.heap.used, status.heap.total),
                inline: true,
            },
            {
                name: 'Memory',
                value: this.printProgress(status.memory.used, status.memory.total),
                inline: true,
            },
        );
    }

    printProgress(partialValue: number, totalValue: number): string {
        const percentage = (partialValue / totalValue) * 100;
        const blocks = Math.floor(percentage / 5);
        const fullBlock = '█';
        const darkShade = '▓';
        const lightShade = '░';

        // Build the progress bar
        const progressBar = `${fullBlock.repeat(blocks)}${darkShade}${lightShade.repeat(20 - blocks)}`;

        return `\`\`\`${progressBar} ${percentage.toFixed(2)}%\`\`\``;
    }
}