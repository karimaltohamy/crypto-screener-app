import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CryptoContext } from "../ContextApi/CryptoContext";
import { SevedContext } from "../ContextApi/SevedContext";

const StarSeved = ({ id }) => {
  const { savedCoin, allCoins, removeIcoin } = useContext(SevedContext);

  const handleClick = (e) => {
    if (allCoins.includes(id)) {
      removeIcoin(id);
    } else {
      savedCoin(id);
    }
  };

  return (
    <button onClick={() => handleClick()}>
      <svg
        width={30}
        height={30}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`  hover:fill-cyan ${
          allCoins.includes(id) ? "fill-cyan" : "fill-gray-100"
        }`}
      >
        <g clipPath="url(#a)">
          <path d="M22.658 28.333a1.85 1.85 0 0 1-1.033-.316l-6.217-4.167a.183.183 0 0 0-.208 0l-6.217 4.167a1.85 1.85 0 0 1-2.816-2.009l2.041-7.2a.192.192 0 0 0-.066-.2l-5.884-4.625a1.85 1.85 0 0 1 1.075-3.333l7.5-.283a.192.192 0 0 0 .167-.125l2.583-7.025a1.851 1.851 0 0 1 3.475 0l2.584 7.025a.192.192 0 0 0 .166.125l7.5.283a1.85 1.85 0 0 1 1.075 3.333L22.5 18.608a.185.185 0 0 0-.067.2l2.042 7.2a1.858 1.858 0 0 1-1.817 2.325Zm-7.35-6.183c.37.011.727.133 1.025.35l6.217 4.167a.183.183 0 0 0 .283-.209l-2.041-7.2a1.84 1.84 0 0 1 .641-1.958l5.884-4.625a.183.183 0 0 0-.109-.333l-7.5-.284a1.85 1.85 0 0 1-1.666-1.216l-2.584-7.025a.183.183 0 0 0-.35 0l-2.558 7.016a1.85 1.85 0 0 1-1.667 1.217l-7.5.283a.184.184 0 0 0-.177.242c.013.037.037.07.069.092L9.167 17.3a1.85 1.85 0 0 1 .641 1.958l-2.033 7.2a.175.175 0 0 0 .067.2.166.166 0 0 0 .216 0l6.217-4.166a1.85 1.85 0 0 1 1.025-.309l.008-.033Z" />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h30v30H0z" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
};

const Saved = () => {
  const { coinsSaved, resetSavedCoins } = useContext(SevedContext);

  const { currency } = useContext(CryptoContext);
  const navigate = useNavigate();

  const goCoinDetails = (id) => {
    navigate(id);
  };

  return (
    <div className="w-[80%] mt-[4rem] flex flex-col first:items-end">
      <button className="mb-4 ml-auto" onClick={resetSavedCoins}>
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
      <div className="w-full border border-gray-100 rounded ">
        {coinsSaved ? (
          <table className="w-full">
            <thead>
              <tr className=" border-b border-gray-100">
                <th className="p-2 text-gray-100">Asset</th>
                <th className="p-2 text-gray-100 hidden sm:table-cell">Name</th>
                <th className="p-2 text-gray-100">Price</th>
                <th className="p-2 text-gray-100 hidden md:table-cell">
                  Total Volume
                </th>
                <th className="p-2 text-gray-100  hidden md:table-cell">
                  Market Cap Change
                </th>
                <th className="p-2 text-gray-100 hidden sm:table-cell">1H</th>
                <th className="p-2 text-gray-100 hidden sm:table-cell">24H</th>
                <th className="p-2 text-gray-100 hidden sm:table-cell">7D</th>
              </tr>
            </thead>
            <tbody>
              {coinsSaved.map((item) => (
                <tr
                  key={item.id}
                  className="text-center cursor-pointer hover:bg-gray-100 hover:bg-opacity-50 border-b border-gray-100 last:border-b-0"
                >
                  <td className="py-4 flex items-center justify-center gap-[6px]">
                    <StarSeved id={item.id} />
                    <img
                      className="w-[21px] h-[21px]"
                      src={item.image}
                      alt={item.id}
                    />
                    <span
                      className="uppercase "
                      onClick={() => goCoinDetails(item.id)}
                    >
                      {item.symbol}
                    </span>
                  </td>
                  <td className="py-4 hidden sm:table-cell">{item.name}</td>
                  <td className="py-4">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                    }).format(item.current_price)}
                  </td>
                  <td className="py-4 hidden md:table-cell">
                    {item.total_volume}
                  </td>
                  <td className="py-4 hidden md:table-cell">
                    {item.market_cap_change_percentage_24h}%
                  </td>
                  <td
                    className={`py-4 hidden sm:table-cell ${
                      item.price_change_percentage_1h_in_currency > 0
                        ? "text-green"
                        : "text-red"
                    }`}
                  >
                    {Number(
                      item.price_change_percentage_1h_in_currency
                    ).toFixed(2)}
                  </td>
                  <td
                    className={`py-4 hidden sm:table-cell ${
                      item.price_change_percentage_24h_in_currency > 0
                        ? "text-green"
                        : "text-red"
                    }`}
                  >
                    {Number(
                      item.price_change_percentage_24h_in_currency
                    ).toFixed(2)}
                  </td>
                  <td
                    className={`py-4 hidden sm:table-cell ${
                      item.price_change_percentage_7d_in_currency > 0
                        ? "text-green"
                        : "text-red"
                    }`}
                  >
                    {Number(
                      item.price_change_percentage_7d_in_currency
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="min-h-[60vh] flex items-center justify-center">
            <h1 className="text-lg">there is no data to display.</h1>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Saved;
