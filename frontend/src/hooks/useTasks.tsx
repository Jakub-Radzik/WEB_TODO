import { useLazyQuery, useMutation } from '@apollo/client';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CreateTaskResponse, CreateTaskVariables, CREATE_TASK, DeleteTaskResponse, DeleteTaskVariables, DELETE_TASK, DuplicateTaskResponse, DuplicateTaskVariables, DUPLICATE_TASK } from '../graphQL/mutations/tasks';
import { GetTaskVariables, GetUserTasksResponse, GET_TASK, GET_USER_TASKS } from '../graphQL/queries/tasks';
import { TaskInput } from '../graphQL/types/tasks';
import { tasks } from '../types/vars';
import { errorToast, successToast } from '../utils/toasts';

export type TasksActions = {
  duplicateTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  modifyTask: (taskId: string) => void;
};

export type Task = {
  _id: string;
  title: string;
  content: string;
  completed: boolean;
  color: string;
  createdAt: string;
  updatedAt?: string;
};

type GetTaskResponse = {
  task: Task;
};

export const useTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const { token } = useAuth();

  const [refetchUserTasks] = useLazyQuery<GetUserTasksResponse>(GET_USER_TASKS);
  const [refetchTask] = useLazyQuery<GetTaskResponse, GetTaskVariables>(GET_TASK);

  const getTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    refetchUserTasks()
      .then(({ data }) => {
        if(data) {
          tasks(data.userTasks);
        }
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  const getTask = useCallback(
    async (taskId: string) => {
      setIsLoading(true);
      setError(null);
      return refetchTask({variables: {taskId: taskId}})
        .then(({ data }) => {
          if(data) {
            return data.task;
          }
          return null;
        })
        .catch(error => {
          setError(error.message);
        })
        
        // .finally(() => {
        //   setIsLoading(false);
        // });
    },
    [token]
  );


  const [refetchCreateTask] = useMutation<CreateTaskResponse, CreateTaskVariables>(CREATE_TASK);

  const createTask = useCallback(
    async (task: TaskInput) => {
      setIsLoading(true);
      setError(null);
      refetchCreateTask({variables: {
        input:{
          ...task,
          userId: user?._id!,
          createdAt: new Date().toISOString(),
        }
      }})
        .then(() => {
          successToast(`Task successfully created`);
        })
        .then(() => {
          getTasks();
        })
        .catch(error => {
          errorToast(error.message);
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [token, getTasks]
  );

  const updateTask = useCallback(
    async (task_id: string, task: Task) => {
      setIsLoading(true);
      setError(null);
      axios
        .patch(`http://127.0.0.1:5000/api/v1/tasks/${task_id}`, task, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          successToast(`Task successfully updated`);
        })
        .then(() => {
          getTasks();
        })
        .catch(error => {
          errorToast(error.message);
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [token, getTasks]
  );

  const [refetchDuplicateTask] = useMutation<DuplicateTaskResponse, DuplicateTaskVariables>(DUPLICATE_TASK);
  const duplicateTask = useCallback(
    async (taskId: string) => {
      setIsLoading(true);
        refetchDuplicateTask({variables:{taskId}})
        .then(() => {
          successToast(`Task successfully duplicated`);
        })
        .then(() => {
          getTasks();
        })
        .catch(error => {
          errorToast(error.message);
          setError(error.message);
        })
        .finally(async () => {
          setIsLoading(false);
        });
    },
    [token, getTasks]
  );

  const [refetchDeleteTask] = useMutation<DeleteTaskResponse, DeleteTaskVariables>(DELETE_TASK);
  const deleteTask = useCallback(
    async (taskId: string) => {
      setIsLoading(true);
      refetchDeleteTask({variables:{taskId}})
        .then(() => {
          successToast(`Task successfully deleted`);
        })
        .then(() => {
          getTasks();
        })
        .catch(error => {
          errorToast(error.message);
          setError(error.message);
        })
        .finally(async () => {
          setIsLoading(false);
        });
    },
    [token, getTasks]
  );

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return {
    isLoading,
    error,
    getTasks,
    getTask,
    duplicateTask,
    deleteTask,
    createTask,
    updateTask,
    tasks,
  };
};
