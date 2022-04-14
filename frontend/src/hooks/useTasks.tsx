import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export type Task = {
  _id: string;
  title: string;
  content: string;
  completed: boolean;
  color: string;
};

type GetTasksResponse = {
  tasks: Task[];
};

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
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
        },
      })
      .then(({ data }) => {
        console.log(data.tasks);
        setTasks(data.tasks);
        console.dir(data.tasks);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  useEffect(() => {
    getTasks();
  }, []);

  return {
    tasks,
    isLoading,
    error,
    getTasks,
  };
};
