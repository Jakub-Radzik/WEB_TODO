import { makeVar } from 'react-reactive-var';
import { Task } from '../hooks/useTasks';

export const tasks = makeVar<Task[]>([]);
