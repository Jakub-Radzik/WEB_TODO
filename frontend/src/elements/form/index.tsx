import { FC } from 'react';
import styled from 'styled-components';
import { GRAY } from '../../design/colors';
import { RAJDHANI } from '../../design/fonts';

const StyledInput = styled.input`
  font-family: ${RAJDHANI};
  font-size: large;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid ${GRAY};
`;

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  [x: string]: any;
};

export const Input: FC<InputProps> = ({ value, onChange, ...props }) => {
  return (
    <StyledInput
      value={value}
      onChange={e => onChange(e.target.value)}
      {...props}
    />
  );
};
