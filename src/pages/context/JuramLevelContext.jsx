import { createContext, useState, useContext } from "react";

const JuramLevelContext = createContext();

export function useJuramLevelContext() {
  return useContext(JuramLevelContext);
}

const JuramLevelProvider = ({ children }) => {
  const [juramround, setJuramRound] = useState(1);

  return (
    <JuramLevelContext.Provider value={{ juramround, setJuramRound }}>
      {children}
    </JuramLevelContext.Provider>
  );
};
export default JuramLevelProvider;
