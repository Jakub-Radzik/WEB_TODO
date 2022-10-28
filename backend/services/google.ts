import {calendar_v3, google, oauth2_v2} from 'googleapis';
import { generateAccessToken, GOOGLE_CONFIG, UserModel } from '../utils';
import userService from "../services/users"
import { Credentials, GoogleAuthResponse } from '../graphQL/types/google';

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
    addTaskToCalendar: () => void,
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

        if(calendars){ //calendars exists
            const calendarId = current_user.calendarId;
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
    addTaskToCalendar: async() => {
        
    },
    getTasksFromCalendar: async(tokens: Credentials, jwt: string) => {
        console.log('getTasksFromCalendar');
        console.log(tokens);
        try{
            oauth2Client.setCredentials({access_token: tokens.access_token})
        }
        catch(err){
            console.log("E")
        }

        const GOOGLE_CALENDAR = google.calendar({version: 'v3', auth: oauth2Client});
        const current_user = await userService.getUserByToken(jwt);
        console.log(current_user);
        if(!current_user) throw new Error("User does not exist!");

        const {googleEmail, calendarId} = current_user;

        if(!googleEmail) throw new Error("User does not have connected Google Account");
        if(!calendarId) throw new Error("User does not have available calendar")
        console.log('sss')
        const events = await GOOGLE_CALENDAR.events.list({
            calendarId: calendarId,
            timeMin: (new Date()).toISOString(),
            maxResults: 100,
            singleEvents: true,
            orderBy: 'startTime',
        });
        console.log(events.data.items)
        return events.data.items;
    }
}

export default googleService;