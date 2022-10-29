import { FC, useEffect, useState } from 'react';
import ModalWrapper, { ModalWrapperProps } from '..';
import Loader from '../../../elements/loader';
import { useTask } from '../../../hooks/useTasks';
import { useForm } from 'react-hook-form';
import { TaskInput } from '../../../graphQL/types/tasks';
import {
  Input,
  StyledColorInput,
  StyledInput,
  StyledLabel,
  StyledTextArea,
} from '../../../elements/form';
import TaskCard, {
  StyledTaskCard,
  StyledTaskHeader,
  TaskContent,
} from '../../../components/TaskCard';

const CreateTaskModal: FC<ModalWrapperProps & { taskId?: string }> = ({
  isOpen,
  onRequestClose,
  taskId,
  title,
}) => {
  const { isLoading, createTask, updateTask, getTask } = useTask();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TaskInput>();

  const onSubmit = (data: TaskInput) => {
    if (taskId) {
      updateTask(taskId, data);
    } else {
      createTask(data);
    }
  };

  useEffect(() => {
    if (taskId) {
      getTask(taskId).then(task => {
        if (task) {
          setColors({
            color: task.color,
            fontColor: task.fontColor,
          });
          setValue('title', task.title);
          setValue('content', task.content);
          setValue('color', task.color);
          setValue('fontColor', task.fontColor);
        }
      });
    }
  }, [taskId]);

  const [colors, setColors] = useState({
    color: '#fff',
    fontColor: '#000',
  });

  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={() => onRequestClose()}
      title={title}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <StyledTaskCard style={{ margin: '0 0 20px 0' }}>
          <StyledTaskHeader
            color={colors.color}
            style={{
              flexDirection: 'row',
              padding: '0 10px',
              boxSizing: 'border-box',
            }}
          >
            <StyledInput
              {...register('title')}
              placeholder="Title"
              type="text"
              style={{
                background: '#ffffff3f',
                margin: 10,
                color: colors.fontColor,
                maxWidth: '300px',
              }}
            />
            <StyledLabel htmlFor="color" style={{ color: colors.fontColor }}>
              Color:
            </StyledLabel>
            <StyledColorInput
              type="color"
              {...register('color')}
              onChange={v => setColors({ ...colors, color: v.target.value })}
            />
          </StyledTaskHeader>
          <TaskContent>
            <StyledTextArea {...register('content')} placeholder="Content" />
          </TaskContent>
        </StyledTaskCard>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StyledLabel style={{ padding: 10 }}>Font color:</StyledLabel>
          <StyledColorInput
            type="color"
            {...register('fontColor')}
            onChange={v => setColors({ ...colors, fontColor: v.target.value })}
          />
        </div>
        <StyledInput type="submit" value="Submit" style={{ marginTop: 100 }} />
      </form>
      {isLoading && <Loader />}
    </ModalWrapper>
  );
};

export default CreateTaskModal;
