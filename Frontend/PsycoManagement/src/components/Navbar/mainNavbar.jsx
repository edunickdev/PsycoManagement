import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
} from "@nextui-org/react";
import { staticFiles } from "../../config/statics";
import { UserTwitterCard } from "./usercard";
import { TherapistAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user } = TherapistAuth();
  const [userNames, setUserNames] = useState("");

  useEffect(() => {
    if (user) {
      setUserNames(user.names);
    }
  }, [user]);
  


  return (
    <nav className="grid grid-cols-12 grid-rows-5 my-2 fixed w-full py-1 z-30 h-20 pb-5">
      <div className="col-span-2 row-span-5"></div>
      <div className="col-span-8 row-span-3 bg-blue-900 px-5 rounded-xl -mb-5 shadow-md shadow-black">
        <ul className="flex justify-between items-center h-full text-2xl text-gray-300">
          <li>
            <Link
              to={"/tools"}
              className={`${!user ? "hidden" : ""}`}
            >
              LectorIA
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboards"}
              className={`${!user ? "hidden" : ""}`}
            >
              Dashboard
            </Link>
          </li>
          <Link to={"/home"}>
            <div className="flex items-center bg-white -mb-8 relative rounded-full p-2 shadow-md shadow-gray-800 border border-solid border-gray-500">
              <img
                src={staticFiles.mainLogo}
                alt={staticFiles.mainLogo}
                className="relative z-10 w-20 h-20 object-contain"
              />
            </div>
          </Link>
          <li>
            <Link
              to={"/consultants"}
              className={`${!user? "hidden" : ""}`}
            >
              Consultantes
            </Link>
          </li>
          <li>
            <Link
              to={"/agenda"}
              className={`${!user ? "hidden" : ""}`}
            >
              Agenda
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-span-2 row-span-5 flex justify-self-center items-center">
        <Popover showArrow placement="bottom" className="ml-20 rounded-full shadow-md shadow-gray-600">
          <PopoverTrigger>
            <User
              as="button"
              name={userNames}
              description="Clinical Psychologist"
              className="transition-transform"
            />
          </PopoverTrigger>
          <PopoverContent className="p-1">
            <UserTwitterCard />
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;
