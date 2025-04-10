const { createContext, useState, useContext } = require("react");

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "12s0305",
    name: "Nomu-Luun",
    class: 12,
    buleg: "b",
    score: 0,
    streak: 0,
    task: [
      {
        id: "juramUg",
        name: "Журамласан үг",
        lvl1: false,
        lvl2: false,
        lvl3: false,
      },
      {
        id: "aldaaUg",
        name: "Алдаатай үг",
        lvl1: false,
        lvl2: false,
        lvl3: false,
      },
      {
        id: "ugHargalzuulah",
        name: "Үгийг тайлбартай харгалзуулах",
        lvl1: false,
        lvl2: false,
        lvl3: false,
      },
      {
        id: "heltsUg",
        name: "Хэлц үгс",
        lvl1: false,
        lvl2: false,
        lvl3: false,
      },
      {
        id: "zuvUg",
        name: "Зөв үгийг олоорой",
        lvl1: false,
        lvl2: false,
        lvl3: false,
      },
      {
        id: "duremNuhuh",
        name: "Дүрмийг нөхөж бич",
        lvl1: false,
        lvl2: false,
        lvl3: false,
      },
    ],
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
export const useUser = () => useContext(UserContext);
