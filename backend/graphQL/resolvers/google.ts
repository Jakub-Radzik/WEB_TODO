import googleService from "../../services/google";

export const getAuthUrl = () => {
    return googleService.getAuthUrl();
}

export const getGoogleTokens = (code: string) => {
    return googleService.getTokens(code);
}