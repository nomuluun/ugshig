import { createContext, useState, useContext } from "react";

const KheltsLevelContext = createContext();

export function useKheltsLevelContext() {
  return useContext(KheltsLevelContext);
}

const KheltsLevelProvider = ({ children }) => {
  const [kheltsround, setKheltsRound] = useState(1);

  return (
    <KheltsLevelContext.Provider value={{ kheltsround, setKheltsRound }}>
      {children}
    </KheltsLevelContext.Provider>
  );
};
export default KheltsLevelProvider;
