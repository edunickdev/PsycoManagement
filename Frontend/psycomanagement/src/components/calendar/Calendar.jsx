/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import EventForm from "./EventForm";
import { useEffect, useState } from "react";
import "./calendar.css";
import ContentEventView from "./EventContent";
import { CircularProgress, useDisclosure } from "@nextui-org/react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

const CustomCalendar = ({ listEvents }) => {
  console.log(`lo que recibo en el calendar: ${listEvents}`);

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

  const onEventDrop = ({ event, start, end }) => {
    // Actualiza el estado de los eventos con la nueva información de arrastre y soltar
    const updatedEvents = eventList.map((existingEvent) =>
      existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    );
  };

  const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const buildListEvents = (events) => {
    const list = [];
    events.forEach((event) => {
      list.push({
        title: event["title"],
        start: dayjs(event["start_date"]).toDate(),
        end: dayjs(event["end_date"]).toDate(),
      });
      console.log(list);
    });
    setEventList(list);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    console.log(`lo que se guarda en mi eventList: ${JSON.stringify(eventList)}`);
  };

  useEffect(() => {
    buildListEvents(listEvents);
  }, [listEvents]);

  return (
    <>
      {!isLoading ? (
        <div className="col-span-8 mt-32 h-[450px] mx-6">
          <DgnDpCalendar
            localizer={localizer}
            views={["month", "week", "day"]}
            defaultView={"month"}
            messages={messages}
            onSelectEvent={handleEventClick}
            events={listEvents}
            components={components}
            onEventDrop={onEventDrop}
            DROP
            resizable
          />
          <ContentEventView
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            selectedEvent={selectedEvent}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center col-span-8 mt-32 h-[450px] mx-6">
          <CircularProgress
            aria-label="loadin events"
            size="lg"
            color="success"
            label="Estamos cargando tu agenda, en unos momentos mas, estara lista"
          />
        </div>
      )}
    </>
  );
};

export default CustomCalendar;
