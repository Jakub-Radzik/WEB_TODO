import { FC, useCallback, useEffect, useState } from 'react';
import ModalWrapper, { ModalWrapperProps } from '..';
import { useForm } from 'react-hook-form';
import {
  StyledInput, StyledLabel,
} from '../../../elements/form';
import { useCalendar } from '../../../hooks/useCalendar';
import Switch from "react-switch";
import { PrimaryText } from '../../../elements/text';
import moment from 'moment-timezone';
import { errorToast } from '../../../utils/toasts';
import { GoogleEventInput } from '../../../graphQL/types/event';

const CreateEventModal: FC<ModalWrapperProps> = ({
  isOpen,
  onRequestClose,
  title,
}) => {
  const { createEvent } = useCalendar();
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<GoogleEventInput>({
    defaultValues: {
        start:{
            date: moment().toISOString().substring(0,10),
            dateTime: moment().toISOString().substring(0,16)
        },
        end:{
            dateTime: moment().add(1, 'hour').toISOString().substring(0,16)
        }
    }
  });
  
  const [isOneDayEvent, setIsOneDayEvent] = useState(true);

  const onSubmit = useCallback(async (data: GoogleEventInput) => {
    const formData = {...data};

    if(isOneDayEvent){
        if(!formData.start.date) {
            errorToast('Please provide start date');
            return;
        }
        formData.start.dateTime = undefined;
        formData.start.timeZone = undefined;

        formData.end.dateTime = undefined;
        formData.end.timeZone = undefined;

        formData.end.date = moment(formData.start.date).add(2, 'days').toISOString().substring(0,10);
    }else{
        if(!formData.start.dateTime) {
            errorToast('Please provide start date time');
            return;
        }

        if(!formData.end.dateTime) {
            errorToast('Please provide end date time');
            return;
        }

        formData.start.date= undefined;
        formData.end.date= undefined;

        formData.start.dateTime = new Date(formData.start.dateTime).toISOString();
        formData.end.dateTime = new Date(formData.end.dateTime).toISOString();
    }
    console.log(formData)
    createEvent(formData);
  },[isOneDayEvent]);

  const toggleSwitch = () => {
    setIsOneDayEvent(!isOneDayEvent);
  }

  useEffect(() => {
    const tz = moment.tz.guess();
    setValue('start.timeZone', tz)
    setValue('end.timeZone', tz)
  }, [])

  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={() => onRequestClose()}
      title={title}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <StyledLabel>Summary: </StyledLabel>
        <StyledInput type="text" {...register('summary', { required: "Please enter summary." })} placeholder={"Summary"}/>
        <StyledLabel>Description: </StyledLabel>
        <StyledInput type="text" {...register('description', { required: "Please enter description." })} placeholder={"Description"}/>

        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <PrimaryText color='#000' style={{fontSize: 20, width: 150, textAlign: 'center'}}>Defined hours</PrimaryText>
            <Switch checked={isOneDayEvent} onChange={toggleSwitch}/>
            <PrimaryText color='#000' style={{fontSize: 20, width: 150, textAlign: 'center'}}>All day</PrimaryText>
        </div>

    {
        isOneDayEvent && <>
        <StyledLabel>Start: </StyledLabel>
        <StyledInput type="date"  {...register("start.date")}/>
        </>
    }

    {   
        !isOneDayEvent && <>
        <StyledLabel>Start: </StyledLabel>
        <StyledInput type="datetime-local" {...register("start.dateTime")}/>

        <StyledLabel>End: </StyledLabel>
        <StyledInput type="datetime-local" {...register("end.dateTime")} />
        </>
    }






        <StyledInput type="submit" value="Submit" style={{ marginTop: 100 }} />
      </form>

    </ModalWrapper>
  );
};

export default CreateEventModal;
