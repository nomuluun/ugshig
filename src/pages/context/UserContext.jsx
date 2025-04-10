const { createContext, useContext, useState, useEffect } = require("react");

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [testUser, setTestUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Safely access localStorage on the client side
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser); // Set the user from localStorage if it exists
      }
      setLoading(false);
    }
  }, []);
  return (
    <UserContext.Provider
      value={{ user, setUser, testUser, setTestUser, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
export const useUser = () => useContext(UserContext);
