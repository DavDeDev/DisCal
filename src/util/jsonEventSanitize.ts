import { EventType, ICalEvent } from 'types';

export function jsonEventSanitize(json : any): ICalEvent {

    console.log('%j', json);

    const result: ICalEvent = {
        // We standardize the title on Google Calendar : Type*Title
        title: (json['summary']).split('*')[1] as string,
        url: json['htmlLink'] as string,
        isFree: true,
        // TODO: Handle full day events
        // ISO Date format
        start: new Date(json['start']['dateTime']) as Date,
        end: new Date(json['end']['dateTime']) as Date,
        location: json['location'] as string,
        type: (json['summary']).split('*')[0] as EventType,
    };

    return result;
}