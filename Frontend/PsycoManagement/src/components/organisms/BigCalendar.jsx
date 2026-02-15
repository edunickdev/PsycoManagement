import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import dayjs from "dayjs";
import "dayjs/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "../../styles/calendar.css";
import Modal from "../molecules/Modal";
import EventForm from "../organisms/EventForm";
import EventDetails from "../molecules/EventDetails";

dayjs.locale("es");

const BigCalendar = ({ listEvents }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const localizer = dayjsLocalizer(dayjs);
  const DgnDpCalendar = withDragAndDrop(Calendar);

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

  useEffect(() => {
    if (listEvents) {
      setTimeout(() => setIsLoading(false), 800);
    }
  }, [listEvents]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const onEventDrop = ({ event, start, end }) => {
    console.log("Dropped:", event, start, end);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] space-y-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-gray-400 text-sm font-light">Sincronizando agenda...</p>
      </div>
    );
  }

  return (
    <div className="h-[650px] calendar-container">
      <DgnDpCalendar
        localizer={localizer}
        events={listEvents}
        views={["month", "week", "day"]}
        defaultView={"month"}
        messages={messages}
        onSelectEvent={handleEventClick}
        onEventDrop={onEventDrop}
        resizable
        className="text-white"
      />

      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Detalles de la Cita"
      >
        <EventDetails 
          selectedEvent={selectedEvent} 
          onClose={() => setIsDetailModalOpen(false)} 
        />
      </Modal>
    </div>
  );
};

export default BigCalendar;
