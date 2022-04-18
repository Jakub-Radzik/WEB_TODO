import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
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

type GetTasksResponse = {
  tasks: Task[];
};

type GetTaskResponse = {
  task: Task;
};

export const useTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();

  const getTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    axios
      .get<GetTasksResponse>('http://127.0.0.1:5000/api/v1/tasks', {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(({ data }) => {
        tasks(data.tasks);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  const getTask = useCallback(
    async (task_id: string) => {
      setIsLoading(true);
      setError(null);
      return axios
        .get<GetTaskResponse>(`http://127.0.0.1:5000/api/v1/tasks/${task_id}`, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(({ data }) => {
          setIsLoading(false);
          return data.task;
        })
        .catch(error => {
          setError(error.message);
        });
    },
    [token]
  );

  const createTask = useCallback(
    async (task: CreateTaskProps) => {
      setIsLoading(true);
      setError(null);
      axios
        .post('http://127.0.0.1:5000/api/v1/tasks', task, {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        })
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
