import React, { useContext } from "react";
import arrowIcon from "../assets/pagination-arrow.svg";
import { CryptoContext } from "../ContextApi/CryptoContext";

const Pagination = () => {
  const { page, setPage, totalPage, perPage } = useContext(CryptoContext);

  const totalNumber = Math.ceil(totalPage / perPage);

  const next = () => {
    if (page === totalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };

  const multistepNext = () => {
    if (page + 3 >= totalNumber) {
      setPage(totalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };
  const multistepPrev = () => {
    if (page - 3 <= 1) {
      setPage(totalNumber + 1);
    } else {
      setPage(page - 2);
    }
  };

  return (
    <ul className="flex items-center gap-2">
      <li>
        <button className="outline-0 border-0" onClick={prev}>
          <img className="rotate-180" src={arrowIcon} alt="arrowIcon" />
        </button>
      </li>
      {page + 1 === totalNumber || page === totalNumber ? (
        <li>
          <button
            className="text-lg outline-0 border-0"
            onClick={multistepPrev}
          >
            ...
          </button>
        </li>
      ) : null}
      {page - 1 === 0 ? null : (
        <li>
          <button
            className="outline-0 border-0 w-[35px] h-[35px] bg-gray-200 rounded-full font-semibold hover:text-cyan"
            onClick={prev}
          >
            {page - 1}
          </button>
        </li>
      )}
      <li>
        <button className="outline-0 border-0 w-[35px] h-[35px] bg-cyan text-gray-300 rounded-full font-semibold pointer-events-none">
          {page}
        </button>
      </li>
      {page + 1 !== totalNumber && page !== totalNumber ? (
        <li>
          <button
            className="outline-0 border-0 w-[35px] h-[35px] bg-gray-200 rounded-full font-semibold hover:text-cyan"
            onClick={next}
          >
            {page + 1}
          </button>
        </li>
      ) : null}
      {page + 1 !== totalNumber && page !== totalNumber ? (
        <li>
          <button
            className="text-lg outline-0 border-0"
            onClick={multistepNext}
          >
            ...
          </button>
        </li>
      ) : null}
      {page === totalNumber ? null : (
        <li>
          <button
            className="outline-0 border-0 w-[35px] h-[35px] bg-gray-200 rounded-full font-semibold"
            onClick={() => setPage(totalNumber)}
          >
            {totalNumber}
          </button>
        </li>
      )}
      <li>
        <button className="outline-0 border-0" onClick={next}>
          <img src={arrowIcon} alt="arrowIcon" />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
