// JWT is more specific then GoogleAuth => for Service Accounts
import { JWT } from 'google-auth-library';
// Load client secrets from a local file.
import credentials from '@/credentials.json';

/**
 * This functions authenticate the user to access Google Cloud services
 *
 * @returns The Google client connected to GCP services
 */
export async function googleAuth() {
    // Create a new JWT client using the credentials
    const client: JWT = new JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    // Authenticate the client
    await client.authorize();

    return client;
}
