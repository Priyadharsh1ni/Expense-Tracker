import { createContext, useContext, useState } from "react";
import { service } from "../redux/service";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await service.login({ email, password });
        localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.data.user);
    } catch (error) {
      setError(error.response);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "/login"; 
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

