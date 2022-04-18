import { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ModalWrapper, { ModalWrapperProps } from "..";
import { StyledTaskCard, StyledTaskHeader, TaskContent } from "../../../components/TaskCard";
import { Button } from "../../../elements/button";
import { Input, TextArea } from "../../../elements/form";
import Loader from "../../../elements/loader";
import { Task, useTask } from "../../../hooks/useTasks";

export type CreateTaskProps = Omit<Task, '_id'>

const initialState = {
    title: '',
    content: '',
    completed: false,
    color: '#000',
    createdAt: ''
}

const StyledCreateTaskHeader = styled(StyledTaskHeader)`
    flex-direction: row;
    padding: 10px 20px;
    box-sizing: border-box;
`

const StyledCreateTaskContent = styled(TaskContent)`
    overflow: none;
`

const headerInputStyles = {
    background: 'rgba(255,255,255,0.75)',
    width: '25%'
}

const Label = styled.label<{color: string}>`
    font-size: 24px;
    color: ${({color}) => color};
    filter: invert(100%);
`


const CreateTaskModal: FC<ModalWrapperProps & {taskId?: string}> = ({isOpen, onRequestClose, taskId}) => {

    const {isLoading, createTask,updateTask, getTask } = useTask();
    const [newTask , setNewTask] = useState<Omit<Task, '_id'>>(initialState);

    useEffect(()=>{
        if(taskId){
            getTask(taskId).then(task => setNewTask(task!))
        }
    },[taskId])

    const handleSubmit = () => {
        if(taskId){
            updateTask(taskId, {...newTask, updatedAt: new Date().toISOString()})
            onClose();
        }else{
            createTask({...newTask, createdAt: new Date().toISOString()})
        }
        setNewTask(initialState);
    }

    const isValid = useCallback(() => {
        return newTask.title && newTask.content && newTask.title.length<100;
      }, [newTask]);

    const onClose = () => {
        setNewTask(initialState);
        onRequestClose();
    }
    
    return <ModalWrapper isOpen={isOpen} onRequestClose={()=>onClose()}>
        {isLoading && <Loader/>}
        {!isLoading && <><StyledTaskCard>
            <StyledCreateTaskHeader color={newTask.color}>
                <Input placeholder="Task Title" value={newTask.title} onChange={(value)=>setNewTask({...newTask, title: value})} style={headerInputStyles}/>
                <div>
                    <Label htmlFor="color" color={newTask.color}>Color:</Label>
                    <input type="color" id="color" name="color" value={newTask.color} onChange={(e) => setNewTask({...newTask, color: e.target.value})} />
                </div>
            </StyledCreateTaskHeader>
            <StyledCreateTaskContent style={{padding:0}}>
                <TextArea value={newTask.content} onChange={(value: string) => setNewTask({...newTask, content: value})} placeholder={"Start typing..."} style={{height: 200, borderRadius: '0 0 30px 30px'}}/>
            </StyledCreateTaskContent>
        </StyledTaskCard>
        <Button disabled={!isValid()} label={taskId?"Update Task" :"Create Task"} onClick={()=>isValid() && handleSubmit()}/></>}
    </ModalWrapper>
}

export default CreateTaskModal;