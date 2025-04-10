import { createContext, useState, useContext } from "react";

const TailbarLevelContext = createContext();

export function useTailbarLevelContext() {
  return useContext(TailbarLevelContext);
}

const TailbarLevelProvider = ({ children }) => {
  const [tailbarround, setTailbarRound] = useState(1);

  return (
    <TailbarLevelContext.Provider value={{ tailbarround, setTailbarRound }}>
      {children}
    </TailbarLevelContext.Provider>
  );
};

export default TailbarLevelProvider;
