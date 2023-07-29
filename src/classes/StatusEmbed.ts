import { APIEmbed, APIEmbedAuthor, APIEmbedField } from 'discord.js';
import { CustomClient } from '.';
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
                value: `\`\`\`${((client.uptime ?? 1) / 3600000).toFixed(0)} hrs\`\`\``,
                // value: String(client.uptime),
                inline: true,
            },
            {
                name: 'N⁰ of servers',
                value: `\`\`\`${client.guilds.cache.size}\`\`\``,
                // value: String(client.guilds.cache.size),
                inline: true,
            },
            {
                name: 'Heap (MB)',
                value: this.printProgress(status.heap.used, status.heap.total),
            },
            {
                name: 'Memory (MB)',
                value: this.printProgress(status.memory.used, status.memory.total),
            },
        );
    }

    /**
     * Create a visual representation of a percentage
     *
     * @param partialValue
     * @param totalValue
     * @returns
     */
    printProgress(partialValue: number, totalValue: number): string {
        const percentage = (partialValue / totalValue) * 100;
        const blocks = Math.floor(percentage / 10);
        const fullBlock = '█';
        const darkShade = '▓';
        const lightShade = '░';

        // Build the progress bar
        const progressBar = `${fullBlock.repeat(blocks)}${darkShade}${lightShade.repeat(10 - blocks)}`;

        return `${percentage < 85 ? '🟢' : percentage > 98 ? '🔴' : '🟡'} ${progressBar} ${partialValue}/${totalValue} (${percentage.toFixed(2)}%)`;
    }
}