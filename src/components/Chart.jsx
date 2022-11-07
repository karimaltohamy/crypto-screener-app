import React, { useContext, useLayoutEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CryptoContext } from "../ContextApi/CryptoContext";

function CustomTooltip({ payload, label, active, currency = "usd" }) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="label text-sm text-cyan">{`${label} : ${new Intl.NumberFormat(
          "en-IN",
          {
            style: "currency",
            currency: currency,
            maximumFractionDigits: 5,
          }
        ).format(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
}

const ChartComponent = ({ data, currency, type }) => {
  return (
    <ResponsiveContainer height="90%">
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#14ffec"
          strokeWidth={"1px"}
        />
        <CartesianGrid stroke="#323232" />
        <XAxis dataKey="date" hide />
        <YAxis dataKet={type} hide domain={["auto", "auto"]} />
        <Tooltip
          content={<CustomTooltip />}
          currency={currency}
          cursor={false}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

const Chart = ({ coinDetails }) => {
  const [dataChart, setDataChart] = useState();
  const { currency } = useContext(CryptoContext);

  const [type, setType] = useState("prices");
  const [time, setTime] = useState(7);

  useLayoutEffect(() => {
    const getDataChart = async (id) => {
      try {
        const data = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${time}&interval=daily`
        )
          .then((res) => res.json())
          .then((data) => data);

        const convertData = data[type].map((item) => {
          return {
            date: new Date(item[0]).toLocaleDateString(),
            [type]: item[1],
          };
        });

        setDataChart(convertData);
      } catch (error) {
        console.error(error);
      }
    };

    getDataChart(coinDetails.id);
  }, [coinDetails.id, type, time]);

  return (
    <div className="w-[full] h-[60%] p-5">
      <ChartComponent data={dataChart} currency={currency} type={type} />
      <ul className="flex items-center justify-center md:justify-start gap-5 mt-5  flex-wrap">
        <li className="">
          <button
            className={`outline-0 border-none py-1 px-2 text-md rounded-md  bg-opacity-40 ${
              type === "prices"
                ? "text-cyan bg-cyan"
                : "text-gray-100 bg-gray-200"
            }`}
            onClick={() => setType("prices")}
          >
            price
          </button>
        </li>
        <li className="">
          <button
            className={`outline-0 border-none py-1 px-2 text-md rounded-md  bg-opacity-40 ${
              type === "market_caps"
                ? "text-cyan bg-cyan"
                : "text-gray-100 bg-gray-200"
            }`}
            onClick={() => setType("market_caps")}
          >
            Market Cap
          </button>
        </li>
        <li className="">
          <button
            className={`outline-0 border-none py-1 px-2 text-md rounded-md  bg-opacity-40 ${
              type === "total_volumes"
                ? "text-cyan bg-cyan"
                : "text-gray-100 bg-gray-200"
            }`}
            onClick={() => setType("total_volumes")}
          >
            Total Vloumes
          </button>
        </li>
        <li className="">
          <button
            className={`outline-0 border-none py-1 px-2 text-md rounded-md  bg-opacity-40 ${
              time === 7 ? "text-cyan bg-cyan" : "text-gray-100 bg-gray-200"
            }`}
            onClick={() => setTime(7)}
          >
            7d
          </button>
        </li>
        <li className="">
          <button
            className={`outline-0 border-none py-1 px-2 text-md rounded-md  bg-opacity-40 ${
              time === 14 ? "text-cyan bg-cyan" : "text-gray-100 bg-gray-200"
            }`}
            onClick={() => setTime(14)}
          >
            14d
          </button>
        </li>
        <li className="">
          <button
            className={`outline-0 border-none py-1 px-2 text-md rounded-md  bg-opacity-40 ${
              time === 30 ? "text-cyan bg-cyan" : "text-gray-100 bg-gray-200"
            }`}
            onClick={() => setTime(30)}
          >
            30d
          </button>
        </li>
      </ul>

      <div className="mt-7">
        <p className="text-gray-100 text-md mb-3">
          Market Cap Rank:
          <span className="text-white ml-2">{coinDetails.market_cap_rank}</span>
        </p>
        <p className="text-gray-100 text-md mb-3">
          Coingecko rank:
          <span className="text-white ml-2">{coinDetails.coingecko_rank}</span>
        </p>
        <p className="text-gray-100 text-md mb-3">
          Coingecko_score:
          <span className="text-white ml-2">{coinDetails.coingecko_score}</span>
        </p>
      </div>

      <div className="flex mt-8 justify-end items-center">
        <a href={coinDetails.links.repos_url.github[0]}>
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
            className="p-2 rounded-full w-[50px] h-[50px]"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"
              clipRule="evenodd"
              className=" fill-cyan"
            />
            <path fill="rgba(0, 0, 0, 0)" d="M0 0h24v24H0z" />
          </svg>
        </a>
        <a
          href={`https://twitter.com/${coinDetails.links.twitter_screen_name}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 1024 1024"
            style={{
              msTransform: "rotate(360deg)",
              WebkitTransform: "rotate(360deg)",
              transform: "rotate(360deg)",
            }}
            className="p-2 rounded-full w-[50px] h-[50px]"
          >
            <path
              fill="currentColor"
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm215.3 337.7c.3 4.7.3 9.6.3 14.4 0 146.8-111.8 315.9-316.1 315.9-63 0-121.4-18.3-170.6-49.8 9 1 17.6 1.4 26.8 1.4 52 0 99.8-17.6 137.9-47.4-48.8-1-89.8-33-103.8-77 17.1 2.5 32.5 2.5 50.1-2a111 111 0 0 1-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 0 1-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 0 0 229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35 25.1-4.7 49.1-14.1 70.5-26.7-8.3 25.7-25.7 47.4-48.8 61.1 22.4-2.4 44-8.6 64-17.3-15.1 22.2-34 41.9-55.7 57.6z"
              className=" fill-cyan"
            />
            <path fill="rgba(0, 0, 0, 0)" d="M0 0h1024v1024H0z" />
          </svg>
        </a>
        <a href={coinDetails.links.subreddit_url}>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            style={{
              msTransform: "rotate(360deg)",
              WebkitTransform: "rotate(360deg)",
              transform: "rotate(360deg)",
            }}
            className="p-2 rounded-full w-[50px] h-[50px]"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12Zm-4.312-.942c.194.277.304.604.316.942a1.751 1.751 0 0 1-.972 1.596c.014.176.014.352 0 .528 0 2.688-3.132 4.872-6.996 4.872-3.864 0-6.996-2.184-6.996-4.872a3.444 3.444 0 0 1 0-.528 1.75 1.75 0 1 1 1.932-2.868 8.568 8.568 0 0 1 4.68-1.476l.888-4.164a.372.372 0 0 1 .444-.288l2.94.588a1.2 1.2 0 1 1-.156.732L13.2 5.58l-.78 3.744a8.544 8.544 0 0 1 4.62 1.476 1.751 1.751 0 0 1 2.648.258ZM8.206 12.533a1.2 1.2 0 1 0 1.996 1.334 1.2 1.2 0 0 0-1.996-1.334Zm3.806 4.891c1.065.044 2.113-.234 2.964-.876a.335.335 0 1 0-.468-.48A3.936 3.936 0 0 1 12 16.8a3.924 3.924 0 0 1-2.496-.756.324.324 0 0 0-.456.456 4.608 4.608 0 0 0 2.964.924Zm2.081-3.178c.198.132.418.25.655.25a1.199 1.199 0 0 0 1.212-1.248 1.2 1.2 0 1 0-1.867.998Z"
              clipRule="evenodd"
              className=" fill-cyan"
            />
            <path fill="rgba(0, 0, 0, 0)" d="M0 0h24v24H0z" />
          </svg>
        </a>
        <a href={`https://www.facebook.com/${coinDetails.facebook_username}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            style={{
              msTransform: "rotate(360deg)",
              WebkitTransform: "rotate(360deg)",
              transform: "rotate(360deg)",
            }}
            className="p-2 rounded-full w-[50px] h-[50px]"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M0 12.067C0 18.033 4.333 22.994 10 24v-8.667H7V12h3V9.333c0-3 1.933-4.666 4.667-4.666.866 0 1.8.133 2.666.266V8H15.8c-1.467 0-1.8.733-1.8 1.667V12h3.2l-.533 3.333H14V24c5.667-1.006 10-5.966 10-11.933C24 5.43 18.6 0 12 0S0 5.43 0 12.067Z"
              clipRule="evenodd"
              className=" fill-cyan"
            />
            <path fill="rgba(0, 0, 0, 0)" d="M0 0h24v24H0z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Chart;
