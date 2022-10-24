export interface Task {
  _id: string;
  userId: string;
  title: string;
  content: string;
  completed: boolean;
  color: string;
  fontColor: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TaskInput {
  title: string;
  content: string;
  completed: boolean;
  color: string;
  fontColor: string;
} 