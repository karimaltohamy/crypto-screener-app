import React from "react";
import logoImg from "../assets/logo.svg";

const Logo = () => {
  return (
    <div className="flex gap-1 items-center absolute top-4 left-4">
      <img src={logoImg} alt="logo" />
      <h1 className="text-cyan text-lg">CryptoBucks</h1>
    </div>
  );
};

export default Logo;
