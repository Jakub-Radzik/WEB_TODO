import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';
import {
  GetUserTasksResponse,
  GetUserTasksVariables,
  GET_USER_TASKS,
} from '../graphQL/queries/tasks';

export const useConection = () => {
  const {
    data,
    error,
    refetch: fetchTasks,
  } = useQuery<GetUserTasksResponse, GetUserTasksVariables>(GET_USER_TASKS, {
    variables: { userId: '1' },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return {
    fetchTasks,
  };
};
