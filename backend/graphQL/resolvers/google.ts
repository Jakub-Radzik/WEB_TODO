import googleService from "../../services/google";

export const getAuthUrl = () => {
    return googleService.getAuthUrl();
}

export const getGoogleTokens = (code: string, context: {
    [key: string]: string;
  } ) => {
    return googleService.getTokens(code, context.authorization);
}