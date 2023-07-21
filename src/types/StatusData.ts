/**
 * Organized data from the status command
 */
export type StatusData = {
    /**
     * Heap memory usage in megabytes
     */
    heap: {
        used: number,
        total: number,
    }
    /**
     * RAM memory usage in megabytes
     */
    memory: {
        used: number,
        total: number,
    }
}