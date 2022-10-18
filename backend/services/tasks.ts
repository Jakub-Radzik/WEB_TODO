import { Task, TaskInput } from '../graphQL/types/task'
import { TaskModel } from '../utils/Mongo/connection'

type TaskService = {
  getTask: (taskId: string) => Promise<Task | null>,
  getUserTasks: (userId: string) => Promise<Task[] | []>,
  createTask: (task: TaskInput) => Promise<Task | null>,
  updateTask: (taskId: string, task: TaskInput) => Promise<Task | null>,
  deleteTask: (taskId: string) => Promise<Task | null>
}

const taskService: TaskService = {
  getTask: async (taskId: string) => {
    return await TaskModel.findById(taskId)
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
