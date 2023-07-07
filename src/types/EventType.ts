/**
 * Enum for event types
 */
export type EventType = 'Hackathon' | 'Workshop' | 'Social' | 'Conference' | 'Other';

/**
 * Constrain certain types for the Event and useful methods
 */
export const EventType = {
    getColor(eventType: EventType): number {
        switch (eventType) {
            case 'Hackathon':
                return 0xd559ff;
            case 'Workshop':
                return 0xf7c22f;
            case 'Social':
                return 0x2d4249;
            case 'Conference':
                return 0x64f3fe;
            default:
                return 0x7e92f7;
        }
    },
    getEmoji(eventType: EventType): string {
        switch (eventType) {
            case 'Hackathon':
                return '🏆';
            case 'Workshop':
                return '📚';
            case 'Social':
                return '🎉';
            case 'Conference':
                return '👔';
            default:
                return '❓';
        }
    },
    /**
     *
     * @param eventType
     * @returns Return the default image for the event type in case no Open Graph image is found
     */
    getDefaultImage(eventType: EventType): string {
        // TODO: implement Google Drive API to retrieve images
        switch (eventType) {
            case 'Hackathon':
                return 'https://i.ibb.co/7jg6wB4/hackathon.png';
            case 'Workshop':
                return 'https://i.ibb.co/gZKFK0Y/workshop.png';
            case 'Social':
                return 'https://i.ibb.co/kDpQbXW/social.png';
            case 'Conference':
                return 'https://i.ibb.co/WPtgDcG/conference.png';
            default:
                return 'https://i.ibb.co/CJr7Vkw/other.png';
        }
    },

};