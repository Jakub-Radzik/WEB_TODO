import { useState } from 'react';
import { useReactiveVar } from 'react-reactive-var';
import styled from 'styled-components';
import TaskCard from '../components/TaskCard';
import Loader from '../elements/loader';
import { useTask } from '../hooks/useTasks';
import { tasks } from '../types/vars';
import CreateTaskModal from './modals/components/CreateTaskModal';

const StyledTaskList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 10px;
`;

const Tasks = () => {
  const { isLoading, duplicateTask, deleteTask } = useTask();
  const reactiveTasks = useReactiveVar(tasks)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modifyTaskId, setModifyTaskId] = useState('');

  return (
    <StyledTaskList>
      {isLoading && <Loader />}
      <CreateTaskModal isOpen={isModalOpen} onRequestClose={()=>setIsModalOpen(false)} taskId={modifyTaskId}/>
      {reactiveTasks.map((task, index) => {
        return <TaskCard key={index} task={task} duplicateTask={()=>duplicateTask(task._id)} deleteTask={()=>deleteTask(task._id)} modifyTask={()=>{setIsModalOpen(true); setModifyTaskId(task._id)}}/>;
      })}
    </StyledTaskList>
  );
};

export default Tasks;
