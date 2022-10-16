import { Task, TaskInput } from '../graphQL/types/task'

// fake DB remove it !!!!!
const tasks: Task[] = [
  {
    id: '1',
    name: 'task 1',
    done: false,
    userId: '1',
  },
  {
    id: '2',
    name: 'task 1',
    done: false,
    userId: '1',
  },
  {
    id: '3',
    name: 'task 1',
    done: false,
    userId: '1',
  },
]

const taskService = {
  getTask: (id: string) => {
    return tasks.find(task => task.id === id)
  },
  getUserTasks: (userId: string) => {
    return tasks.filter(task => task.userId === userId)
  },
  createTask: (task: TaskInput) => {
    const newTask = {
      ...task,
      id: (tasks.length + 1).toString(),
    }
    tasks.push(newTask)
    return newTask
  },
}

export default taskService
