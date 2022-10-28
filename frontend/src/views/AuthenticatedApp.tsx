import { useState } from 'react';
import styled from 'styled-components';
import { ButtonOutline } from '../elements/button';
import Events from './Events';
import { Tasks } from './Tasks';

const App = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100vw;
  margin: 100px 0 0 0;
`;

const AuthenticatedApp = () => {

  const [showTasks, setShowTasks] = useState(true);
  const toggleView = () => setShowTasks(!showTasks);


  return (
    <App>
      <div>
        <ButtonOutline label={`Go to: ${showTasks?'Events':'Tasks'}`} onClick={toggleView}/> 
      </div>
      {showTasks && <Tasks/>}
      {!showTasks && <Events/>}
    </App>
  );
};

export default AuthenticatedApp;
