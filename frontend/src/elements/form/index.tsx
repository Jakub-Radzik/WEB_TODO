import { FC } from 'react';
import styled from 'styled-components';
import { RAJDHANI } from '../../design/fonts';

const StyledInput = styled.input`
  font-family: ${RAJDHANI};
  font-size: large;
  width: 100%;
  height: 50px;
`;

type InputProps = {
  value: string;
  setValue: (value: string) => void;
  [x: string]: any;
};

export const Input: FC<InputProps> = ({ value, setValue, ...props }) => {
  return (
    <StyledInput
      value={value}
      onChange={e => setValue(e.target.value)}
      {...props}
    />
  );
};
