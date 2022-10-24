import { useLazyQuery, useMutation } from '@apollo/client';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CreateTaskResponse, CreateTaskVariables, CREATE_TASK, DeleteTaskResponse, DeleteTaskVariables, DELETE_TASK, DuplicateTaskResponse, DuplicateTaskVariables, DUPLICATE_TASK, UpdateTaskResponse, UpdateTaskVariables, UPDATE_TASK } from '../graphQL/mutations/tasks';
import { GetTaskVariables, GetUserTasksResponse, GET_TASK, GET_USER_TASKS } from '../graphQL/queries/tasks';
import { CreateTaskInput, UpdateTaskInput } from '../graphQL/types/tasks';
import { tasks } from '../types/vars';
import { errorToast, successToast } from '../utils/toasts';

export type TasksActions = {
  duplicateTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  modifyTask: (taskId: string) => void;
};

// REMOVE THIS TYPE BELOW
export type Task = {
  _id: string;
  userId: string;
  title: string;
  content: string;
  completed: boolean;
  color: string;
  fontColor: string;
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
        .finally(() => {
          setIsLoading(false);
        });
    },
    [token]
  );


  const [refetchCreateTask] = useMutation<CreateTaskResponse, CreateTaskVariables>(CREATE_TASK);

  const createTask = useCallback(
    async (task: CreateTaskInput) => {
      setIsLoading(true);
      setError(null);
      console.log(user?._id)
      refetchCreateTask({variables: {
        input:{
          ...task,
          userId: user?._id!,
          completed: false,
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


  const [refetchUpdateTask] = useMutation<UpdateTaskResponse, UpdateTaskVariables>(UPDATE_TASK);
  const updateTask = useCallback(
    async (taskId: string, task: UpdateTaskInput) => {
      setIsLoading(true);
      setError(null);
      refetchUpdateTask({variables: {
          taskId: taskId,
          input: {
            ...task,
            updatedAt: new Date().toISOString(),
          }
        }})
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
