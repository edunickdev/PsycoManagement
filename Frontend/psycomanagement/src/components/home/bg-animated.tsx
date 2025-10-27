import React from 'react';
import { staticFiles } from "../../config/statics";

const BgContentHome: React.FC = () => {
  return (
    <>
      <video autoPlay loop muted className="h-screen py-10 w-screen object-cover">
        <source src={staticFiles.shortHome} type="video/mp4" />
      </video>
      <div className="absolute inset-0 opacity-80 bg-gradient-to-b from-black to-slate-800"></div>
    </>
  );
};


export default BgContentHome;
