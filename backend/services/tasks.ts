import { Task, TaskInput } from '../graphQL/types/task'
import { TaskModel } from '../utils/Mongo/connection'

// fake DB remove it !!!!!

const taskService = {
  getTask: async (id: string) => {
    return await TaskModel.findById(id)
  },
  getUserTasks: async (userId: string) => {
    return await TaskModel.find({ userId })
  },
  createTask: async (task: TaskInput) => {
    return await TaskModel.create({ ...task })
  },
  updateTask: async (taskId: string, task: Partial<TaskInput>) => {
    return await TaskModel.findByIdAndUpdate(taskId, task)
  },
  deleteTask: async (taskId: string) => {
    return await TaskModel.findByIdAndRemove(taskId)
  },
}

export default taskService
