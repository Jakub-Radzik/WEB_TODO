import styled from 'styled-components';
import { RICH_BLACK } from '../../design/colors';

const headerHeight = '100px';

export const StyledHeader = styled.div`
  width: 100%;
  height: ${headerHeight};
  background: ${RICH_BLACK};
  display: flex;
  justify-content: center;
  box-shadow: 0 0 10px 0 ${RICH_BLACK};
`;

export const HeaderBox = styled.div<{ horizontal?: string }>`
  height: 100%;
  flex-basis: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ horizontal }) => (horizontal ? horizontal : 'center')};
  padding: 0 20px;
`;
