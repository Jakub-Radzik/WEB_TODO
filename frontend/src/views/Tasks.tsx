import styled from "styled-components";
import TaskCard from "../components/TaskCard";
import { useTask } from "../hooks/useTasks";

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
    const {tasks} = useTask();
    return <StyledTaskList>
        {tasks.map(task => {
            return <TaskCard task={task}/>
        })}
    </StyledTaskList>
}

export default Tasks;