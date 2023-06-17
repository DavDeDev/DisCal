import googleAuth from './googleAuth';
import dsAuth from './dsAuth';
import { calendar_v3 } from 'googleapis';
import { Client } from 'discord.js';

// Make an API request (list the user's upcoming events)

async function main() {
    // Load the service account credentials



    // Create a new instance of the Google Calendar API
    const calendar: calendar_v3.Calendar = await googleAuth().catch((error) => {
        console.error('Error:', error);
        return error;
    });

    const client : Client = await dsAuth();
    
}

main().catch((error) => {
    console.error('Error:', error);
});
