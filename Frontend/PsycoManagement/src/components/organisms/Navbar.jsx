import React from "react";
import { Link } from "react-router-dom";
import { TherapistAuth } from "../../context/AuthContext";
import { staticFiles } from "../../config/statics";
import NavItem from "../molecules/NavItem";
import Dropdown from "../molecules/Dropdown";
import UserSummary from "../molecules/UserSummary";
import Avatar from "../atoms/Avatar";

const Navbar = () => {
  const { user } = TherapistAuth();

  return (
    <nav className="fixed top-4 inset-x-0 z-50 px-4 flex justify-center h-16 pointer-events-none">
      <div className="flex items-center w-full max-w-6xl pointer-events-auto">
        <div className="flex-1 flex justify-start items-center">
          <div className="hidden md:flex space-x-2">
            <NavItem to="/tools" hidden={!user}>LectorIA</NavItem>
            <NavItem to="/dashboards" hidden={!user}>Dashboard</NavItem>
          </div>
        </div>

        <div className="relative flex-none px-4">
          <Link to="/home">
            <div className="bg-white p-2 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] border-2 border-primary/20 transform transition-transform hover:scale-110 active:scale-95 duration-300">
              <img
                src={staticFiles.mainLogo}
                alt="PsycoManagement"
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
            </div>
          </Link>
        </div>

        <div className="flex-1 flex justify-end items-center space-x-2">
          <div className="hidden md:flex space-x-2 mr-4">
            <NavItem to="/consultants" hidden={!user}>Consultantes</NavItem>
            <NavItem to="/agenda" hidden={!user}>Agenda</NavItem>
          </div>

          <Dropdown
            trigger={
              <div className="flex items-center space-x-3 p-1.5 glass rounded-full hover:bg-white/20 transition-all duration-300 group cursor-pointer border border-white/10">
                <div className="hidden lg:flex flex-col items-end pr-1">
                  <span className="text-xs font-semibold text-primary leading-none uppercase">
                    {user ? "Terapeuta" : "Bienvenido"}
                  </span>
                  <span className="text-sm font-medium text-white truncate max-w-[120px]">
                    {user ? user.names.split(" ")[0] : "Ingresar"}
                  </span>
                </div>
                <Avatar 
                  name={user ? user.names : "U"} 
                  src={user ? "https://i.pravatar.cc/150?u=a04258114e29026702d" : null}
                  size="md"
                  className="group-hover:scale-105 transition-transform"
                />
              </div>
            }
          >
            <UserSummary />
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
