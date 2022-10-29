import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { CheckCaledarResponse, CheckCaledarVariables, CHECK_CALENDAR } from "../graphQL/mutations/google";
import { GetCalendarTasksResponse, GetCalendarTasksVariables, GET_CALENDAR_TASKS } from "../graphQL/queries/google";
import { GoogleEvent } from "../graphQL/types/event";

export const useCalendar = () => {

    const [checkCalendar] = useMutation<CheckCaledarResponse, CheckCaledarVariables>(CHECK_CALENDAR);
    const [events, setEvents] = useState<GoogleEvent[] | undefined>([]);


    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if(!localStorage.getItem('calendar')) {
            if(access_token){
                checkCalendar({variables:{
                    input:{
                        access_token,
                    }
                }})
                .then(({data}) => {
                    if(data?.checkGoogleCalendar){
                        localStorage.setItem('calendar', data.checkGoogleCalendar);
                    }
                })
                .catch((e)=>{console.log(e)})
            }
        }
    }, [localStorage.getItem('access_token'), 
    localStorage.getItem('calendar'),
    localStorage.getItem('refresh_token')]);


    const [refetchCalendarTasks] = useLazyQuery<GetCalendarTasksResponse, GetCalendarTasksVariables>(GET_CALENDAR_TASKS);

    useEffect(()=>{
        const access_token = localStorage.getItem('access_token');
        const calendar = localStorage.getItem('calendar');

        if(calendar && access_token){
            refetchCalendarTasks({variables:{
                input:{
                    access_token
                }
            }}).then(({data}) => setEvents(data?.getTasksFromCalendar));
        }
    },[localStorage.getItem('calendar'), localStorage.getItem('access_token')])

    return {
        events
    };
  };
  