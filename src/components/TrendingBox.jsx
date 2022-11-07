import React from "react";
import { useNavigate } from "react-router-dom";

const TrendingBox = ({ item }) => {
  const navigate = useNavigate();

  const goCoinDetailsFun = () => {
    navigate(item.id);
  };

  return (
    <div
      className="w-full lg:w-[40%] bg-gray-200 rounded-md p-3 relative cursor-pointer"
      onClick={goCoinDetailsFun}
    >
      <p className="flex items-center gap-2 text-md text-gray-100">
        Name: <span className="text-cyan">{item.name}</span>
        <img src={item.thumb} alt="img-small-trending" />
      </p>

      <p className="flex items-center gap-2 text-md text-gray-100 mt-2">
        Market Cap Rank:
        <span className="text-cyan">{item.market_cap_rank}</span>
      </p>

      <p className="flex items-center gap-2 text-md text-gray-100 mt-2">
        Price(inBtc):
        <span className="text-cyan">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "btc",
            maximumSignificantDigits: 5,
          }).format(item.price_btc)}
        </span>
      </p>

      <p className="flex items-center gap-2 text-md text-gray-100 mt-2">
        Score:
        <span className="text-cyan">{item.score}</span>
      </p>

      <div className="absolute z-10 hidden sm:block -right-[30px] -top-[30px] lg:top-1/2 lg:-translate-y-1/2 w-[115px] lg:w-[30%] h-auto rounded-full overflow-hidden">
        <img
          className="w-full h-full"
          src={item.large}
          alt="img-large-trending"
        />
      </div>
    </div>
  );
};

export default TrendingBox;
