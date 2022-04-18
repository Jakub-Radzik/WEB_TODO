import { FC } from 'react';
import styled from 'styled-components';
import {
  GRAY,
  LIGHT_GRAY,
  MAXIMUM_RED_PURPLE,
  VERMILION,
  WHITE,
} from '../../design/colors';
import { RAJDHANI } from '../../design/fonts';

const StyledButton = styled.div<{ disabled?: boolean }>`
  font-family: ${RAJDHANI};
  font-size: xx-large;
  border: 1px solid black;
  border-radius: 30px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) =>
    disabled ? `default` : `pointer`};;
  width: 100%;
  border: ${({ disabled }) =>
    disabled ? `1px solid ${GRAY}` : `1px solid ${MAXIMUM_RED_PURPLE}`};
  color: ${({ disabled }) => (disabled ? GRAY : WHITE)};
  background-color: ${({ disabled }) => (disabled ? LIGHT_GRAY : VERMILION)};
`;

type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  [x: string]: any;
};

export const Button: FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  ...props
}) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} {...props}>
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
  cursor: pointer;
`;

export const TertiaryButton: FC<ButtonProps> = ({
  label,
  onClick,
  ...props
}) => {
  return (
    <StyledButtonWrapper onClick={onClick} {...props}>
      {label}
    </StyledButtonWrapper>
  );
};

const StyledIconButton = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
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
