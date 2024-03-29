/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "../components/footer/mainFooter";
import CustomCalendar from "../components/calendar/Calendar";
import ConsultantListCard from "../components/calendar/consultants-list/ConsultantsList";
import StatesCalendar from "../components/calendar/StatesCalendar";
import { useEffect, useState } from "react";
import { TherapistAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/elementals";

const AgendaPage = () => {
  const { getId } = TherapistAuth();
  const id = getId();

  const [eventList, setEventList] = useState([]);

  const get_events = () => {
    fetch(`${API_BASE_URL}events/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEventList(data["events"]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    get_events();
  }, []);

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
