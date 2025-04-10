// context/MyContext.js
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

const ScoreContext = createContext();

const ScoreProvider = ({ children }) => {
  const [onoo, setOnoo] = useState(0);
  const [resultQ, setResultQ] = useState([]);
  const [level, setLevel] = useState(0);
  const [percent, setpercent] = useState(0);
  const [category, setCategory] = useState(null);
  // const router = useRouter() huudas shiljuuleh
  // router.push("/")
  return (
    <ScoreContext.Provider
      value={{
        onoo,
        setOnoo,
        resultQ,
        setResultQ,
        level,
        setLevel,
        percent,
        setpercent,
        category,
        setCategory,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};
export default ScoreProvider;
export const useScoreContext = () => useContext(ScoreContext);
