import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { tasks } from '../types/vars';

export type TasksActions = {
  duplicateTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
};

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
          'Content-Type': 'application/json'
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


  const duplicateTask = useCallback(async (task_id: string)=>{
    setIsLoading(true);
    axios.get(`http://127.0.0.1:5000/api/v1/tasks/duplicate/${task_id}`, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(data=>{
      console.dir(data)
    })
    .then(() => {
      getTasks();
    })
    .catch(error => {
      setError(error.message);
    })
    .finally(async () => {
      setIsLoading(false);
    });
  },[token])


  const deleteTask = useCallback(async (task_id: string)=>{
    setIsLoading(true);
    axios.delete(`http://127.0.0.1:5000/api/v1/tasks/${task_id}`, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(data=>{
      console.dir(data)
    })
    .then(() => {
      getTasks();
    })
    .catch(error => {
      setError(error.message);
    })
    .finally(async () => {
      setIsLoading(false);
    });
  },[token])

  useEffect(() => {
    getTasks();
  }, []);

  return {
    isLoading,
    error,
    getTasks,
    duplicateTask,
    deleteTask,
    tasks
  };
};
