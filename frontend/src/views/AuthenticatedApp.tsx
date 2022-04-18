import { useState } from 'react';
import styled from 'styled-components';
// import { RICH_BLACK } from '../design/colors';
import { ButtonOutline } from '../elements/button';
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

// const SidePanel = styled.div`
//   height: 50vh;
//   width: 300px;
//   background-color: ${RICH_BLACK};
//   border-radius: 30px;
//   padding: 20px;
//   margin-left: 30px;
// `;

const AuthenticatedApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <App>
      <CreateTaskModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        title={'Create task'}
      />
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
