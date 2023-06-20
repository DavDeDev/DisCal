
// {
//     "kind": "calendar#event",
//     "etag": "\"3370314625302000\"",
//     "id": "_60q30c1g60o30e1i60o4ac1g60rj8gpl88rj2c1h84s34h9g60s30c1g60o30c1g8kojeca58orj4d1p74o48e9g64o30c1g60o30c1g60o30c1g60o32c1g60o30c1g84pjaci468s3edhg710k8c1k88sjacpk8gsj2h9h6p24ag9p8h10",
//     "status": "confirmed",
//     "htmlLink": "https://www.google.com/calendar/event?eid=XzYwcTMwYzFnNjBvMzBlMWk2MG80YWMxZzYwcmo4Z3BsODhyajJjMWg4NHMzNGg5ZzYwczMwYzFnNjBvMzBjMWc4a29qZWNhNThvcmo0ZDFwNzRvNDhlOWc2NG8zMGMxZzYwbzMwYzFnNjBvMzBjMWc2MG8zMmMxZzYwbzMwYzFnODRwamFjaTQ2OHMzZWRoZzcxMGs4YzFrODhzamFjcGs4Z3NqMmg5aDZwMjRhZzlwOGgxMCBmNjA5YzUzYmU3ODVhYmM2ZTgzMGE1OGZkNDA2NTlhOTY3M2RhNGRkYjlmZGU3NjY1ZTBhY2JmYmE2ODQzMGYyQGc",
//     "created": "2023-05-27T03:15:12.000Z",
//     "updated": "2023-05-27T03:15:12.651Z",
//     "summary": "EthGlobal Waterlooo",
//     "location": " 64 University Ave W, Waterloo, ON N2L 3C7, Canada",
//     "creator": {
//       "email": "pietrocoladavid@gmail.com"
//     },
//     "organizer": {
//       "email": "f609c53be785abc6e830a58fd40659a9673da4ddb9fde7665e0acbfba68430f2@group.calendar.google.com",
//       "displayName": "Events",
//       "self": true
//     },
//     "start": {
//       "dateTime": "2023-06-23T14:00:00-04:00",
//       "timeZone": "America/Toronto"
//     },
//     "end": {
//       "dateTime": "2023-06-25T20:00:00-04:00",
//       "timeZone": "America/Toronto"
//     },
//     "iCalUID": "040000008200E00074C5B7101A82E00800000000E171EF724990D901000000000000000010000000A352D287608AD04B9534D91E16DEA9DB",
//     "sequence": 0,
//     "reminders": {
//       "useDefault": true
//     },
//     "eventType": "default"
//   },\

import { EventType, ICalEvent } from 'types';

export function jsonEventSanitize(json: any): ICalEvent {
    const result: ICalEvent = {
        // We standardize the title on Google Calendar : Type*Title
        title: (json['summary']).split('*')[1] as string,
        url: json['htmlLink'] as string,
        start: new Date(json['start']['dateTime']) as Date,
        end: new Date(json['end']['dateTime']) as Date,
        location: json['location'] as string,
        type: (json['summary']).split('*')[0] as EventType,
    };

    return result;


}