import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import ModalWrapper, { ModalWrapperProps } from "..";
import { StyledTaskCard, StyledTaskHeader, TaskContent } from "../../../components/TaskCard";
import { Button } from "../../../elements/button";
import { Input } from "../../../elements/form";
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


const CreateTaskModal: FC<ModalWrapperProps> = ({isOpen, onRequestClose}) => {

    const {createTask} = useTask();

    const [newTask , setNewTask] = useState<Omit<Task, '_id'>>(initialState)

    const handleSubmit = () => {
        createTask({...newTask, createdAt: new Date().toISOString()})
        setNewTask(initialState);
    }

    useEffect(() => {
        console.dir(newTask)
    }, [newTask])
    

    return <ModalWrapper isOpen={isOpen} onRequestClose={()=>onRequestClose && onRequestClose()}>
        <StyledTaskCard>
            <StyledCreateTaskHeader color={newTask.color}>
                <Input placeholder="Task Title" value={newTask.title} onChange={(value)=>setNewTask({...newTask, title: value})} style={headerInputStyles}/>
                <div>
                    <Label htmlFor="color" color={newTask.color}>Color:</Label>
                    <input type="color" id="color" name="color" value={newTask.color} onChange={(e) => setNewTask({...newTask, color: e.target.value})} />
                </div>
            </StyledCreateTaskHeader>
            <StyledCreateTaskContent>
                <Input value={newTask.content} onChange={(value: string) => setNewTask({...newTask, content: value})}/>
            </StyledCreateTaskContent>
        </StyledTaskCard>
        <Button label={"Create Task"} onClick={()=>handleSubmit()}/>
    </ModalWrapper>
}

export default CreateTaskModal;