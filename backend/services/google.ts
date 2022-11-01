import {calendar_v3, google} from 'googleapis';
import { generateAccessToken, GOOGLE_CONFIG, UserModel } from '../utils';
import userService from "../services/users"
import { Credentials, GoogleAuthResponse } from '../graphQL/types/google';
import { GoogleEventInput } from '../graphQL/types/events';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
const scopes = [
    'https://www.googleapis.com/auth/calendar',
    "https://www.googleapis.com/auth/userinfo.email"
];

export const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CONFIG.clientId,
    GOOGLE_CONFIG.clientSecret,
    GOOGLE_CONFIG.redirect,
);

oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
        console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
});


type GoogleService = {
    getAuthUrl: () => Promise<string>,
    getTokens: (code: string) => Promise<GoogleAuthResponse>,
    checkGoogleCalendar: (tokens: Credentials, jwt: string) => Promise<string>
    addTaskToCalendar: (tokens: Credentials, event: GoogleEventInput, jwt: string) =>  Promise<calendar_v3.Schema$Event | undefined>,
    getTasksFromCalendar: (tokens: Credentials, jwt: string) => Promise<calendar_v3.Schema$Event[] | undefined>,
}

const calendarTemplate = {
    requestBody: {
        "description": "WEB TODO APP CALENDAR",
        "summary": "WEB TODO",
    },
};

const googleService: GoogleService =  {
    getAuthUrl: async () => {
        return oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
        });
    },
    getTokens: async (code: string) => {
        const {tokens} = await oauth2Client.getToken(code);
        if(!tokens) throw new Error('No tokens');

        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2',
        });

        const google_userInfo = await oauth2.userinfo.get();

        if(google_userInfo){
            if(google_userInfo.data.email){
                const app_user = await userService.getUserByGmail(google_userInfo.data.email);
                if(app_user){
                    const token = generateAccessToken(app_user.login);
                    if(!token) throw new Error('No token');

                    return {
                        token,
                        tokens,
                        user: app_user,
                    }
                }else{
                    console.log('User not found');
                    const {given_name, family_name, email} = google_userInfo.data;
                    if(!email) throw new Error("Impossible State Error - It is serious");
                    
                    const newUser = await UserModel.create({ 
                        firstName: given_name ?? "user", 
                        lastName:  family_name ?? "user", 
                        login: email, 
                        email, 
                        googleEmail: email
                    });

                    const token = generateAccessToken(newUser.login);
                    if(!token) throw new Error('No token');

                    return {
                        token,
                        tokens,
                        user: newUser
                    }
                }
            }
        }
        throw Error("Error while fetching Google user information")
    },
    checkGoogleCalendar: async (tokens: Credentials, jwt: string) => {
        try{
            oauth2Client.setCredentials({access_token: tokens.access_token});
        }
        catch(err){
            console.log("error z ustawianiem tokenow")
        }
    
        const GOOGLE_CALENDAR = google.calendar({version: 'v3', auth: oauth2Client});
        const calendars = (await GOOGLE_CALENDAR.calendarList.list()).data.items;
        const current_user = await userService.getUserByToken(jwt);
        if(!current_user) throw new Error("User not found");
        const calendarId = current_user.calendarId;
        if(calendars){ //calendars exists
            if(calendarId){ // calendar that we have must exist in google
                const calendar = calendars.find(calendar => calendar.id === calendarId);
                if(!calendar){
                    GOOGLE_CALENDAR.calendars.insert(calendarTemplate).then(({data}) => {
                        if(data && data.id){
                            current_user.calendarId = data.id;
                            current_user.save();
                            return data.id;
                        }
                    }).catch((err)=>console.log(err))
                }
            }else{ // we dont have calendar then create
                GOOGLE_CALENDAR.calendars.insert(calendarTemplate).then(({data}) => {
                    if(data && data.id){
                        current_user.calendarId = data.id;
                        current_user.save();
                        return data.id;
                    }
                }).catch((err)=>console.log(err))
            }
        }

        if(!current_user.calendarId) throw new Error("Calendar not found");
        return current_user.calendarId;
    },
    addTaskToCalendar: async(tokens, event, jwt) => {
        try{
            oauth2Client.setCredentials({access_token: tokens.access_token})
        }
        catch(err){
            console.log("tokens error")
        }

        const GOOGLE_CALENDAR = google.calendar({version: 'v3', auth: oauth2Client});
        const current_user = await userService.getUserByToken(jwt);

        if(!current_user) throw new Error("User not found");

        const calendarId = current_user.calendarId;
        if(!calendarId) throw new Error("Calendar not found");
        const newEvent = await GOOGLE_CALENDAR.events.insert({
            calendarId,
            requestBody: {
                summary: event.summary,
                description: event.description,
                creator: {
                    displayName: current_user.googleEmail,
                    email: current_user.googleEmail,
                },
                organizer: {
                    displayName: current_user.googleEmail,
                    email: current_user.googleEmail
                },
                start:event.start,
                end:event.end,
                colorId: event.colorId,
            }
        });
        if(!newEvent) throw new Error("Event not found");
        console.log(event)
        if(event.isGoogleMeet){
            const response = await GOOGLE_CALENDAR.events.patch({
                calendarId: calendarId,
                eventId: newEvent.data.id!,
                conferenceDataVersion: 1,
                requestBody: {
                    conferenceData: {
                        createRequest: { requestId: uuidv4() },
                    },
                }
             });
             if(!response) return newEvent.data;
             return response.data;
        }

        return newEvent.data;
    },
    getTasksFromCalendar: async(tokens: Credentials, jwt: string) => {
        try{
            oauth2Client.setCredentials({access_token: tokens.access_token})
        }
        catch(err){
            console.log("tokens error")
        }

        const GOOGLE_CALENDAR = google.calendar({version: 'v3', auth: oauth2Client});
        const current_user = await userService.getUserByToken(jwt);
        if(!current_user) throw new Error("User does not exist!");
        const {googleEmail, calendarId} = current_user;

        if(!googleEmail) throw new Error("User does not have connected Google Account");
        if(!calendarId) throw new Error("User does not have available calendar")
        const events = await GOOGLE_CALENDAR.events.list({
            calendarId: calendarId,
            timeMin: (moment().subtract(1, 'days')).toISOString(),
            maxResults: 100,
            singleEvents: true,
            orderBy: 'startTime',
        });
        console.log(events.data.items);
        return events.data.items;
    }
}

export default googleService;