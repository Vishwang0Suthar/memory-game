import axios from 'axios';
import { google } from 'google-auth-library';

export const logDataToGoogleSheet = async (name, entryTime, clicks) => {
    const range = 'Sheet1!A:C';
    const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;

    if (!sheetId) {
        console.error('Missing Google Sheet ID in environment variables.');
        return;
    }

    // Load client secrets from a local file or environment variables
    const credentials = {
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
        redirect_uris: [import.meta.env.VITE_GOOGLE_REDIRECT_URI],
    };

    const token = {
        access_token: import.meta.env.VITE_GOOGLE_ACCESS_TOKEN,
        refresh_token: import.meta.env.VITE_GOOGLE_REFRESH_TOKEN,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        token_type: 'Bearer',
        expiry_date: true, // Set this to the actual expiry date timestamp
    };

    const oAuth2Client = new google.auth.OAuth2(
        credentials.client_id,
        credentials.client_secret,
        credentials.redirect_uris[0]
    );

    oAuth2Client.setCredentials(token);

    const values = [[name, entryTime, clicks]];
    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW`;

    try {
        const response = await axios.post(endpoint, { values }, {
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
        });
        console.log('User data successfully logged to Google Sheet:', response.data.updates);
    } catch (error) {
        if (error.response) {
            console.error('Google Sheets API Error:', error.response.data);
        } else {
            console.error('Error logging data:', error.message);
        }
    }
};
