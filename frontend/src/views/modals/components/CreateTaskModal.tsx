import { FC, useEffect } from 'react';
import ModalWrapper, { ModalWrapperProps } from '..';
import Loader from '../../../elements/loader';
import { useTask } from '../../../hooks/useTasks';


const CreateTaskModal: FC<ModalWrapperProps & { taskId?: string }> = ({
  isOpen,
  onRequestClose,
  taskId,
  title,
}) => {
  const { isLoading } = useTask();

  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={() => onRequestClose()}
      title={title}
    >
      {isLoading && <Loader />}
    </ModalWrapper>
  );
};

export default CreateTaskModal;
