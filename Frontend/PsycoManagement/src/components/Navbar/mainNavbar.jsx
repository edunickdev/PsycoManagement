import { Link, useLocation } from "react-router-dom";
import { Avatar, Button } from "@nextui-org/react";
import { staticFiles } from "../../config/statics";

const Navbar = () => {
  const path = useLocation();
  const currentPath = path.pathname;

  return (
    <nav className="grid grid-cols-12 bg-blue-900 mb-1 shadow-md shadow-gray-800 fixed w-full py-1">
      <div className="col-span-2"></div>
      <div className="col-span-8">
        <ul className="flex justify-between items-center h-full text-2xl text-gray-300">
          <li>
            <Link to={"/tools"} className={`${currentPath === "/home" ? "hidden" : ""}`}>LectorIA</Link>
          </li>
          <li>
            <Link to={"/dashboards"} className={`${currentPath === "/home" ? "hidden" : ""}`}>Dashboard</Link>
          </li>
          <Link to={"/home"}>
            <div className="flex items-center bg-white -mb-12 relative rounded-full p-2 shadow-md shadow-gray-800">
              <img
                src={staticFiles.mainLogo}
                alt={staticFiles.mainLogo}
                className="relative z-10 w-20 h-20 object-contain"
              />
            </div>
          </Link>
          <li>
            <Link to={"/consultants"} className={`${currentPath === "/home" ? "hidden" : ""}`}>Consultantes</Link>
          </li>
          <li>
            <Link to={"/calendar"} className={`${currentPath === "/home" ? "hidden" : ""}`}>Agenda</Link>
          </li>
        </ul>
      </div>
      <div className="col-span-2 flex justify-self-center items-center">
        <Button className="ml-20 rounded-full">
          <Link to={"/auth"}>
            <Avatar showFallback />
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
