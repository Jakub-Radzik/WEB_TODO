import styled from 'styled-components';
import Loader from '../elements/loader';
import Event from '../components/Event';
import { PrimaryText } from '../elements/text';
import { useCalendar } from '../hooks/useCalendar';

const StyledTaskList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 10px;
`;

const Events = () => {
    const {events} = useCalendar();

  return (
    <>
      {!events && <Loader />}
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
