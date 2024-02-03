import Footer from "../components/footer/mainFooter";
import CustomCalendar from "../components/calendar/Calendar";
import ConsultantListCard from "../components/calendar/consultants-list/ConsultantsList";
import StatesCalendar from "../components/calendar/StatesCalendar";

const AgendaPage = () => {
  return (
    <div className="grid grid-cols-12">
      <ConsultantListCard />
      <CustomCalendar />
      <StatesCalendar />
      <Footer />
    </div>
  );
};

export default AgendaPage;
