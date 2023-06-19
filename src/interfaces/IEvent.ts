import { ICustomClient } from 'interfaces/ICustomClient';

export interface IEvent {
    name: string;
    // function to execute when the event is triggered
    execute: (interaction:ICustomClient) => void;
    once?: boolean;
}

