import { createContext, useLayoutEffect, useState } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [coinsSearch, setCoinsSearch] = useState();
  const [coinSelected, setCoinSelected] = useState("");

  const [currency, setCurrency] = useState("usd");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [perPage, setPerPage] = useState(10);

  const [coinDetails, setCoinDetails] = useState();

  const getCryptoData = async () => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
        .then((res) => res.json())
        .then((data) => data);

      setTotalPage(data.length);
    } catch (error) {
      console.error(error);
    }

    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSelected}&order=${order}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
        .then((res) => res.json())
        .then((data) => data);

      setCryptoData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetCtyptoFun = () => {
    setPage(1);
    setCoinSelected("");
  };

  const getCoinDetails = async (coinId) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
      )
        .then((res) => res.json())
        .then((data) => data);

      setCoinDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCoinsSearch = async (value) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${value}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setCoinsSearch(data.coins);
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSelected, currency, order, page, perPage]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        getCoinsSearch,
        coinsSearch,
        setCoinSelected,
        setCurrency,
        currency,
        setOrder,
        order,
        page,
        setPage,
        totalPage,
        setPerPage,
        perPage,
        resetCtyptoFun,
        getCoinDetails,
        coinDetails,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
