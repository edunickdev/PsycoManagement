import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import dayjs from "dayjs";
import "dayjs/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./calendarStyles.css";
import { getAppointments, updateAppointment } from "../../services/calendar/calendarServices";
import { TherapistAuth } from "../../context/AuthContext";
import EventForm from "./EventForm";
import Modal from "../molecules/Modal";

dayjs.locale("es");
const localizer = dayjsLocalizer(dayjs);
const DnDCalendar = withDragAndDrop(Calendar);

const CustomCalendar = () => {
  const { getId } = TherapistAuth();
  const idTherapist = getId();
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (idTherapist) {
        const data = await getAppointments(idTherapist);
        const formattedEvents = data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
          title: event.title || "Sin título",
        }));
        setEvents(formattedEvents);
      }
    };
    fetchEvents();
  }, [idTherapist]);

  const onEventDrop = async ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };
    const success = await updateAppointment(updatedEvent);
    if (success) {
      setEvents(events.map((e) => (e.id === event.id ? updatedEvent : e)));
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="h-full w-full">
      <DnDCalendar
        localizer={localizer}
        events={events}
        onEventDrop={onEventDrop}
        onSelectEvent={handleSelectEvent}
        resizable
        style={{ height: "100%" }}
        messages={{
          next: "Sig.",
          previous: "Ant.",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedEvent ? "Editar Cita" : "Nueva Cita"}
      >
        <EventForm 
           event={selectedEvent} 
           onClose={() => setIsModalOpen(false)} 
           onSave={(newEvent) => {
             setEvents([...events, newEvent]);
             setIsModalOpen(false);
           }}
        />
      </Modal>
    </div>
  );
};

export default CustomCalendar;
