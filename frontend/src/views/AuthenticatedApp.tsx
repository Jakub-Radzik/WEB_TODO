import { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { RICH_BLACK } from '../design/colors';
import { ButtonOutline } from '../elements/button';
import { useCalendar } from '../hooks/useCalendar';
import Events from './Events';
import CreateTaskModal from './modals/components/CreateTaskModal';
import Tasks from './Tasks';

const App = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100vw;
  margin: 100px 0 0 0;
`;

const AuthenticatedApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {events} = useCalendar();

  useEffect(()=>{console.log(events)},[events])

  return (
    <App>
      <CreateTaskModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        title={'Create task'}
      />
      <Events events={events}/>
      <Tasks>
        <ButtonOutline
          label={'Add new task'}
          onClick={() => setIsModalOpen(true)}
        />
      </Tasks>
    </App>
  );
};

export default AuthenticatedApp;
