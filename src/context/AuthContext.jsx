import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // console.log("Token:", token);

    if (token) {
      const storedUser = localStorage.getItem("user");

      // console.log("Stored User:", storedUser);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const { data } = await api.post(
      "/api/auth/login",
      credentials
    );

    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post(
      "/api/auth/register",
      payload
    );

    return data;
  };

  const verifyOtp = async (payload) => {
    const { data } = await api.post(
      "/api/auth/verify-otp",
      payload
    );

    return data;
  };
  const getProfile = async () => {
    const { data } = await api.get("/api/auth/me");
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        verifyOtp,
        logout,
        getProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};