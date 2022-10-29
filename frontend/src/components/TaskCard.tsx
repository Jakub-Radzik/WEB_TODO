import { FC, useState } from 'react';
import styled from 'styled-components';
import { MAXIMUM_RED_PURPLE } from '../design/colors';
import { RAJDHANI } from '../design/fonts';
import { IconButton } from '../elements/button';
import { TasksActions } from '../hooks/useTasks';
import Delete from '../assets/delete.png';
import Duplicate from '../assets/duplicate.png';
import Edit from '../assets/edit.png';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import Information from '../assets/information.png';
import { Task } from '../graphQL/types/tasks';
import { PrimaryText } from '../elements/text';

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
  box-shadow: 1px 3px 2px 0 ${MAXIMUM_RED_PURPLE};
`;

export const TaskTitle = styled.h1`
  text-transform: uppercase;
  font-size: 25px;
  letter-spacing: 1.5px;
`;

export const StyledTaskHeader = styled.div<{ color: string }>`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ color }) => color};
  width: 100%;
  border-radius: 25px 25px 0 0;
`;

export const TaskContent = styled.div`
  overflow: hidden;
  width: 100%;
  border-top: 3px solid ${MAXIMUM_RED_PURPLE};
  padding: 0 10px;
  box-sizing: border-box;
  text-align: left;
`;

const TaskText = styled.p`
  letter-spacing: 0.5px;
  font-size: 20px;
`;

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

const Info = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 30px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 100%;
`;

type TaskCardProps = {
  task: Task;
};

const TaskCard: FC<TaskCardProps & TasksActions> = ({
  task,
  duplicateTask,
  deleteTask,
  modifyTask,
  toggleCompleted,
}) => {
  const tooltipInfo = () => {
    if (task.updatedAt) {
      return `Created at: ${moment(task.createdAt).format(
        'DD/MM/YYYY HH:mm'
      )} Last modification: ${moment(task.updatedAt).format(
        'DD/MM/YYYY HH:mm'
      )}`;
    }
    return `Created at: ${moment(task.createdAt).format('DD/MM/YYYY HH:mm')}`;
  };

  const [completed, setCompleted] = useState(task.completed);
  const [disabled, setDisabled] = useState(false);
  const completeHandler = () => {
    setDisabled(true);
    setCompleted(!completed);
    toggleCompleted();
    setTimeout(() => {
      setDisabled(false);
    }, 500);
  }

  return (
    <StyledTaskCard>
      <ReactTooltip type="info" backgroundColor={MAXIMUM_RED_PURPLE} />
      <StyledTaskHeader color={task.color} style={{flexDirection:'row', justifyContent: 'flex-start', paddingLeft:10, boxSizing:'border-box'}}>
        <input type="checkbox" name="completed" id="completed" style={{marginRight: 10}} checked={completed} onChange={completeHandler} disabled={disabled} />
        <TaskTitle style={{color: task.fontColor}}>{task.title}</TaskTitle>
        <Info src={Information} alt="info" data-tip={tooltipInfo()} />
      </StyledTaskHeader>

      {completed ? (
        <div style={{width:'100%', position:'relative'}}>
          <div style={{position: 'absolute', zIndex:1, left:0, right:0, display:'flex', flexDirection:'column', alignItems:'center'}}>
            <PrimaryText color={task.fontColor} style={{margin:'20px 0 0 0'}}>Task is done</PrimaryText>
            <IconButton icon={Delete} onClick={() => deleteTask(task._id)} />
          </div>
          <div style={{
            width: '100%',
            filter: 'blur(5px)',
            backgroundColor: task.color,
            opacity: 0.5,
            borderRadius: '0 0 30px 30px'
          }}>
          <TaskContent>
            <TaskText>{task.content}</TaskText>
          </TaskContent>
          <StyledTasksOperations>
            <IconButton icon={Edit} onClick={() => modifyTask(task._id)} />
            <IconButton icon={Duplicate} onClick={() => duplicateTask(task._id)} />
            <IconButton icon={Delete} onClick={() => deleteTask(task._id)} />
          </StyledTasksOperations>
          </div>
        </div>
      ) : (
        <>
      <TaskContent>
        <TaskText>{task.content}</TaskText>
      </TaskContent>
      <StyledTasksOperations>
        <IconButton icon={Edit} onClick={() => modifyTask(task._id)} />
        <IconButton icon={Duplicate} onClick={() => duplicateTask(task._id)} />
        <IconButton icon={Delete} onClick={() => deleteTask(task._id)} />
      </StyledTasksOperations>
      </>
      )}


    </StyledTaskCard>
  );
};

export default TaskCard;
