import styled from 'styled-components';
import { PLATINUM, VERMILION, WHITE } from '../design/colors';

const View = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginView = styled(View)`
  height: 50vh;
  width: 50%;
  border: 1px solid ${VERMILION};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${WHITE};
  box-shadow: 0 5px 5px 0px ${VERMILION};
`;
