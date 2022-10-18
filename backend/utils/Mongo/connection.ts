import { Schema, model, connect } from 'mongoose'
import { Task } from '../../graphQL/types/task'
import { MONGO_URI } from '../config/config'

const taskSchema = new Schema<Task>({
  name: { type: String, required: true },
  done: { type: Boolean, required: true },
  userId: { type: String, required: true },
})

export const TaskModel = model<Task>('Task', taskSchema)

mainDB().catch(err => console.log(err))

export async function mainDB() {
  console.log('Connecting to MongoDB...')
  connect(MONGO_URI!)
  console.log(`Connected to ${MONGO_URI}`)
}
