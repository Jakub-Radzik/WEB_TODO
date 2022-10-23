import { useLazyQuery, useMutation } from '@apollo/client';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CreateTaskResponse, CreateTaskVariables, CREATE_TASK } from '../graphQL/mutations/tasks';
import { GetTaskVariables, GetUserTasksResponse, GET_TASK, GET_USER_TASKS } from '../graphQL/queries/tasks';
import { tasks } from '../types/vars';
import { errorToast, successToast } from '../utils/toasts';
import { CreateTaskProps } from '../views/modals/components/CreateTaskModal';

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
      refetchTask({variables: {taskId: taskId}})
        .then(({ data }) => {
          if(data) {
            return data.task;
          }
          return null;
        })
        .catch(error => {
          setError(error.message);
        }).finally(() => {
          setIsLoading(false);
        });
    },
    [token]
  );


  const [refetchCreateTask] = useMutation<CreateTaskResponse, CreateTaskVariables>(CREATE_TASK);

  const createTask = useCallback(
    async (task: CreateTaskProps) => {

      console.log(task)
      console.log(user)
      setIsLoading(true);
      setError(null);
      refetchCreateTask({variables: {
        input:{
          ...task,
          userId: user?._id!,
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
    async (task_id: string, task: CreateTaskProps) => {
      setIsLoading(true);
      setError(null);
      axios
        .patch(`http://127.0.0.1:5000/api/v1/tasks/${task_id}`, task, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(data => {
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

  const duplicateTask = useCallback(
    async (task_id: string) => {
      setIsLoading(true);
      axios
        .get(`http://127.0.0.1:5000/api/v1/tasks/duplicate/${task_id}`, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        })
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

  const deleteTask = useCallback(
    async (task_id: string) => {
      setIsLoading(true);
      axios
        .delete(`http://127.0.0.1:5000/api/v1/tasks/${task_id}`, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        })
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
