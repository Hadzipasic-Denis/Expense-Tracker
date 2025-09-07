import { createContext, useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allUserTransactions, setAllUserTransactions] = useState(null);

  useEffect(() => {
    axiosClient
      .get("/user/getProfile")
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });

    axiosClient
      .get("/transaction/getAllUserTransactions")
      .then((response) => {
        setAllUserTransactions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error)
        setAllUserTransactions(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async (data) => {
    axiosClient
      .post("/user/login", data)
      .then((response) => {
        setUser(response.data);
        navigate("/dashboard");
        console.log("Login succesfull!");
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = async () => {
    axiosClient
      .post("/user/logout")
      .then((response) => {
        setUser(null);
        navigate("/");
      })
      .catch(() => {});
  };

  const createAccount = async (data) => {
    axiosClient
      .post("/user/register", data)
      .then((response) => {
        console.log("Registered!");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoading,
          user,
          allUserTransactions,
          login,
          logout,
          createAccount,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
