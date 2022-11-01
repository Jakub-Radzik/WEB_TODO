import styled from 'styled-components';
import Loader from '../elements/loader';
import Event from '../components/Event';
import { PrimaryText } from '../elements/text';
import { useCalendar } from '../hooks/useCalendar';
import CreateEventModal from './modals/components/CreateEventModal';
import { useState } from 'react';
import { ButtonOutline } from '../elements/button';

const StyledTaskList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 10px;
`;

const Events = () => {
  const { events } = useCalendar();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CreateEventModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        title={'Create Google Event'}
      />
      {!events && <Loader />}
      {events && (
        <StyledTaskList>
          <PrimaryText color="#000">Google Events</PrimaryText>
          <ButtonOutline
            label={'Add new Event'}
            onClick={() => setIsModalOpen(true)}
          />
          {events.map((event, index) => {
            return <Event event={event} key={index} />;
          })}
        </StyledTaskList>
      )}
    </>
  );
};

export default Events;
