import styled from 'styled-components';
import { RICH_BLACK } from '../../design/colors';

export const StyledHeader = styled.div`
  width: 100%;
  height: 100px;
  background: ${RICH_BLACK};
  display: flex;
  justify-content: center;
`;

export const HeaderBox = styled.div<{ horizontal?: string }>`
  height: 100%;
  flex-basis: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ horizontal }) => (horizontal ? horizontal : 'center')};
`;

// flex-start
