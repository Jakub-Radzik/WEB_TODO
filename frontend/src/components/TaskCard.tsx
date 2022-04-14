import { FC } from 'react';
import styled from 'styled-components';
import { MAXIMUM_RED_PURPLE } from '../design/colors';
import { Button } from '../elements/button';
import { Task } from '../hooks/useTasks';

type TaskCardProps = {
  task: Task;
};

const StyledTaskCard = styled.div`
  border: 1px solid black;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 30px;
  border: 3px solid ${MAXIMUM_RED_PURPLE};
  box-shadow: 0px 5px 10px 0px ${MAXIMUM_RED_PURPLE};
`;

const StyledTaskHeader = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ color }) => color};
  width: 100%;
  border-radius: 25px 25px 0 0;
`;

const StyledTasksOperations = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  > * {
    margin: 10px;
    flex-grow: 1;
  }
`;

const TaskContent = styled.div`
  overflow: scroll;
  border: 1px solid black;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
`;

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  return (
    <StyledTaskCard>
      <StyledTaskHeader color={task.color}>
        <h3>{task.title}</h3>
        <p>{task.completed ? 'Completed' : 'Not Completed'}</p>
      </StyledTaskHeader>

      <TaskContent>
        <p>{task.content}</p>
      </TaskContent>
      <StyledTasksOperations>
        <Button
          label={'Duplicate'}
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
        <Button
          label={'Delete'}
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </StyledTasksOperations>
    </StyledTaskCard>
  );
};

export default TaskCard;
