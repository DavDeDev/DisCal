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
    getDefaultImage(eventType: EventType): string {
        // ! JUST A PLACEHOLDER FOR NOW
        return 'https://media.istockphoto.com/id/1189767041/vector/hackathon-signs-round-design-template-thin-line-icon-concept-vector.jpg?s=612x612&w=0&k=20&c=DW-btIjpNjItFfk35N4KvrMkoGoqd1rEPwb_uV9IZEU='
        // TODO: APIEmbedImage.url doesn't support relative paths -> use attachment
        // return `../../public/images/${eventType.toLowerCase}.png`;
    },

};