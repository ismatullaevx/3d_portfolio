import React from "react";

import logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <div className="relative mt-12 min-h-[220px] select-none bg-black-200 px-4 py-10 xs:px-6 sm:mt-20 sm:px-16 sm:py-12">
      <img src={logo} alt="logo" className="m-auto w-16 sm:w-20" />

      <p className="absolute bottom-8 left-0 right-0 mx-auto px-4 text-center text-[14px] leading-7 text-secondary sm:text-[17px] sm:leading-[30px]">
        {new Date().getFullYear()} &copy; KHOJIAKBAR ISMATULLAEV. <br /> All
        rights reserved.
      </p>
    </div>
  );
};

export default Footer;
