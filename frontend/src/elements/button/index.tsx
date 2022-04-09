import { FC } from 'react';
import styled from 'styled-components';
import { RAJDHANI } from '../../design/fonts';

const StyledButton = styled.div`
  font-family: ${RAJDHANI};
  font-size: xx-large;
  border: 1px solid black;
  border-radius: 30px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
`;

type ButtonProps = {
  label: string;
  onClick: () => void;
  [x: string]: any;
};

export const Button: FC<ButtonProps> = ({ label, onClick, ...props }) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {label}
    </StyledButton>
  );
};

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  font-family: ${RAJDHANI};
  font-size: x-large;
`;

export const TertiaryButton: FC<ButtonProps> = ({ label, onClick, ...props }) => {
  return (
    <StyledButtonWrapper onClick={onClick} {...props}>
      {label}
    </StyledButtonWrapper>
  );
};


const StyledIconButton = styled.div`
  width: 50px;
  height: 50px;
  > * {
    width: 50px;
    height: 50px;
  }
`;

export const IconButton: FC<{ icon: string; onClick: () => void }> = ({
  icon,
  onClick,
}) => {
  return (
    <StyledIconButton onClick={onClick}>
      <img src={icon} />
    </StyledIconButton>
  );
};
