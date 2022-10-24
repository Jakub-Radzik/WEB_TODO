import taskService from '../../services/tasks'
import userService from '../../services/users'
import { TaskInput } from '../types/task'

export const getTask = (id: string) => {
  return taskService.getTask(id)
}

export const getUserTasks = async (context: {
  [key: string]: string;
}) => {
  // TODO: MOVE IT TO SERVICES
  const user = await userService.getUserByToken(context.authorization);
  console.log(user)
  return taskService.getUserTasks(user?.id);
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

export const duplicateTask = (taskId: string) => {
  return taskService.duplicateTask(taskId)
}
