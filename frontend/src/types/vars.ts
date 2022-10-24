import { makeVar } from 'react-reactive-var';
import { Task } from '../graphQL/types/tasks';

export const tasks = makeVar<Task[]>([]);
