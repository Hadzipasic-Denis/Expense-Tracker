import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../utils/axiosClient";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userTransactions, setUserTransactions] = useState(null);
  const [allUserTransactions, setAllUserTransactions] = useState(null);
  const [userAnnualTransactions, setUserAnnualTransactions] = useState(null);
  const [userGoals, setUserGoals] = useState(null);
  const [userFilteredGoals, setUserFiltererdGoals] = useState(null);
  const [userAnnualGoals, setAnnualGoals] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("en-US", { month: "long" }).toLowerCase()
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonthEntries, setSelectedMonthEntries] = useState("");
  const [selectedYearEntries, setSelectedYearEntries] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFixedExpense, setSelectedFixedExpense] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/api//user/getProfile")
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });

    axiosClient
      .get("/api//transaction/getAllUserTransactions", {
        params: {
          category: selectedCategory || undefined,
          type: selectedType || undefined,
          fixedExpense: selectedFixedExpense || undefined,
          month: selectedMonthEntries || undefined,
          year: selectedYearEntries || undefined,
        },
      })
      .then((response) => {
        setAllUserTransactions(response.data);
      })
      .catch(() => {
        setAllUserTransactions(null);
      })
      .finally(() => {
        setIsLoading(false);
      });

    axiosClient
      .get("/api//transaction/getUserTransactions", {
        params: { month: selectedMonth, year: selectedYear },
      })
      .then((response) => {
        setUserTransactions(response.data);
      })
      .catch(() => {
        setUserTransactions(null);
      })
      .finally(() => {
        setIsLoading(false);
      });

    axiosClient
      .get("/api//transaction/getAnnualUserTransactions", {
        params: { year: selectedYear },
      })
      .then((response) => {
        setUserAnnualTransactions(response.data);
      })
      .catch(() => {
        setUserAnnualTransactions(null);
      })
      .finally(() => {
        setIsLoading(false);
      });

    axiosClient
      .get("/api//goal/getUserGoals")
      .then((response) => {
        setUserGoals(response.data);
      })
      .catch(() => {
        setUserGoals(null);
      })
      .finally(() => {
        setIsLoading(false);
      });

    axiosClient
      .get("/api//goal/getUserFilteredGoals", {
        params: { month: selectedMonth, year: selectedYear },
      })
      .then((response) => {
        setUserFiltererdGoals(response.data);
      })
      .catch(() => {
        setUserFiltererdGoals(null);
      })
      .finally(() => {
        setIsLoading(false);
      });

    axiosClient
      .get("/api//goal/getAnnualUserGoals", {
        params: { year: selectedYear },
      })
      .then((response) => {
        setAnnualGoals(response.data);
      })
      .catch(() => {
        setAnnualGoals(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    selectedMonth,
    selectedYear,
    selectedType,
    selectedCategory,
    selectedFixedExpense,
    selectedYearEntries,
    selectedMonthEntries,
  ]);

  const login = async (data) => {
    axiosClient
      .post("/api//user/login", data)
      .then((response) => {
        setUser(response.data);

        return axiosClient.get("/api//transaction/getAllUserTransactions", {
          params: {
            category: selectedCategory || undefined,
            type: selectedType || undefined,
            fixedExpense: selectedFixedExpense || undefined,
            month: selectedMonthEntries || undefined,
            year: selectedYearEntries || undefined,
          },
        });
      })
      .then((response) => {
        setAllUserTransactions(response.data);
        return axiosClient.get("/api//transaction/getUserTransactions", {
          params: { month: selectedMonth, year: selectedYear },
        });
      })
      .then((response) => {
        setUserTransactions(response.data);
        return axiosClient.get("/api//transaction/getAnnualUserTransactions", {
          params: { year: selectedYear },
        });
      })
      .then((response) => {
        setUserAnnualTransactions(response.data);
        return axiosClient.get("/api//goal/getUserGoals");
      })
      .then((response) => {
        setUserGoals(response.data);
        return axiosClient.get("/api//goal/getUserFilteredGoals", {
          params: { month: selectedMonth, year: selectedYear },
        });
      })
      .then((response) => {
        setUserFiltererdGoals(response.data);
        return axiosClient.get("/api//goal/getAnnualUserGoals", {
          params: { year: selectedYear },
        });
      })
      .then((response) => {
        setAnnualGoals(response.data);
        navigate("/dashboard");
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
      .post("/api//user/logout")
      .then((response) => {
        setUser(null);
        navigate("/");
      })
      .catch(() => {});
  };

  const createAccount = async (data) => {
    axiosClient
      .post("/api//user/register", data)
      .then((response) => {
        toast.success("Account successfuly created!");
        navigate("/");
      })
      .catch(() => {
        if (error.status === 409) {
          toast.error("That User ID is already taken!");
        } else {
          toast.error("Incorrect User ID or password!");
        }
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
          userTransactions,
          allUserTransactions,
          userGoals,
          selectedMonth,
          selectedYear,
          userAnnualTransactions,
          userAnnualGoals,
          userFilteredGoals,
          selectedMonthEntries,
          selectedYearEntries,
          login,
          logout,
          createAccount,
          setSelectedMonth,
          setSelectedYear,
          setUserAnnualTransactions,
          setUserTransactions,
          setUserFiltererdGoals,
          setAnnualGoals,
          setUserGoals,
          setAllUserTransactions,
          setSelectedCategory,
          setSelectedFixedExpense,
          setSelectedType,
          setSelectedMonthEntries,
          setSelectedYearEntries,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
