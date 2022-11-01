import { StyledButton2 } from '../elements/button';
import { GoogleEvent } from '../graphQL/types/event';
import Meet from '../assets/meet.png';
import Calendar from '../assets/google-calendar.png';
import { FC } from 'react';

export const GoogleEventButton: FC<{ event: GoogleEvent }> = ({ event }) => {
  const onClickHandler = () => {
    window.open(
      event.hangoutLink ? event.hangoutLink : event.htmlLink,
      '_blank'
    );
  };

  const label = event.hangoutLink ? 'Go to meeting' : 'Go to event';

  return (
    <StyledButton2 style={{ fontSize: 20 }} onClick={onClickHandler}>
      <p style={{ marginRight: 10 }}>{label}</p>{' '}
      <img
        src={event.hangoutLink ? Meet : Calendar}
        style={{
          width: 30,
          height: 30,
        }}
      />
    </StyledButton2>
  );
};
