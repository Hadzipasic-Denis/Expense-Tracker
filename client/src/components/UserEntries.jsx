import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthProvider";
import UserEntryCard from "./UserEntryCard";
import Sidebar from "./Sidebar";

export default function UserEntries() {
  const {
    allUserTransactions,
  } = useContext(AuthContext);

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-[100vh] max-h-[100vh] py-4 w-full bg-gray-50 overflow-y-auto">

        {allUserTransactions?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full w-full text-center py-20">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 4a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              There are no transactions currently available.
            </h2>
            <p className="text-gray-500">
              You either had no entries yet or your filters are not returning
              any results.
            </p>
          </div>
        ) : (
          allUserTransactions?.map((transaction) => (
            <UserEntryCard key={transaction._id} transaction={transaction} />
          ))
        )}
      </div>
    </div>
  );
}
