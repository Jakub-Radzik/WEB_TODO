import { FC, useState } from 'react';
import styled from 'styled-components';
import Loader from '../elements/loader';
import { GoogleEvent } from '../graphQL/types/event';
import Event from '../components/Event';
import { PrimaryText } from '../elements/text';

const StyledTaskList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 10px;
  border: 1px solid black;
`;

const Events: FC<{ events: GoogleEvent[] | undefined }> = ({ events }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modifyTaskId, setModifyTaskId] = useState('');

  return (
    <>
      {!events && <Loader />}
      {/* <CreateTaskModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        taskId={modifyTaskId}
        title={'Update task'}
      /> */}
      {events && (
        <StyledTaskList>
            <PrimaryText color='#000'>Google Events</PrimaryText>
          {events.map((event, index) => {
            return (<Event event={event} key={index}/>)
          })}
        </StyledTaskList>
      )}
    </>
  );
};

export default Events;
