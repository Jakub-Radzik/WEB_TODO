import { FC, useEffect } from 'react';
import ModalWrapper, { ModalWrapperProps } from '..';
import Loader from '../../../elements/loader';
import { useTask } from '../../../hooks/useTasks';
import { useForm } from "react-hook-form";
import { TaskInput } from '../../../graphQL/types/tasks';


const CreateTaskModal: FC<ModalWrapperProps & { taskId?: string }> = ({
  isOpen,
  onRequestClose,
  taskId,
  title,
}) => {
  const { isLoading, createTask, updateTask, getTask } = useTask();
  const { register,setValue, handleSubmit, watch, formState: { errors } } = useForm<TaskInput>();
  
  const onSubmit = (data: TaskInput) => {
    if(taskId){
      updateTask(taskId, data);
    }else{
      createTask(data);
    }
  };

  useEffect(() => {
    if(taskId){
      getTask(taskId).then(task=>{
        if(task){
          setValue("title", task.title)
          setValue("content", task.content)
          setValue("color", task.color)
          setValue("fontColor", task.fontColor)
        }
      })
    }
  }, [taskId])
  

  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={() => onRequestClose()}
      title={title}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("title")}/>
        <input type="text" {...register("content")}/>
        <input type="color" {...register("color")}/>
        <input type="color" {...register("fontColor")}/>
        <input type="submit" value="SUBMIT"/>
      </form>
      {isLoading && <Loader />}
    </ModalWrapper>
  );
};

export default CreateTaskModal;
