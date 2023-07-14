// JWT is more specific then GoogleAuth => for Service Accounts
import { JWT } from 'google-auth-library';

/**
 * This functions authenticate the user to access Google Cloud services
 *
 * @returns The Google client connected to GCP services
 */
export async function googleAuth() {
    // Create a new JWT client using the credentials
    const client: JWT = new JWT({
        email: process.env.CLIENT_EMAIL,
        // https://stackoverflow.com/a/55459738/18686901
        key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    // Authenticate the client
    await client.authorize();

    return client;
}
