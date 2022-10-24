import React, { FC } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Close from '../../assets/close.png';
import { TaskTitle } from '../../components/TaskCard';
import { IconButton } from '../../elements/button';

export type ModalWrapperProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    maxWidth: '1000px',
    borderRadius: '30px',
    padding: '0',
  },
};

const ModalHeader = styled.div`
  width: 100%;
  border-radius: 30px 30px 0 0;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid black;
`;

const ModalContent = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 400px;
  padding: 20px 10px;
`;

const ModalWrapper: FC<ModalWrapperProps> = ({
  children,
  isOpen,
  title,
  onRequestClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
    >
      <ModalHeader>
        <TaskTitle>{title}</TaskTitle>
        <IconButton icon={Close} onClick={() => onRequestClose()} />
      </ModalHeader>
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};

export default ModalWrapper;
