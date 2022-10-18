import taskService from '../../services/tasks'
import { TaskInput } from '../types/task'

export const getTask = (id: string) => {
  return taskService.getTask(id)
}

export const getUserTasks = (userId: string) => {
  return taskService.getUserTasks(userId)
}

export const createTask = (task: TaskInput) => {
  return taskService.createTask(task)
}

export const updateTask = (taskId: string, task: TaskInput) => {
  return taskService.updateTask(taskId, task)
}

export const deleteTask = (taskId: string) => {
  return taskService.deleteTask(taskId)
}
