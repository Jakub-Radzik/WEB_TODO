import { FC, useCallback } from 'react';
import { PrimaryText } from '../elements/text';
import { GoogleEvent } from '../graphQL/types/event';
import { formatDate, formatTime } from '../utils/date';
import { GoogleEventButton } from './GoogleEventButton';
import { StyledTaskCard, StyledTaskHeader, TaskContent } from './TaskCard';

const Row: FC<{ text1: string; text2: string }> = ({ text1, text2 }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <PrimaryText
        color="#000"
        style={{ fontSize: 15, display: 'inline-block' }}
      >
        {text1}
      </PrimaryText>
      <PrimaryText
        color="#000"
        style={{ fontSize: 15, display: 'inline-block' }}
      >
        {text2}
      </PrimaryText>
    </div>
  );
};

const Event: FC<{ event: GoogleEvent }> = ({ event }) => {
  const isAllDay = !!event.start.date;
  console.log(event);

  const renderDate = useCallback(() => {
    if (event.start.date && event.end.date) {
      return formatDate(event.start.date);
    } else {
      if (event.start.dateTime && event.end.dateTime) {
        if (
          formatDate(event.start.dateTime) === formatDate(event.end.dateTime)
        ) {
          // same day event
          return formatDate(event.start.dateTime);
        }
        return `${formatDate(event.start.dateTime)} - ${formatDate(
          event.end.dateTime
        )}`;
      }
    }
  }, [event]);

  const renderHours = useCallback(() => {
    if (event.start.date && event.end.date) {
      return '';
    } else {
      if (event.start.dateTime && event.end.dateTime) {
        return `${formatTime(event.start.dateTime)} - ${formatTime(
          event.end.dateTime
        )}`;
      }
    }
  }, [event]);

  return (
    <StyledTaskCard>
      <StyledTaskHeader color="#f00">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px',
            boxSizing: 'border-box',
          }}
        >
          <PrimaryText color="#000">{event.summary}</PrimaryText>
          <div>
            <p>{renderDate()}</p>
            <p>{renderHours()}</p>
          </div>
        </div>
      </StyledTaskHeader>

      <TaskContent>
        {event.description && (
          <>
            <PrimaryText color="#000" style={{ fontSize: 20 }}>
              Description
            </PrimaryText>
            <p>{event.description}</p>
            <hr />
          </>
        )}

        <Row text1={'ID'} text2={event.id} />
        <Row text1={'Creator'} text2={event.creator.email} />
        <Row
          text1={'Created at'}
          text2={`${formatDate(event.created)} ${formatTime(event.created)}`}
        />
        <Row
          text1={'Last update'}
          text2={`${formatDate(event.updated)} ${formatTime(event.updated)}`}
        />
        <Row text1={'Status'} text2={event.status} />
      </TaskContent>
      <GoogleEventButton event={event} />
    </StyledTaskCard>
  );
};

export default Event;
