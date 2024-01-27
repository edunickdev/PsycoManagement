import Footer from "../components/footer/mainFooter";
import CustomCalendar from "../components/calendar/Calendar";
import Prueba from "../components/calendar/prueba";
import Prueba2 from "../components/calendar/prueba2";

const AgendaPage = () => {
  return (
    <div className="grid grid-cols-12">
      <Prueba />
      <CustomCalendar />
      <Prueba2 />
      <Footer />
    </div>
  );
};

export default AgendaPage;
