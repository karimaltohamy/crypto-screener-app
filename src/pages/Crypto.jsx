import React, { useContext, useRef } from "react";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import TableComponent from "../components/TableComponent";
import submitIcon from "../assets/submit-icon.svg";
import { CryptoContext } from "../ContextApi/CryptoContext";
import { Outlet } from "react-router-dom";

const Crypto = () => {
  const perPageValue = useRef();

  const { setPerPage, perPage, cryptoData } = useContext(CryptoContext);

  const handlePerPage = () => {
    const value = perPageValue.current.value;
    setPerPage(value);
  };

  return (
    <div className="w-full flex flex-col items-center mt-[5rem]">
      <Filters />
      <TableComponent />

      <div className="mt-6 mb-6 flex w-[80%] items-center justify-between flex-col md:flex-row gap-4">
        <p className="text-md text-bold">
          Data Provided By{" "}
          <a className="text-cyan" href="https://www.coingecko.com/">
            CoinGecko
          </a>
        </p>

        {cryptoData && cryptoData.length >= perPage ? (
          <div className="flex items-center flex-col md:flex-row gap-4">
            <label className="flex gap-1 items-center text-md mr-0 md:mr-16 font-semibold">
              per page:
              <input
                className="w-[4rem] pl-2  rounded-md bg-gray-200 focus:outline-none border focus:border-cyan"
                type="number"
                placeholder="10"
                ref={perPageValue}
              />
              <button type="submit" onClick={handlePerPage}>
                <img
                  className="w-[29px] h-[29px]"
                  src={submitIcon}
                  alt="submit-icon"
                />
              </button>
            </label>
            <Pagination />
          </div>
        ) : null}
      </div>
      <Outlet />
    </div>
  );
};

export default Crypto;
