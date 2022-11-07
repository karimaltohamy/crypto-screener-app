import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoContext } from "../ContextApi/CryptoContext";
import Chart from "./Chart";

const Indicator = ({ currentPrice, low, hight }) => {
  const [green, setGreen] = useState();

  useEffect(() => {
    let total = hight - low;
    let greenZone = ((hight - currentPrice) * 100) / total;
    setGreen(Math.ceil(greenZone));
  }, [currentPrice, hight, low]);

  return (
    <div className="flex justify-between items-center">
      <span
        className="bg-red  h-[5px] rounded-l-md"
        style={{ width: `${100 - green}%` }}
      ></span>
      <span
        className="bg-green  h-[5px] rounded-r-md"
        style={{ width: `${green}%` }}
      ></span>
    </div>
  );
};

const CryptoDetails = () => {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const { getCoinDetails, coinDetails, currency } = useContext(CryptoContext);

  const close = () => {
    navigate("..");
  };

  useLayoutEffect(() => {
    getCoinDetails(coinId);
  }, [getCoinDetails, coinId]);

  return ReactDOM.createPortal(
    <div
      className="fixed left-0 top-0 flex items-center justify-center bg-gray-200 bg-opacity-60 backdrop-blur-sm w-full h-full cursor-pointer z-50"
      onClick={close}
    >
      <div
        className="w-[90%] lg:w-[75%] xl:w-[65%] h-[75%] bg-gray-300 bg-opacity-70 flex justify-between relative text-white overflow-y-auto flex-col md:flex-row scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {coinDetails ? (
          <>
            <div className="w-full md:w-[45%] p-4">
              <div className="flex items-center gap-2">
                <img
                  className="w-[45px] h-[45px]"
                  src={coinDetails.image.small}
                  alt="img-details"
                />
                <h3 className="text-xl">{coinDetails.name}</h3>
                <span className="text-cyan px-3 text-md uppercase rounded-md bg-cyan bg-opacity-30">
                  {coinDetails.symbol}
                </span>
              </div>

              <div className="mt-5">
                <div className=" flex justify-between">
                  <span className="text-gray-100 text-md">Price</span>
                  <span
                    className={` px-2 text-md uppercase rounded-md  bg-opacity-30 flex items-center gap-1 ${
                      Number(
                        coinDetails.market_data.market_cap_change_percentage_24h
                      ) >= 0
                        ? "bg-green text-green"
                        : "text-red bg-red"
                    }`}
                  >
                    {Number(
                      coinDetails.market_data.market_cap_change_percentage_24h
                    ).toFixed(2)}
                    %
                    <svg
                      width={14}
                      height={14}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={` ${
                        Number(
                          coinDetails.market_data
                            .market_cap_change_percentage_24h
                        ) >= 0
                          ? "fill-green text-green rotate-180"
                          : "text-red fill-red"
                      }`}
                    >
                      <path d="M7.48 11.415a.582.582 0 0 1-.96 0L1.27 3.832a.583.583 0 0 1 .48-.915h10.5a.584.584 0 0 1 .48.915l-5.25 7.583Z" />
                    </svg>
                  </span>
                </div>
                <h1 className="text-xl text-bold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: currency,
                    maximumSignificantDigits: 5,
                  }).format(coinDetails.market_data.current_price[currency])}
                </h1>
              </div>

              <div className="flex justify-between flex-col md:flex-row gap-[16px] mt-4">
                <div>
                  <span className="text-gray-100 text-md">Market Cap</span>
                  <h1 className=" text-bold text-[21px]">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumSignificantDigits: 5,
                    }).format(coinDetails.market_data.market_cap[currency])}
                  </h1>
                </div>
                <div>
                  <span className="text-gray-100 text-md">
                    Fully Diluted Valuatiion
                  </span>
                  <h1 className="text-bold text-[21px]">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      notation: "compact",
                    }).format(
                      coinDetails.market_data.fully_diluted_valuation[currency]
                    )}
                  </h1>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-gray-100 text-md">Total Valume</span>
                <h1 className="text-bold text-[21px]">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: currency,
                    maximumSignificantDigits: 5,
                  }).format(coinDetails.market_data.total_volume[currency])}
                </h1>
              </div>

              <div className="mt-4">
                <Indicator
                  currentPrice={coinDetails.market_data.current_price[currency]}
                  low={coinDetails.market_data.low_24h[currency]}
                  hight={coinDetails.market_data.high_24h[currency]}
                />
              </div>

              <div className="flex justify-between mt-4">
                <div>
                  <span className="text-gray-100 text-md">Low 24H</span>
                  <h1 className=" text-bold text-[21px]">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(coinDetails.market_data.low_24h[currency])}
                  </h1>
                </div>
                <div>
                  <span className="text-gray-100 text-md">High 24H</span>
                  <h1 className="text-bold text-[21px]">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(coinDetails.market_data.high_24h[currency])}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <div>
                  <span className="text-gray-100 text-md">Max Supply</span>
                  <h1 className=" text-bold text-[21px]">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(coinDetails.market_data.max_supply)}
                  </h1>
                </div>
                <div>
                  <span className="text-gray-100 text-md">
                    Circulating Supply
                  </span>
                  <h1 className="text-bold text-[21px]">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(coinDetails.market_data.circulating_supply)}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-col sm:flex-row mt-5">
                <div className="flex flex-col gap-2">
                  {coinDetails.links.homepage && (
                    <a
                      className="p-1 rounded-md bg-gray-200 text-gray-100"
                      href={coinDetails.links.homepage[0]}
                    >
                      {coinDetails?.links?.homepage[0].substring(0, 30)}
                    </a>
                  )}
                  {coinDetails.links.blockchain_site && (
                    <a
                      className="p-1 rounded-md bg-gray-200 text-gray-100"
                      href={coinDetails?.links?.blockchain_site[0]}
                    >
                      {coinDetails?.links?.blockchain_site[0].substring(0, 30)}
                    </a>
                  )}

                  {coinDetails.links.official_forum_url.length > 0 && (
                    <a
                      className="p-1 rounded-md bg-gray-200 text-gray-100"
                      href={coinDetails?.links?.official_forum_url[0]}
                    >
                      {coinDetails?.links?.official_forum_url[0].substring(
                        0,
                        30
                      )}
                    </a>
                  )}
                </div>

                <div>
                  <span className="text-gray-100 text-md mb-2 block">
                    Sentiment
                  </span>
                  <span className="px-2 text-md uppercase rounded-md  bg-opacity-30 flex items-center gap-1 bg-green text-green mb-3">
                    {Number(coinDetails.sentiment_votes_up_percentage)}%
                    <svg
                      width={14}
                      height={14}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-green text-green rotate-180"
                    >
                      <path d="M7.48 11.415a.582.582 0 0 1-.96 0L1.27 3.832a.583.583 0 0 1 .48-.915h10.5a.584.584 0 0 1 .48.915l-5.25 7.583Z" />
                    </svg>
                  </span>
                  <span className="px-2 text-md uppercase rounded-md  bg-opacity-30 flex items-center gap-1 bg-red text-red mb-3">
                    {Number(
                      coinDetails.sentiment_votes_down_percentage
                    ).toFixed(2)}
                    %
                    <svg
                      width={14}
                      height={14}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-red text-red"
                    >
                      <path d="M7.48 11.415a.582.582 0 0 1-.96 0L1.27 3.832a.583.583 0 0 1 .48-.915h10.5a.584.584 0 0 1 .48.915l-5.25 7.583Z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[55%]">
              <Chart coinDetails={coinDetails} />
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="  w-[40px] h-[40px] border-4 rounded-full  border-cyan border-t-transparent animate-spin "></div>
            <h2>Loading...</h2>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("model")
  );
};

export default CryptoDetails;
