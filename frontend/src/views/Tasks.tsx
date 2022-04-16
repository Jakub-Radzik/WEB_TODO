import { useReactiveVar } from 'react-reactive-var';
import styled from 'styled-components';
import TaskCard from '../components/TaskCard';
import Loader from '../elements/loader';
import { useTask } from '../hooks/useTasks';
import { tasks } from '../types/vars';

const StyledTaskList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  width: 50%;
  padding: 10px;
`;

const Tasks = () => {
  const { isLoading, duplicateTask, deleteTask } = useTask();
  const reactiveTasks = useReactiveVar(tasks)

  return (
    <StyledTaskList>
      {isLoading && <Loader />}
      {reactiveTasks.map((task, index) => {
        return <TaskCard key={index} task={task} duplicateTask={()=>duplicateTask(task._id)} deleteTask={()=>deleteTask(task._id)} />;
      })}
    </StyledTaskList>
  );
};

export default Tasks;
