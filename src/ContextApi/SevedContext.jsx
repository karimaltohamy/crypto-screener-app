import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { CryptoContext } from "./CryptoContext";

export const SevedContext = createContext({});

export const SevedProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [coinsSaved, setCoinsSaved] = useState();

  const { currency, order } = useContext(CryptoContext);

  const savedCoin = (coinId) => {
    const oldCoins = JSON.parse(localStorage.getItem("coins"));

    if (oldCoins.includes(coinId)) {
      return null;
    } else {
      const newCoins = [...oldCoins, coinId];
      setAllCoins(newCoins);
      localStorage.setItem("coins", JSON.stringify(newCoins));
    }
  };

  const removeIcoin = (coinId) => {
    const oldCoins = JSON.parse(localStorage.getItem("coins"));

    const filtercoins = oldCoins.filter((item) => item !== coinId);
    setAllCoins(filtercoins);
    localStorage.setItem("coins", JSON.stringify(filtercoins));
  };

  const getCoinsSaved = async (savedCoins = allCoins) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${savedCoins.join(
          ","
        )}&order=${order}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
        .then((res) => res.json())
        .then((data) => data);
      setCoinsSaved(data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetSavedCoins = () => {
    getCoinsSaved();
  };

  useLayoutEffect(() => {
    const isThere = JSON.parse(localStorage.getItem("coins")) || false;

    if (!isThere) {
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      const oldCoins = JSON.parse(localStorage.getItem("coins"));
      setAllCoins(oldCoins);

      if (oldCoins.length > 0) {
        getCoinsSaved(oldCoins);
      }
    }
  }, []);

  useEffect(() => {
    if (allCoins.length > 0) {
      getCoinsSaved(allCoins);
    } else {
      setCoinsSaved();
    }
  }, [allCoins]);

  return (
    <SevedContext.Provider
      value={{
        savedCoin,
        allCoins,
        setAllCoins,
        removeIcoin,
        coinsSaved,
        resetSavedCoins,
      }}
    >
      {children}
    </SevedContext.Provider>
  );
};
