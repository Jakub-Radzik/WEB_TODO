import styled, { keyframes } from 'styled-components';
import {
  BLUE,
  MAXIMUM_RED_PURPLE,
  RICH_BLACK,
  VERMILION,
} from '../../design/colors';

const rotate = keyframes`
 100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  flex-wrap: wrap;
  animation-name: ${rotate};
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const Ball = styled.div<{ color?: string; size?: string }>`
  width: ${({ size }) => size || '25px'};
  height: ${({ size }) => size || '25px'};
  border-radius: 50%;
  background-color: ${({ color }) => color || 'black'};
  transform: scale(0.6);
  box-shadow: 1px 1px 3px 1px ${({ color }) => color || 'black'};
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <Ball color={MAXIMUM_RED_PURPLE} size="50%" />
      <Ball color={VERMILION} size="50%" />
      <Ball color={RICH_BLACK} size="50%" />
      <Ball color={BLUE} size="50%" />
    </LoaderContainer>
  );
};

export default Loader;
