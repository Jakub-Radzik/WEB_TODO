import googleService from "../../services/google";
import { GoogleEventInput } from "../types/events";
import { Credentials } from "../types/google";

export const getAuthUrl = () => googleService.getAuthUrl();
export const getGoogleTokens = (code: string) => googleService.getTokens(code);
export const checkGoogleCalendar = (tokens: Credentials, context: {
  [key: string]: string;
}) => googleService.checkGoogleCalendar(tokens, context.authorization);
export const getTasksFromCalendar = (tokens: Credentials, context: {
    [key: string]: string;
  }) => googleService.getTasksFromCalendar(tokens, context.authorization);
export const addTaskToCalendar = (tokens: Credentials, event: GoogleEventInput ,context: {
    [key: string]: string;
  }) => googleService.addTaskToCalendar(tokens, event, context.authorization);