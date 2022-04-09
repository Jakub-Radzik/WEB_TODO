import styled from 'styled-components';
import { RICH_BLACK } from '../../design/colors';

const sizeRadius = '200px';
const headerHeight = '100px';

export const StyledHeader = styled.div`
  width: 100%;
  height: ${headerHeight};
  background: ${RICH_BLACK};
  display: flex;
  justify-content: center;
  ::before{
    content: "";
    width: ${sizeRadius};
    height: ${sizeRadius};
    position: absolute;
    left: 0;
    top:${headerHeight};
    border-radius: 0 0 ${sizeRadius} 0;
    background: ${RICH_BLACK};
  }
  ::after{
    content: "";
    width: ${sizeRadius};
    height: ${sizeRadius};
    position: absolute;
    left: 0;
    top:${headerHeight};
    border-radius: ${sizeRadius} 0 0 0;
    background: #fff;
  }
`;

export const HeaderBox = styled.div<{ horizontal?: string }>`
  height: 100%;
  flex-basis: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ horizontal }) => (horizontal ? horizontal : 'center')};
  padding: 0 20px;
`;

// flex-start
