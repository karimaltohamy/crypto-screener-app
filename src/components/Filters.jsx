import React, { useContext, useRef } from "react";
import Search from "./Search";
import submitIcon from "../assets/submit-icon.svg";
import { CryptoContext } from "../ContextApi/CryptoContext";
import selectIcon from "../assets/select-icon.svg";

const Filters = () => {
  const currencyValue = useRef();

  const { setCurrency, setOrder, resetCtyptoFun } = useContext(CryptoContext);

  const handleCurrncy = () => {
    const value = currencyValue.current.value;
    setCurrency(value);
  };

  const handleSelected = (e) => {
    const value = e.target.value;
    setOrder(value);
  };

  return (
    <div className="relative w-[80%] border-2 border-gray-100 rounded-md py-3 px-2 md:px-6 flex items-start md:items-center justify-between flex-col md:flex-row gap-4">
      <Search />
      <div className="flex items-start md:items-center justify-between flex-col gap-4 md:flex-row">
        <label className="flex gap-1 items-center text-md mr-13 font-semibold">
          currency:
          <input
            className="w-[4rem] pl-2  rounded-md bg-gray-200 focus:outline-none border focus:border-cyan"
            type="text"
            placeholder="usd"
            ref={currencyValue}
          />
          <button type="submit" onClick={handleCurrncy}>
            <img
              className="w-[29px] h-[29px]"
              src={submitIcon}
              alt="submit-icon"
            />
          </button>
        </label>
        <label className="flex gap-1 items-center text-md font-semibold relative">
          sort by:
          <select
            className="p-1 px-4  rounded-md bg-gray-200 focus:outline-none border focus:border-cyan"
            onClick={handleSelected}
          >
            <option value="market_cap_desc">market cap desc</option>
            <option value="market_cap_asc">market cap asc</option>
            <option value="volume_asc">volume asc</option>
            <option value="volume_desc">volume desc</option>
            <option value="gecko_desc">gecko desc</option>
            <option value="gecko_asc">gecko asc</option>
            <option value="id_asc">id asc</option>
            <option value="id_desc">id desc</option>
          </select>
          <img
            className="absolute right-0  w-[19px] top-[10px] pointer-events-none"
            src={selectIcon}
            alt="select-icon"
          />
        </label>

        <button
          className="ml-8 absolute right-[8px] md:relative md:right-0"
          onClick={resetCtyptoFun}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
            style={{
              msTransform: "rotate(360deg)",
              WebkitTransform: "rotate(360deg)",
              transform: "rotate(360deg)",
            }}
          >
            <path
              fill="#14ffec"
              d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z"
            />
            <path
              fill="#14ffec"
              d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"
            />
            <path fill="rgba(0, 0, 0, 0)" d="M0 0h24v24H0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Filters;
