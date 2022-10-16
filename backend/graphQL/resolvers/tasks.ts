import taskService from '../../services/tasks'

export const getTask = (id: string) => {
  console.log('getTask', id)
  return taskService.getTask(id)
}

export const getUserTasks = (userId: string) => {
  console.log('getUsers', userId)
  return taskService.getUserTasks(userId)
}
