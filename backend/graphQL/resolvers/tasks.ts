import taskService from '../../services/tasks'
import { TaskInput } from '../types/task'

export const getTask = (id: string) => {
  console.log('getTask', id)
  return taskService.getTask(id)
}

export const getUserTasks = (userId: string) => {
  console.log('getUsers', userId)
  return taskService.getUserTasks(userId)
}

export const createTask = (task: TaskInput) => {
  console.log('createTask', task)
  return taskService.createTask(task)
}
