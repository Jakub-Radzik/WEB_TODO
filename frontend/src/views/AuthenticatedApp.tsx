import styled from 'styled-components';
import Tasks from './Tasks';

const App = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const AuthenticatedApp = () => {
  return (
    <App>
      <h1>Authenticated App</h1>
      <Tasks />
    </App>
  );
};

export default AuthenticatedApp;
