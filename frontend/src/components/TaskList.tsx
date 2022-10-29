import React, { FC, useState } from 'react';
import { useReactiveVar } from 'react-reactive-var';
import styled from 'styled-components';
import TaskCard from './TaskCard';
import Loader from '../elements/loader';
import { useTask } from '../hooks/useTasks';
import { tasks } from '../types/vars';
import CreateTaskModal from '../views/modals/components/CreateTaskModal';

const StyledTaskList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 10px;
`;

const TaskList: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isLoading, duplicateTask, deleteTask,toggleCompleted } = useTask();
  const reactiveTasks = useReactiveVar(tasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modifyTaskId, setModifyTaskId] = useState('');

  return (
    <>
      {isLoading && <Loader />}
      <CreateTaskModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        taskId={modifyTaskId}
        title={'Update task'}
      />
      {!isLoading && (
        <StyledTaskList>
          {children}
          {reactiveTasks.map((task, index) => {
            return (
              <TaskCard
                key={index}
                task={task}
                duplicateTask={() => duplicateTask(task._id)}
                deleteTask={() => deleteTask(task._id)}
                modifyTask={() => {
                  setIsModalOpen(true);
                  setModifyTaskId(task._id);
                }}
                toggleCompleted={() => {
                  toggleCompleted(task._id);
                }}  
              />
            );
          })}
        </StyledTaskList>
      )}
    </>
  );
};

export default TaskList;
