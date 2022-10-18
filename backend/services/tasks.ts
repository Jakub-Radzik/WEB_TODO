import { Task, TaskInput } from '../graphQL/types/task'
import { TaskModel } from '../utils/Mongo/connection'

// fake DB remove it !!!!!

const taskService = {
  getTask: async (id: string) => {
    return await TaskModel.findById(id)
  },
  getUserTasks: async (userId: string) => {
    return await TaskModel.find({userId});
  },
  createTask: async (task: TaskInput) => {
    return await TaskModel.create({...task});
  },
  updateTask: async (id: string, task: Partial<TaskInput>) => {
    // update after DB creation
    return await TaskModel.updateOne({_id: id}, task)
  }
}

export default taskService
