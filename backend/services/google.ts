import {google} from 'googleapis';
import { PORT } from '../utils';

const googleConfig = {
    clientId: '185371447283-qnu1956ebbg1upeqo59bhratg6qrb4at.apps.googleusercontent.com',
    clientSecret: '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',
    redirect: `http://localhost:${PORT}/ok`,
};

const scopes = [
    'https://www.googleapis.com/auth/calendar',
];

export const oauth2Client = new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect,
);

oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
        console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
});

interface Credentials {
    refresh_token?: string | null;
    expiry_date?: number | null;
    access_token?: string | null;
    token_type?: string | null;
    id_token?: string | null;
    scope?: string;
}

type GoogleService = {
    getAuthUrl: () => Promise<string>,
    getTokens: (code: string) => Promise<Credentials>,
}

const googleService: GoogleService =  {
    getAuthUrl: async () => {
        return oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
        });
    },
    getTokens: async (code: string) => {
        console.log(code)
        const {tokens} = await oauth2Client.getToken(code);
        console.log(tokens);
        if(!tokens) throw new Error('No tokens');
        // save tokens to db
        oauth2Client.setCredentials(tokens);
        console.log(tokens);
        return tokens;
    },
}

export default googleService;