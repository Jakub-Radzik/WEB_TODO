import { gql } from '@apollo/client';
import { Task } from '../types/tasks';

// -----------------------------------
//              Query to get all tasks
// -----------------------------------
// Variables
export interface GetUserTasksVariables {
  userId: string;
}

// Response
export interface GetUserTasksResponse {
  userTasks: Task[];
}

// Query
export const GET_USER_TASKS = gql`
  query getAllTasks{
    userTasks{
      _id
      content
      title
      color
      fontColor
      createdAt
      updatedAt
      completed
      userId
    }
  }
`;

// -----------------------------------
//            Query to get single task
// -----------------------------------
// Variables
export interface GetTaskVariables {
  taskId: string;
}

// Response
export interface GetTaskResponse {
  task: Task;
}

// Query
export const GET_TASK = gql`
  query getTask($taskId: String!) {
    task(taskId: $taskId) {
      _id
      content
      title
      color
      fontColor
      createdAt
      updatedAt
      completed
      userId
    }
  }
`;
