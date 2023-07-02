export type EventType = 'Hackathon' | 'Workshop' | 'Social' | 'Conference' | 'Other';
export const EventType = {
    getColor(eventType: EventType): number {
        switch (eventType) {
            case 'Hackathon':
                return 0xFFA500;
            case 'Workshop':
                return 0x0000FF;
            case 'Social':
                return 0x00FF00;
            case 'Conference':
                return 0x800080;
            default:
                return 0x808080;
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
    getDefaultPicture(eventType: EventType): string {
        return `../../public/images/${eventType.toLowerCase}.png`;
    },

};