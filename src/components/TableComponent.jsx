import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
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

const TableComponent = () => {
  const { currency, cryptoData } = useContext(CryptoContext);
  const navigate = useNavigate();

  const goCoinDetails = (id) => {
    navigate(id);
  };

  return (
    <div className="w-[80%] border border-gray-100 rounded mt-[3rem] flex  justify-center">
      {cryptoData ? (
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
            {cryptoData.map((item) => (
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
                  {Number(item.price_change_percentage_1h_in_currency).toFixed(
                    2
                  )}
                </td>
                <td
                  className={`py-4 hidden sm:table-cell ${
                    item.price_change_percentage_24h_in_currency > 0
                      ? "text-green"
                      : "text-red"
                  }`}
                >
                  {Number(item.price_change_percentage_24h_in_currency).toFixed(
                    2
                  )}
                </td>
                <td
                  className={`py-4 hidden sm:table-cell ${
                    item.price_change_percentage_7d_in_currency > 0
                      ? "text-green"
                      : "text-red"
                  }`}
                >
                  {Number(item.price_change_percentage_7d_in_currency).toFixed(
                    2
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center gap-3">
          <div className="  w-[40px] h-[40px] border-4 rounded-full  border-cyan border-t-transparent animate-spin "></div>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
