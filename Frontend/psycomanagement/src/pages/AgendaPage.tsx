import Footer from "../components/footer/mainFooter";
import CustomCalendar from "../components/calendar/Calendar";
import ConsultantListCard from "../components/calendar/consultants-list/ConsultantsList";
import StatesCalendar from "../components/calendar/StatesCalendar";
import { useEffect, useState } from "react";
import { TherapistAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/elementals";
import { CalendarEventResponse } from "../types/models";

const AgendaPage = (): JSX.Element => {
  const { getId, getToken } = TherapistAuth();
  const [eventList, setEventList] = useState<CalendarEventResponse[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchEvents = async () => {
      try {
        const id = getId();
        const token = getToken();
        if (!id || !token) {
          return;
        }

        const response = await fetch(`${API_BASE_URL}events/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          signal,
        });

        if (!response.ok) {
          throw new Error(`Error fetching events: ${response.statusText}`);
        }

        const data: { events: CalendarEventResponse[] } = await response.json();
        setEventList(data.events ?? []);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error(error);
        }
      }
    };

    void fetchEvents();

    return () => {
      controller.abort();
    };
  }, [getId, getToken]);

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
