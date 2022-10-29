import { useState } from 'react';
import TaskList from '../components/TaskList';
import { ButtonOutline } from '../elements/button';
import CreateTaskModal from './modals/components/CreateTaskModal';

export const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CreateTaskModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        title={'Create task'}
      />
      <TaskList>
        <ButtonOutline
          label={'Add new task'}
          onClick={() => setIsModalOpen(true)}
        />
      </TaskList>
    </>
  );
};
