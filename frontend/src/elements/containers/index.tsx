import styled from 'styled-components';

export const BaseContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  display: flex;
`;

export const HeaderContainer = styled(BaseContainer)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LoginContainer = styled(BaseContainer)`
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div<{ margin?: string }>`
  width: 50%;
  > * {
    margin: ${({ margin }) => (margin ? margin : '10px 0')};
  }
`;

export const LeftWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
