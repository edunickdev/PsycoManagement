import React from "react";
import Dropdown from "../molecules/Dropdown";
import { staticFiles } from "../../config/statics";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-navy-900/80 backdrop-blur-md border-t border-white/5 py-3 px-6 flex justify-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <div className="flex items-center space-x-1 mb-2 md:mb-0">
          <span className="font-medium">Conoce al desarrollador:</span>
          <span className="text-primary font-bold">El Código Recuerda - ECR</span>
        </div>

        <Dropdown
          trigger={
            <span className="px-3 py-1 bg-white/5 rounded-full hover:bg-white/10 transition-colors cursor-pointer border border-white/5 text-gray-300 font-semibold">
              por Nicolás Sarmiento
            </span>
          }
        >
          <div className="flex flex-col p-2 min-w-[150px]">
            <span className="text-gray-400 mb-2 font-medium">Contáctame:</span>
            <div className="flex space-x-3">
              <a href="#" className="hover:scale-110 transition-transform bg-white/5 p-2 rounded-lg border border-white/10">
                <img src={staticFiles.logoInstagram} alt="Instagram" className="w-5 h-5 invert opacity-70 hover:opacity-100" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform bg-white/5 p-2 rounded-lg border border-white/10">
                <img src={staticFiles.logoLinkeind} alt="LinkedIn" className="w-5 h-5 invert opacity-70 hover:opacity-100" />
              </a>
            </div>
          </div>
        </Dropdown>
      </div>
    </footer>
  );
};

export default Footer;
