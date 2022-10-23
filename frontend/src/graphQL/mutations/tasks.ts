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