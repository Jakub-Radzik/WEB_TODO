import { FC, useCallback, useEffect, useState } from 'react';
import ModalWrapper, { ModalWrapperProps } from '..';
import { useForm } from 'react-hook-form';
import {
  StyledInput, StyledLabel, StyledRadioBox,
} from '../../../elements/form';
import { useCalendar } from '../../../hooks/useCalendar';
import Switch from "react-switch";
import { PrimaryText } from '../../../elements/text';
import moment from 'moment-timezone';
import { errorToast } from '../../../utils/toasts';
import { GoogleEventInput } from '../../../graphQL/types/event';
import { eventColors } from '../../../utils/googleColors';

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
        },
        colorId: '1',
        isGoogleMeet: false
    }
  });
  
  const [isOneDayEvent, setIsOneDayEvent] = useState(true);
  const [isGoogleMeet, setIsGoogleMeet] = useState(false);

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
    formData.isGoogleMeet = isGoogleMeet;
    createEvent(formData);
  },[isOneDayEvent, isGoogleMeet]);

  useEffect(() => {
    const tz = moment.tz.guess();
    setValue('start.timeZone', tz)
    setValue('end.timeZone', tz)
  }, [])

  const [color, setColor] = useState('#a4bdfc');

  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={() => onRequestClose()}
      title={title}
      color={color}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <StyledLabel>Color: </StyledLabel>
        <div>
          {eventColors.map((color)=> {
            return (
                <StyledRadioBox
                  type="radio"
                  value={color.id}
                  {...register('colorId')}
                  onChange={() => setColor(color.background)}
                  key={color.id}
                  style={{
                    backgroundColor: color.background,
                    border: `1px solid ${color.foreground}`,
                  }}
                />
            )
          })}
        </div>
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
            <Switch checked={isOneDayEvent} onChange={() => {
    setIsOneDayEvent(!isOneDayEvent)}}/>
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


      <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: '10px 0 0 0'
        }}>
      <StyledLabel style={{paddingRight:10}}>Google Meet:</StyledLabel>
      <Switch checked={isGoogleMeet} onChange={() => { setIsGoogleMeet(!isGoogleMeet)}} />
      </div>



        <StyledInput type="submit" value="Submit" style={{ marginTop: 100 }} />
      </form>

    </ModalWrapper>
  );
};

export default CreateEventModal;
