import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { MAXIMUM_RED_PURPLE } from '../design/colors';
import { RAJDHANI } from '../design/fonts';
import { IconButton } from '../elements/button';
import { Task, TasksActions, useTask } from '../hooks/useTasks';
import Delete from '../assets/delete.png';
import Duplicate from '../assets/duplicate.png';
import Edit from '../assets/edit.png';

export const StyledTaskCard = styled.div`
  border: 1px solid black;
  font-family: ${RAJDHANI};
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 30px;
  border: 3px solid ${MAXIMUM_RED_PURPLE};
  box-shadow: 0px 5px 10px 0px ${MAXIMUM_RED_PURPLE};
`;

const TaskTitle = styled.h1`
  text-transform: uppercase;
  font-size: 25px;
  letter-spacing: 1.5px;
`

export const StyledTaskHeader = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ color }) => color};
  width: 100%;
  border-radius: 25px 25px 0 0;
`;

export const TaskContent = styled.div`
  overflow: scroll;
  width: 100%;
  border-top: 3px solid ${MAXIMUM_RED_PURPLE};
  padding: 0 10px;
  box-sizing: border-box;
  text-align: left;
`;

const TaskText = styled.p`
    letter-spacing: 0.5px;
    font-size: 20px;
`

const StyledTasksOperations = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-top: 3px solid ${MAXIMUM_RED_PURPLE};
  width: 100%;
  > * {
    margin: 10px 20px;
  }
`;

type TaskCardProps = {
  task: Task;
};

const TaskCard: FC<TaskCardProps & TasksActions> = ({ task, duplicateTask, deleteTask }) => {
  return (
    <StyledTaskCard>
      <StyledTaskHeader color={task.color}>
        <TaskTitle>{task.title}</TaskTitle>
      </StyledTaskHeader>

      <TaskContent>
        <TaskText>{task.content}</TaskText>
      </TaskContent>
      <StyledTasksOperations>
        <IconButton icon={Edit} onClick={function (): void {
            throw new Error('Function not implemented.');
              } }/>
        <IconButton icon={Duplicate} onClick={()=>duplicateTask(task._id)}/>
        <IconButton icon={Delete} onClick={()=>deleteTask(task._id)}/>
      </StyledTasksOperations>
    </StyledTaskCard>
  );
};

export default TaskCard;
