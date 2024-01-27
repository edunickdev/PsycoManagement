import React from "react";
import Footer from "../components/footer/mainFooter";
import CustomCalendar from "../components/calendar/Calendar";

const AgendaPage = () => {
    return (
        <div className="grid grid-cols-12">
            <div className="cols-span-3">
            </div>
            <div className="cols-span-9">
                <CustomCalendar/>
            </div>         
        </div>
    );
};

export default AgendaPage;
