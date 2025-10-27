
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import EventForm from "./EventForm";
import "./calendar.css";
import ContentEventView from "./EventContent";
import { CircularProgress, useDisclosure } from "@nextui-org/react";
import { Calendar, dayjsLocalizer, EventProps } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

interface IEvent {
  id?: number | string;
  title: string;
  start: Date;
  end: Date;
  [key: string]: any;
}

interface CustomCalendarProps {
  listEvents: IEvent[];
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ listEvents }) => {
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
    event: (props: EventProps<IEvent>) => {
      return <div>{props.title}</div>;
    },
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const handleEventClick = (event: IEvent) => {
    setSelectedEvent(event);
    onOpen();
  };

  const localizer = dayjsLocalizer(dayjs);
  const DgnDpCalendar = withDragAndDrop(Calendar);

  const onEventDrop = ({ event, start, end }: { event: IEvent; start: Date; end: Date }) => {
    const updatedEvents = eventList.map((existingEvent) =>
      existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    );
    setEventList(updatedEvents);
  };

  const [eventList, setEventList] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const buildListEvents = (events: IEvent[]) => {
    const list: IEvent[] = events.map(event => ({
      ...event,
      start: dayjs(event.start).toDate(),
      end: dayjs(event.end).toDate(),
    }));
    setEventList(list);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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
            events={eventList}
            components={components}
            onEventDrop={onEventDrop}
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
            aria-label="loading events"
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
