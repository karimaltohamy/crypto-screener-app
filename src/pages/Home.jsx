import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { CryptoProvider } from "../ContextApi/CryptoContext";
import { TrendingProvider } from "../ContextApi/TrendingContext";
import { SevedProvider } from "../ContextApi/SevedContext";

const Home = () => {
  return (
    <CryptoProvider>
      <TrendingProvider>
        <SevedProvider>
          <main className=" w-full h-full flex flex-col first-letter: content-center items-center relative text-white font-munito ">
            <div className="bg-gray-300 w-screen h-screen fixed -z-10" />
            <Logo />
            <Navigation />
            <Outlet />
          </main>
        </SevedProvider>
      </TrendingProvider>
    </CryptoProvider>
  );
};

export default Home;
