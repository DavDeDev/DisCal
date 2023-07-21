import os from 'os';
import { StatusData } from '../types';
/**
 *
 * @returns The status of the bot and the system where it is running
 */
export function getServerStatus(): StatusData {
    return {
        heap: {
            /**
             * convert bytes to megabytes and round it
             */
            used: Math.round(process.memoryUsage().heapUsed / 1000000),
            total: Math.round(process.memoryUsage().heapTotal / 1000000),
        },
        memory: {
            /**
             * convert bytes to megabytes and round it
             */
            used: Math.round((os.totalmem() - os.freemem()) / 1000000),
            total: Math.round(os.totalmem() / 1000000),
        },
    };
}