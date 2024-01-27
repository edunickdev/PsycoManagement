import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import "./calendar.css"
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");


const CustomCalendar = () => {

    const events = [
        {
            start: dayjs('2024-01-05T13:00:00').toDate(),
            end: dayjs('2024-01-05T13:40:00').toDate(),
            title: 'event 1'
        },
        {
            start: dayjs('2024-01-10T13:00:00').toDate(),
            end: dayjs('2024-01-10T15:30:00').toDate(),
            title: 'event 2'
        },
        {
            start: dayjs('2024-01-12T13:00:00').toDate(),
            end: dayjs('2024-01-12T13:40:00').toDate(),
            title: 'event 3'
        },
        {
            start: dayjs('2024-01-16T13:00:00').toDate(),
            end: dayjs('2024-01-17T15:30:00').toDate(),
            title: 'event 4'
        }
    ]

    const messages = {
        allDay: "Todo el día",
        previous: "<",
        next: ">",
        today: "Hoy",
        month: "Mes",
        week: "Semana",
        day: "Día",
        agenda: "Agenda",
        date: "Fecha",
        time: "Hora",
        event: "Evento",
        noEventsInRange: "Sin eventos"
    };

    const handleEventClick = (event, e) => {
        alert('Event:' + event.title);
    }

    const components = {
        event: props => {
            console.log(props);
            return <div>{props.title}</div>
        }
    }

    const localizer = dayjsLocalizer(dayjs)
    return (
        <div className="mt-24">
            <Calendar
                style={{
                    width: '100%',
                    height: '100vh'
                }}
                localizer={localizer}
                //events={events}
                views={["month", "week", "day"]}
                defaultView={"month"}
                messages={messages}
                onSelectEvent={handleEventClick}
                events={events}
                components={components}
            />
        </div>
    )
}

export default CustomCalendar;