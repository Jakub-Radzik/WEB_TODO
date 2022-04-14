import styled from 'styled-components';
import TaskCard from '../components/TaskCard';
import Loader from '../elements/loader';
import { useTask } from '../hooks/useTasks';

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
  const { tasks, isLoading } = useTask();
  return (
    <StyledTaskList>
      {isLoading && <Loader />}
      {tasks.map((task, index) => {
        return <TaskCard key={index} task={task} />;
      })}
    </StyledTaskList>
  );
};

export default Tasks;
