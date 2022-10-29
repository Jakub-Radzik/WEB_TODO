import { Types } from 'mongoose'
import { Task, TaskInput } from '../graphQL/types/task'
import { NOW } from '../utils'
import { TaskModel } from '../utils/Mongo/connection'
import userService from './users'

type TaskService = {
  getTask: (taskId: string) => Promise<Task | null>,
  getUserTasks: (userId: string) => Promise<Task[] | []>,
  createTask: (taskInput: TaskInput, jwt: string) => Promise<Task | null>,
  updateTask: (taskId: string, taskInput: TaskInput) => Promise<Task | null>,
  deleteTask: (taskId: string) => Promise<Task | null>
  duplicateTask: (taskId: string) => Promise<Task | null>
  toggleCompleted: (taskId: string) => Promise<Task | null>
}

const taskService: TaskService = {
  getTask: async (taskId: string) => {
    return await TaskModel.findById(taskId)
  },
  getUserTasks: async (userId: string) => {
    return await TaskModel.find({ userId }).sort({ createdAt: -1 })
  },
  createTask: async (taskInput: TaskInput, jwt: string) => {
    const user = await userService.getUserByToken(jwt);
    if (!user) throw new Error('User not found');
    const newTask =  {...taskInput, createdAt: NOW(), userId: user.id, completed: false};
    return await TaskModel.create(newTask)
  },
  updateTask: async (taskId: string, taskInput: Partial<TaskInput>) => {
    const taskUpdate = { ...taskInput, updatedAt: NOW() }
    return await TaskModel.findByIdAndUpdate(taskId, taskUpdate)
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
  },
  toggleCompleted: async (taskId: string) => {
    const task = await TaskModel.findById(taskId);
    if(!task) return null;
    return await TaskModel.findByIdAndUpdate(taskId, { completed: !task.completed })
  }
}

export default taskService;
