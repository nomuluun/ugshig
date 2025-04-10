import { createContext, useContext, useState } from "react";

const LevelContext = createContext();

const LevelProvider = ({ children }) => {
  const [round, setRound] = useState(1);
  return (
    <LevelContext.Provider value={{ round, setRound }}>
      {children}
    </LevelContext.Provider>
  );
};
export default LevelProvider;
export const useLevelContext = () => useContext(LevelContext);
