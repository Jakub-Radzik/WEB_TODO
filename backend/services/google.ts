import { GaxiosResponse } from 'gaxios';
import {google, oauth2_v2} from 'googleapis';
import { generateAccessToken, GOOGLE_CONFIG, UserModel } from '../utils';
import userService from "../services/users"
import { GoogleAuthResponse } from '../graphQL/types/google';

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
    getTokens: (code: string, jwt: string) => Promise<any>,
    loginWithGoogle: (code: string) => void,
    registerWithGoogle: (userInfo: GaxiosResponse<oauth2_v2.Schema$Userinfo>) => void,
    creteCalendar: () => void,
    addTaskToCalendar: () => void,
    getTasksFromCalendar: () => void,
}

const googleService: GoogleService =  {
    getAuthUrl: async () => {
        return oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
        });
    },
    getTokens: async (code: string, jwt?: string) => {
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
        }else{
            throw Error("Error while fetching Google user information")
        }

        //     //user is not logged to the app
        //     //but have google account
        //     //login or register
        //     if(google_userInfo.data.email){
        //         const app_user = await userService.getUserByGmail(google_userInfo.data.email);
        //         if(app_user){
        //             //login
        //             return {
        //                 token: jwt,
        //                 user: app_user,
        //             }
        //         }else{
        //             //register
        //                 googleService.registerWithGoogle(google_userInfo);
        //             //create user

        //             // return {
        //             //     token: jwt,
        //             //     user: app_user,
        //             // }
        //         }

            // }

    

        // }
        // save tokens to db


        // const userInfo = await oauth2.userinfo.get();

        // console.log(userInfo.data.email);

        // // get user from db
        // const userFromReq = await userService.getUserByToken('eyJhbGciOiJIUzI1NiJ9.cmFkemlrb2w.Gztnvbss3hOELBLOKFOcB59SVmlysWx6v9JjfRKjHVM');
        // console.log(userFromReq?.id);
        // const gmail = userFromReq?.googleEmail;

        // if(gmail != userInfo.data.email){
        //     throw new Error('Other Google Account is connected to App Account');
        // }


        return {
            tokens,
            token: "a",
            user: null
        };
    },
    loginWithGoogle: async(code: string) => {
        // login with google
        // finduser by email we can find if not registerWithGoogle
        // get code and redirect to page on front -> getTokens
    },
    registerWithGoogle: async(userInfo) => {
        console.log(userInfo.data)
        // create dump data user -> connect g-user to him passing email
        // create calendar
        //return tokens to front
    },
    creteCalendar: async() => {
        // create calendar
    },
    addTaskToCalendar: async() => {

    },
    getTasksFromCalendar: async() => {

    }
}

export default googleService;