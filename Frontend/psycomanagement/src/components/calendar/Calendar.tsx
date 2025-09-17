import { useEffect, useMemo, useState } from "react";
import "./calendar.css";
import ContentEventView from "./EventContent";
import { CircularProgress, useDisclosure } from "@nextui-org/react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { CalendarDisplayEvent, CalendarEventResponse } from "../../types/models";

dayjs.locale("es");

interface CustomCalendarProps {
  listEvents: CalendarEventResponse[];
}

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

const DndCalendar = withDragAndDrop(Calendar);

const CustomCalendar = ({ listEvents }: CustomCalendarProps): JSX.Element => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState<CalendarDisplayEvent | null>(null);
  const [eventList, setEventList] = useState<CalendarDisplayEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const localizer = dayjsLocalizer(dayjs);

  const components = useMemo(
    () => ({
      event: ({ title }: { title: string }) => <div>{title}</div>,
    }),
    []
  );

  const handleEventClick = (event: CalendarDisplayEvent) => {
    setSelectedEvent(event);
    onOpen();
  };

  useEffect(() => {
    const list = listEvents.map((event) => ({
      title: event.title,
      start: dayjs(event.start_date).toDate(),
      end: dayjs(event.end_date).toDate(),
    }));
    setEventList(list);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [listEvents]);

  return (
    <>
      {!isLoading ? (
        <div className="col-span-8 mt-32 h-[450px] mx-6">
          <DndCalendar
            localizer={localizer}
            views={["month", "week", "day"]}
            defaultView="month"
            messages={messages}
            onSelectEvent={handleEventClick}
            events={eventList}
            components={components}
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
