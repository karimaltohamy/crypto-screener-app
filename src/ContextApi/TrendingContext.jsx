import React, { createContext, useLayoutEffect, useState } from "react";

export const TrendingContext = createContext({});

export const TrendingProvider = ({ children }) => {
  const [trendingData, setTrendingData] = useState();

  const getTrendingData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search/trending`
      )
        .then((res) => res.json())
        .then((data) => data);

      setTrendingData(data.coins);
    } catch (error) {
      console.error(error);
    }
  };

  const resetTrendingCoins = () => {
    getTrendingData();
  };

  useLayoutEffect(() => {
    getTrendingData();
  }, []);

  return (
    <TrendingContext.Provider value={{ trendingData, resetTrendingCoins }}>
      {children}
    </TrendingContext.Provider>
  );
};
