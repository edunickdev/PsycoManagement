/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  User as NextUiUser,
} from "@nextui-org/react";
import { staticFiles } from "../../config/statics";
import { UserCard } from "../navbar/usercard";
import { TherapistAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const { user } = TherapistAuth();

  return (
    <nav className="grid grid-cols-12 grid-rows-5 my-2 fixed w-full py-1 z-30 h-20 pb-5">
      <div className="col-span-2 row-span-5"></div>
      <div className="col-span-8 row-span-3 bg-quinary px-14 rounded-2xl -mb-5 shadow-md shadow-cuarter">
        <ul className="flex justify-between items-center h-full text-2xl text-gray-300">
          <li>
            <Link to={"/tools"} className={`${!user ? "hidden" : ""}`}>
              LectorIA
            </Link>
          </li>
          <li>
            <Link to={"/dashboards"} className={`${!user ? "hidden" : ""}`}>
              Dashboard
            </Link>
          </li>
          <Link to={"/home"}>
            <div className="flex items-center bg-white -mb-6 relative rounded-full p-2 shadow-md shadow-cuarter border border-solid border-cuarter">
              <img
                src={staticFiles.mainLogo}
                alt="Main Logo"
                className="relative z-10 w-20 h-20 object-contain"
              />
            </div>
          </Link>
          <li>
            <Link to={"/consultants"} className={`${!user ? "hidden" : ""}`}>
              Consultantes
            </Link>
          </li>
          <li>
            <Link to={"/agenda"} className={`${!user ? "hidden" : ""}`}>
              Agenda
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-span-2 row-span-5 flex justify-self-center items-center">
        <Popover
          showArrow
          placement="bottom"
          className="ml-20 rounded-full shadow-md shadow-gray-600"
        >
          <PopoverTrigger>
            <NextUiUser
              as="button"
              name={
                user != null
                  ? user.names.split(" ")[0] + " " + user.names.split(" ")[2]
                  : "Autenticación"
              }
              description={user != null ? "Configuración" : "Ingresar"}
              className="transition-transform"
            />
          </PopoverTrigger>
          <PopoverContent className="p-1">
            <UserCard />
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;
