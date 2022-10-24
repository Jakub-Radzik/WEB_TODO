import { gql } from '@apollo/client';

// -----------------------------------
//                Create Task Mutation
// -----------------------------------
// Variables
export interface CreateTaskVariables {
  input: {
    content: string
    title: string
    color: string
    fontColor: string
    createdAt: string
    updatedAt?: string
    completed: boolean
    userId: string
  };
}

// Response
export interface CreateTaskResponse{
    createTask: {
        _id: string
        content: string
        title: string
        color: string
        fontColor: string
        createdAt: string
        updatedAt: string
        completed: boolean
        userId: string
  };
}

// Mutation
export const CREATE_TASK = gql`
    mutation createTask($input: TaskInput){
    createTask(task: $input){
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
//                Update Task Mutation
// -----------------------------------
// Variables
export interface UpdateTaskVariables {
  taskId: string;
  input: {
    content: string
    title: string
    color: string
    fontColor: string
    createdAt?: string
    updatedAt?: string
    completed?: boolean
    userId?: string
  };
}

// Response
export interface UpdateTaskResponse{
    updateTask: {
        _id: string
        content: string
        title: string
        color: string
        fontColor: string
        createdAt: string
        updatedAt: string
        completed: boolean
        userId: string
  };
}

// Mutation
export const UPDATE_TASK = gql`
  mutation updateTask($input: TaskInput, $taskId: String){
    updateTask(task:$input, taskId: $taskId){
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
//             Duplicate Task Mutation
// -----------------------------------
// Variables
export interface DuplicateTaskVariables {
  taskId: string
}

// Response
export interface DuplicateTaskResponse{
    task: {
        _id: string
        content: string
        title: string
        color: string
        fontColor: string
        createdAt: string
        updatedAt: string
        completed: boolean
        userId: string
  };
}

// Mutation
export const DUPLICATE_TASK = gql`
    mutation duplicateTask($taskId: String){
      duplicateTask(taskId: $taskId){
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
//                Delete Task Mutation
// -----------------------------------
// Variables
export interface DeleteTaskVariables {
  taskId: string
}

// Response
export interface DeleteTaskResponse{
    deleteTask: {
        _id: string
        content: string
        title: string
        color: string
        fontColor: string
        createdAt: string
        updatedAt: string
        completed: boolean
        userId: string
  };
}

// Mutation
export const DELETE_TASK = gql`
    mutation deleteTask($taskId: String){
      deleteTask(taskId: $taskId){
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