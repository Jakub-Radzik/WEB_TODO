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
  outline: none;
`;

const StyledTextArea = styled.textarea`
  font-family: ${RAJDHANI};
  font-size: large;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid ${GRAY};
  resize: none;
  border:none;
  outline: none;
  padding: 5px;
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

export const TextArea: FC<InputProps> = ({ value, onChange, ...props }) => {
  return <StyledTextArea value={value} onChange={e=> onChange(e.target.value)} {...props}/>
} 
