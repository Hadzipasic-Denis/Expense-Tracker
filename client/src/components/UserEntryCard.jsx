import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "./utils/axiosClient";

export default function UserEntryCard({ transaction }) {
  const {
    selectedMonth,
    selectedYear,
    setUserTransactions,
    setUserAnnualTransactions,
    setAllUserTransactions,
    selectedCategory,
    selectedType,
    selectedFixedExpense,
    selectedMonthEntries,
    selectedYearEntries
  } = useContext(AuthContext);

  const deleteEntry = () => {
    axiosClient
      .delete(`/transaction/deleteTransaction/${transaction._id}`)
      .then(() => {
        return axiosClient.get("/transaction/getUserTransactions", {
          params: { month: selectedMonth, year: selectedYear },
        });
      })
      .then((response) => {
        setUserTransactions(response.data);
        return axiosClient.get("/transaction/getAnnualUserTransactions", {
          params: { year: selectedYear },
        });
      })
      .then((response) => {
        setUserAnnualTransactions(response.data);
        return axiosClient.get("/transaction/getAllUserTransactions", {
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
        toast.success("Entry deleted!");
      })
      .catch((error) => {
        console.log(error)
        toast.error("Error! Something went wrong!")
      });
  };

  return (
    <div className="w-[95%] mx-auto mb-4 bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition  md:w-[80%]">
      <div className="grid grid-cols-3 items-start">
        <div>
          <h2 className="text-md font-semibold text-gray-900 md:text-2xl">
            {transaction.description}
          </h2>
          <p className="text-sm text-gray-500 md:text-lg">{transaction.category}</p>
        </div>

        <div className="text-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              transaction.type === "expense"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {transaction.type}
          </span>

          {transaction.type === "expense" && (
            <p className="mt-2 text-sm text-gray-500 md:text-md">
              {transaction.fixedExpense === "yes"
                ? "Fixed expense"
                : "Non fixed expense"}
            </p>
          )}

          <p className="mt-1 text-sm text-gray-400">
            {transaction.month.charAt(0).toUpperCase() +
              transaction.month.slice(1)}{" "}
            {transaction.year}
          </p>
        </div>

        <div className="text-right flex flex-col items-end space-y-2">
          <p
            className={`text-lg font-bold ${
              transaction.type === "expense" ? "text-red-600" : "text-green-600"
            }`}
          >
            € {transaction.amount}
          </p>

          <div className="flex items-center space-x-3">
            <button
              className="hover:text-red-500 transition"
              onClick={() => document.getElementById("deleteNotification").showModal()}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M7 3h2a1 1 0 0 0-2 0M6 3a2 2 0 1 1 4 0h4a.5.5 0 0 1 0 1h-.564l-1.205 8.838A2.5 2.5 0 0 1 9.754 15H6.246a2.5 2.5 0 0 1-2.477-2.162L2.564 4H2a.5.5 0 0 1 0-1zm1 3.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0zM9.5 6a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5m-4.74 6.703A1.5 1.5 0 0 0 6.246 14h3.508a1.5 1.5 0 0 0 1.487-1.297L12.427 4H3.573z"
                ></path>
              </svg>
            </button>

            <NavLink
              to={`/myEntries/${transaction._id}`}
              className="hover:text-blue-500 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 2048 2048"
              >
                <path
                  fill="currentColor"
                  d="M2048 335q0 66-25 128t-73 110L633 1890L0 2048l158-633L1475 98q48-48 110-73t128-25q69 0 130 26t106 72t72 107t27 130M326 1428q106 35 182 111t112 183L1701 640l-293-293zm-150 444l329-82q-10-46-32-87t-55-73t-73-54t-87-33zM1792 549q25-25 48-47t41-46t28-53t11-67q0-43-16-80t-45-66t-66-45t-81-17q-38 0-66 10t-53 29t-47 41t-47 48z"
                />
              </svg>
            </NavLink>
          </div>
        </div>
      </div>

      {transaction.additionalInformation && (
        <div className="mt-3 border-t border-gray-200 pt-2">
          <p className="text-md text-gray-600 italic">
            {transaction.additionalInformation}
          </p>
        </div>
      )}
      <dialog id="deleteNotification" className="modal">
        <div className="modal-box">
          <div className="modal-action">
            <form method="dialog">
              <div className="bg-white">
                <div className="mx-auto max-w-7xl">
                  <div className="space-y-0">
                    <div className="mx-auto w-full max-w-4xl">
                      <div className="rounded-lg bg-red-50 p-4 ring-1 ring-inset ring-red-200">
                        <div className="flex items-start gap-x-4">
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-red-700">
                              Warning!
                            </h3>
                            <div className="mt-1">
                              <p className="text-sm text-red-600">
                                You are about to delete this entry. After
                                confirmation, this action cannot be undone!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="btn bg-red-500 text-white tracking-wider hover:bg-red-700 transition"
                  onClick={() => deleteEntry()}
                >
                  Delete
                </button>
                <button className="btn">Close</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
