import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { staticFiles } from "../../config/statics";

const Footer = () => {
  return (
    <footer className="col-span-12 flex justify-center items-center py-2 bg-blue-900 fixed bottom-0 left-0 right-0 z-30">
      <span className="text-center font-semibold text-gray-400">
        Página desarrollada y administrada por
        <Popover showArrow color="success" >
          <PopoverTrigger>
            <span className="px-1 text-slate-300"> Nicolás Sarmiento (SnowDev)</span>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col p-1">
              <span>Contactame en: </span>
              <div className="flex">
                <a href="#">
                  <img src={staticFiles.logoInstagram} alt={staticFiles.logoInstagram} />
                </a>
                <a href="#">
                  <img src={staticFiles.logoLinkeind} alt={staticFiles.logoInstagram} />
                </a>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </span>
    </footer>
  );
};

export default Footer;
