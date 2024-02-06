import Footer from "../components/footer/mainFooter";
import CustomCalendar from "../components/calendar/Calendar";
import ConsultantListCard from "../components/calendar/consultants-list/ConsultantsList";
import StatesCalendar from "../components/calendar/StatesCalendar";
import { useEffect, useState } from "react";
import { TherapistAuth } from "../context/AuthContext";

const AgendaPage = () => {

  const { getId } = TherapistAuth();
  const id = getId();

  const [eventList, setEventList] = useState([]);

  const get_events = () => {
    fetch(`http://127.0.0.1:8000/events/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  }
  , []);


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
