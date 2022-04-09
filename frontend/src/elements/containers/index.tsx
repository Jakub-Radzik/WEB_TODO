import styled from 'styled-components';

export const BaseContainer = styled.div`
  width: 100%;
  max-width: 1600px;
`;

export const HeaderContainer = styled(BaseContainer)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
