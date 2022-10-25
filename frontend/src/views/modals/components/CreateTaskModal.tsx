import { FC, useEffect, useState } from 'react';
import ModalWrapper, { ModalWrapperProps } from '..';
import Loader from '../../../elements/loader';
import { useTask } from '../../../hooks/useTasks';
import { useForm } from "react-hook-form";
import { TaskInput } from '../../../graphQL/types/tasks';
import { Input, StyledInput, StyledTextArea } from '../../../elements/form';
import TaskCard, { StyledTaskCard, StyledTaskHeader, TaskContent } from '../../../components/TaskCard';


const CreateTaskModal: FC<ModalWrapperProps & { taskId?: string }> = ({
  isOpen,
  onRequestClose,
  taskId,
  title,
}) => {
  const { isLoading, createTask, updateTask, getTask } = useTask();
  const { register,setValue,getValues, handleSubmit, watch, formState: { errors } } = useForm<TaskInput>();
  
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
          setColors({
            color: task.color,
            fontColor: task.fontColor
          })
          setValue("title", task.title)
          setValue("content", task.content)
          setValue("color", task.color)
          setValue("fontColor", task.fontColor)
        }
      })
    }
  }, [taskId])
  
  const [colors, setColors] = useState({
    color:'#fff',
    fontColor: '#000'
  })

  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={() => onRequestClose()}
      title={title}
    >
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledTaskCard>
        <StyledTaskHeader color={colors.color}>
        <StyledInput
          {...register("title")}
          placeholder="Title"
          type="text"          
          style={{
            background: '#ffffff3f',
            margin: 10,
            color: colors.fontColor
          }}
        />
        <input type="color" {...register("color")} onChange={(v)=>setColors({...colors, color:v.target.value})}/>
        </StyledTaskHeader>
        <TaskContent>
          <StyledTextArea
            {...register("content")}
            placeholder="Content"
            />
        </TaskContent>
      </StyledTaskCard>

        
        <input type="color" {...register("fontColor")} onChange={(v)=>setColors({...colors, fontColor:v.target.value})}/>
        <input type="submit" value="SUBMIT"/>
      </form>
      {isLoading && <Loader />}
    </ModalWrapper>
  );
};

export default CreateTaskModal;
