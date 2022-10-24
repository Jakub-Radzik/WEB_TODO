import { Types } from 'mongoose'
import { Task, TaskInput } from '../graphQL/types/task'
import { NOW } from '../utils'
import { TaskModel } from '../utils/Mongo/connection'

type TaskService = {
  getTask: (taskId: string) => Promise<Task | null>,
  getUserTasks: (userId: string) => Promise<Task[] | []>,
  createTask: (task: TaskInput) => Promise<Task | null>,
  updateTask: (taskId: string, task: TaskInput) => Promise<Task | null>,
  deleteTask: (taskId: string) => Promise<Task | null>
  duplicateTask: (taskId: string) => Promise<Task | null>
}

const taskService: TaskService = {
  getTask: async (taskId: string) => {
    return await TaskModel.findById(taskId)
  },
  getUserTasks: async (userId: string) => {
    return await TaskModel.find({ userId }).sort({ createdAt: -1 })
  },
  createTask: async (task: TaskInput) => {
    task.createdAt  = NOW();
    return await TaskModel.create({ ...task })
  },
  updateTask: async (taskId: string, task: Partial<TaskInput>) => {
    task.updatedAt = NOW();
    return await TaskModel.findByIdAndUpdate(taskId, task)
  },
  deleteTask: async (taskId: string) => {
    return await TaskModel.findByIdAndRemove(taskId)
  },
  duplicateTask: async (taskId: string) => {
    const task = await TaskModel.findById(taskId);
    if(!task) return null;
    return await TaskModel.create({ ...task.toObject(),
       _id: new Types.ObjectId() ,
       createdAt: NOW(),
       completed: false,
      });
  }
}

export default taskService;
