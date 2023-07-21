import os from 'os';
import { StatusData } from '../types';
/**
 *
 * @returns Return the status of the bot and the system where it is running
 */
export function getServerStatus(): StatusData {
    return {
        heap: {
            used: process.memoryUsage().heapUsed,
            total: process.memoryUsage().heapTotal,
        },
        memory: {
            used: os.totalmem() - os.freemem(),
            total: os.totalmem(),
        },
    };
}