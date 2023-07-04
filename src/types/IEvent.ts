/**
 * Represents the Event object with name and whether it should be triggered just once
 */
export interface IEvent {
    name: string;
    // function to execute when the event is triggered
    // TODO: change the type of the parameter to the correct one
    execute: (interaction : any) => void;
    once?: boolean;
}

