import styled from 'styled-components';
import { ButtonOutline } from '../elements/button';
import useLocalStorage, { Keys } from '../hooks/useLocalStorage';
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
  const [view, setView] = useLocalStorage<'tasks' | 'events'>(Keys.VIEW, 'tasks');
  const toggleView = () => view === 'tasks' ? setView('events') : setView('tasks');

  return (
    <App>
      <div>
        <ButtonOutline
          label={`Go to: ${view=='tasks' ? 'Events' : 'Tasks'}`}
          onClick={toggleView}
        />
      </div>
      {view == 'tasks' && <Tasks />}
      {view == 'events' && <Events />}
    </App>
  );
};

export default AuthenticatedApp;
