import { FC } from "react"
import { ButtonOutline, StyledButton2 } from "../elements/button";
import { GoogleEvent } from "../graphQL/types/event"
import { StyledTaskCard, StyledTaskHeader } from "./TaskCard";

const Event: FC<{ event: GoogleEvent }> = ({ event }) =>{
    
    const isAllDay = !!event.start.date;

    return <StyledTaskCard style={{
        border: '1px solid black'
    }}>
        <StyledTaskHeader color="#f00">

        <p>{event.summary}</p>
            {
                !isAllDay &&  <p>{event.start.dateTime} - {event.end.dateTime}</p>
            }

            {
                isAllDay && <div>{event.start.date}</div>
            }

        </StyledTaskHeader>
        <p>{event.id}</p>
        <p>{event.created}</p>
        <p>{event.updated}</p>
        <p>{event.creator.email}</p>
        <p>{event.end.dateTime}</p>
        <p>{event.end.timeZone}</p>
        <p>{event.start.dateTime}</p>
        <p>{event.start.timeZone}</p>
        <p>{event.kind}</p>
        <p>{event.status}</p>
        {event.hangoutLink &&  <ButtonOutline label={"Go to Google Meet"} onClick={()=> window.open(event.hangoutLink)}/>}
    </StyledTaskCard>
}

export default Event;