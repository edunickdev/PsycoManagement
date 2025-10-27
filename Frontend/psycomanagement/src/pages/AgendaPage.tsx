/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Footer from "../components/footer/mainFooter";
import CustomCalendar from "../components/calendar/Calendar";
import ConsultantListCard from "../components/calendar/consultants-list/ConsultantsList";
import StatesCalendar from "../components/calendar/StatesCalendar";
import { useAuthStore } from "../context/stores";
import { API_BASE_URL } from "../config/elementals";

// Define the interface for an event
interface IEvent {
  // Assuming a basic event structure. Adjust if you have more specific fields.
  id: number | string;
  title: string;
  start: string | Date;
  end: string | Date;
  [key: string]: any; // Allow other properties
}

const AgendaPage: React.FC = () => {
  const { getId } = useAuthStore();
  const id: string | null = getId();

  const [eventList, setEventList] = useState<IEvent[]>([]);

  const get_events = (): void => {
    if (!id) return; // Don't fetch if id is null

    fetch(`${API_BASE_URL}events/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: { events: IEvent[] }) => {
        setEventList(data.events);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    get_events();
  }, [id]); // Add id as a dependency to refetch if it changes

  return (
    <div className="grid grid-cols-12">
      <ConsultantListCard />
      <CustomCalendar listEvents={eventList} />
      <StatesCalendar />
      <Footer />
    </div>
  );
};

export default AgendaPage;
