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
