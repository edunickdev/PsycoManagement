/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import EventForm from "./EventForm";
import { useEffect, useState } from "react";
import "./calendar.css";
import ContentEventView from "./EventContent";
import { useDisclosure } from "@nextui-org/react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { TherapistAuth } from "../../context/AuthContext";

dayjs.locale("es");

const CustomCalendar = () => {
  const { getId } = TherapistAuth();
  const id = getId();

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
    setSelectedEvent(event);
    onOpen();
  };

  const localizer = dayjsLocalizer(dayjs);
  const DgnDpCalendar = withDragAndDrop(Calendar);

  const [eventsList, setEventsList] = useState([
    {
      start: dayjs("2024-02-05T13:00:00").toDate(),
      end: dayjs("2024-02-05T13:40:00").toDate(),
      title: "Cita Psicologia 1",
    },
    {
      start: dayjs("2024-02-10T13:00:00").toDate(),
      end: dayjs("2024-02-10T15:30:00").toDate(),
      title: "event 2",
    },
    {
      start: dayjs("2024-02-12T13:00:00").toDate(),
      end: dayjs("2024-02-12T13:40:00").toDate(),
      title: "event 3",
    },
    {
      start: dayjs("2024-02-16T13:00:00").toDate(),
      end: dayjs("2024-02-17T15:30:00").toDate(),
      title: "event 4",
    },
    {
      start: dayjs("2024-02-20T13:00:00").toDate(),
      end: dayjs("2024-02-20T15:30:00").toDate(),
      title: "event 5",
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
    console.log(`mi variable local: ${eventsList}`);
  };

  const [eventList, setEventList] = useState([]);
  console.log(`mi variable local: ${eventList}`);

  const get_events = () => {
    fetch(`http://127.0.0.1:8000/events/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((events) => {
        console.log(`mis eventos antes del set: ${JSON.stringify(events)}`);
        setEventList([...events.events]);
        console.log(`mis eventos despues del set: ${JSON.stringify(eventList)}`);
      }).catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    get_events();
  }, []);

  return (
    <>
      <DgnDpCalendar
        localizer={localizer}
        views={["month", "week", "day"]}
        defaultView={"month"}
        messages={messages}
        onSelectEvent={handleEventClick}
        events={eventsList}
        components={components}
        className="col-span-8 mt-32 h-[450px] mx-6"
        onEventDrop={onEventDrop}
        //Event
        DROP
        resizable
      />
      <ContentEventView
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedEvent={selectedEvent}
      />
    </>
  );
};

export default CustomCalendar;
