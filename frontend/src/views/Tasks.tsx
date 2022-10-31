import { useState } from 'react';
import TaskList from '../components/TaskList';
import { ButtonOutline } from '../elements/button';
import { PrimaryText } from '../elements/text';
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
        <PrimaryText color="#000">Tasks</PrimaryText>
        <ButtonOutline
          label={'Add new task'}
          onClick={() => setIsModalOpen(true)}
        />
      </TaskList>
    </>
  );
};
