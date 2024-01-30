/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import EventForm from "./EventForm";
import { useState } from "react";
import "./calendar.css";
import ContentEventView from "./EventContent";
import { useDisclosure } from "@nextui-org/react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop, { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

const CustomCalendar = () => {

    const events = [
        {
            start: dayjs("2024-01-05T13:00:00").toDate(),
            end: dayjs("2024-01-05T13:40:00").toDate(),
            title: "Cita Psicologia 1",
        },
        {
            start: dayjs("2024-01-10T13:00:00").toDate(),
            end: dayjs("2024-01-10T15:30:00").toDate(),
            title: "event 2",
        },
        {
            start: dayjs("2024-01-12T13:00:00").toDate(),
            end: dayjs("2024-01-12T13:40:00").toDate(),
            title: "event 3",
        },
        {
            start: dayjs("2024-01-16T13:00:00").toDate(),
            end: dayjs("2024-01-17T15:30:00").toDate(),
            title: "event 4",
        },
    ];

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
        noEventsInRange: "Sin eventos",
    };

    const components = {
        event: (props) => {
            console.log(props);
            return <div>{props.title}</div>;
        },
    };

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (event, e) => {
        setSelectedEvent(event)
        onOpen();
    };

    const localizer = dayjsLocalizer(dayjs);
    const DgnDpCalendar = withDragAndDrop(Calendar);

    const [eventsList, setEventsList] = useState([
        {
            start: dayjs("2024-01-05T13:00:00").toDate(),
            end: dayjs("2024-01-05T13:40:00").toDate(),
            title: "Cita Psicologia 1",
        },
        {
            start: dayjs("2024-01-10T13:00:00").toDate(),
            end: dayjs("2024-01-10T15:30:00").toDate(),
            title: "event 2",
        },
        {
            start: dayjs("2024-01-12T13:00:00").toDate(),
            end: dayjs("2024-01-12T13:40:00").toDate(),
            title: "event 3",
        },
        {
            start: dayjs("2024-01-16T13:00:00").toDate(),
            end: dayjs("2024-01-17T15:30:00").toDate(),
            title: "event 4",
        },
    ]);

    const onEventDrop = ({ event, start, end }) => {
        // Actualiza el estado de los eventos con la nueva información de arrastre y soltar
        const updatedEvents = eventsList.map((existingEvent) =>
          existingEvent.id === event.id
            ? { ...existingEvent, start, end }
            : existingEvent
        );
    
        setEventsList(updatedEvents);
    };

    return (
        <>
            <DgnDpCalendar
                localizer={localizer}
                views={["month", "week", "day"]}
                defaultView={"month"}
                messages={messages}
                onSelectEvent={handleEventClick}
                events={events}
                components={components}
                className="col-span-8 mt-32 h-[450px] mx-6"
                //onEventDrop={onEventDrop} Event DROP
                resizable
            />
            <ContentEventView isOpen={isOpen} onOpenChange={onOpenChange} selectedEvent={selectedEvent}/>
        </>
    );
};

export default CustomCalendar;
