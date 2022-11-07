import React, { useContext, useState } from "react";
import debounce from "lodash.debounce";
import search from "../assets/search-icon.svg";
import { CryptoContext } from "../ContextApi/CryptoContext";

const SearchInput = ({ debounceFun }) => {
  const [valueSearch, setValueSearch] = useState("");

  const { coinsSearch, setCoinSelected } = useContext(CryptoContext);

  const handleInput = (e) => {
    const value = e.target.value;
    setValueSearch(value);
    debounceFun(value);
  };

  const selectCoin = (id) => {
    setCoinSelected(id);
    setValueSearch("");
  };
  return (
    <>
      <form className="relative w-full">
        <input
          className="w-full bg-gray-200 rounded p-1 px-3 focus:outline-none border focus:border-cyan"
          type="text"
          placeholder="Search here..."
          onChange={handleInput}
          value={valueSearch}
        />
        <button type="submit" className="cursor-pointer">
          <img
            src={search}
            alt="search"
            className="absolute right-2 top-1/2 -translate-y-1/2 required"
          />
        </button>
      </form>

      {valueSearch.length > 0 ? (
        <ul className="absolute top-10 p-3 overflow-y-auto bg-opacity-60 backdrop-blur-md h-96 w-full bg-gray-200 scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200">
          {coinsSearch ? (
            coinsSearch.map((item) => (
              <li
                className="flex gap-3 mb-3 cursor-pointer"
                key={item.id}
                onClick={() => selectCoin(item.id)}
              >
                <img src={item.thumb} alt={item.thumb} />
                <span>{item.name}</span>
              </li>
            ))
          ) : (
            <div className="absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
              <div className="  w-[40px] h-[40px] border-4 rounded-full  border-cyan border-t-transparent animate-spin "></div>
              <h2>Loading...</h2>
            </div>
          )}
        </ul>
      ) : null}
    </>
  );
};

const Search = () => {
  const { getCoinsSearch } = useContext(CryptoContext);

  const debounceFun = debounce(function (value) {
    getCoinsSearch(value);
  }, 200);

  return (
    <div className="relative flex w-full md:w-[35%]">
      <SearchInput debounceFun={debounceFun} />
    </div>
  );
};

export default Search;
