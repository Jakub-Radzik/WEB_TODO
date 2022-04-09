import styled from 'styled-components';
import { RAJDHANI } from '../../design/fonts';

export const PrimaryText = styled.h1<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 40px;
  letter-spacing: 2px;
  font-family: ${RAJDHANI};
`;

export const Text = styled.p<{ color: string; align?: string }>`
  color: ${({ color }) => color};
  font-size: 18px;
  text-align: ${({ align }) => (align ? align : 'center')};
  line-height: 20px;
  letter-spacing: 1px;
  font-family: ${RAJDHANI};
`;
