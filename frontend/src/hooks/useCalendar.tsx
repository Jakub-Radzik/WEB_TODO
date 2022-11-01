import { useLazyQuery, useMutation } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import {
  CheckCaledarResponse,
  CheckCaledarVariables,
  CHECK_CALENDAR,
  CreateEventResponse,
  CreateEventVariables,
  CREATE_EVENT,
} from '../graphQL/mutations/google';
import {
  GetCalendarTasksResponse,
  GetCalendarTasksVariables,
  GET_CALENDAR_TASKS,
} from '../graphQL/queries/google';
import { GoogleEvent, GoogleEventInput } from '../graphQL/types/event';
import useLocalStorage, { Keys } from './useLocalStorage';

export const useCalendar = () => {
  const [checkCalendar] = useMutation<
    CheckCaledarResponse,
    CheckCaledarVariables
  >(CHECK_CALENDAR);
  const [events, setEvents] = useState<GoogleEvent[] | undefined>([]);
  const [calendar, setCalendar] = useLocalStorage<string>(Keys.CALENDAR, null);
  const [access_token,] = useLocalStorage<string>(Keys.ACCESS_TOKEN, null);

  useEffect(() => {
    if (!calendar) {
      if (access_token) {
        console.log("check calendar with: " + access_token)
        checkCalendar({
          variables: {
            input: {
              access_token,
            },
          },
        })
          .then(({ data }) => {
            if (data?.checkGoogleCalendar) {
              setCalendar(data.checkGoogleCalendar);
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  }, [
    access_token,
    calendar,
  ]);

  const [refetchCalendarTasks] = useLazyQuery<
    GetCalendarTasksResponse,
    GetCalendarTasksVariables
  >(GET_CALENDAR_TASKS);

  useEffect(() => {
    if (calendar && access_token) {
      refetchCalendarTasks({
        variables: {
          input: {
            access_token,
          },
        },
      }).then(({ data }) => setEvents(data?.getTasksFromCalendar));
    }
  }, [calendar, access_token]);

  const [refetchCreateEvent] = useMutation<CreateEventResponse, CreateEventVariables>(CREATE_EVENT);
  const createEvent = useCallback(async (formData: GoogleEventInput)=>{
    if(access_token){
      refetchCreateEvent({variables: {
        input: {
          access_token,
        },
        event: formData
      }});
    }
  },[access_token])

  return {
    events,
    createEvent
  };
};
