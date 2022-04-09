import styled from 'styled-components';

export const PrimaryText = styled.h1<{ color: string }>`
  color: ${({ color }) => color};
  font-size: xx-large;
`;
