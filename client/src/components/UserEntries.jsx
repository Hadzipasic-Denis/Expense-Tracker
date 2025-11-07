import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthProvider";
import UserEntryCard from "./UserEntryCard";
import Sidebar from "./Sidebar";

export default function UserEntries() {
  const {
    allUserTransactions,
    setSelectedCategory,
    setSelectedType,
    setSelectedFixedExpense,
    setSelectedMonthEntries,
    setSelectedYearEntries,
  } = useContext(AuthContext);

  const [localType, setLocalType] = useState("");
  const [localCategory, setLocalCategory] = useState("");
  const [localFixedExpense, setLocalFixedExpense] = useState("");
  const [localMonth, setLocalMonth] = useState("");
  const [localYear, setLocalYear] = useState("");

  const handleTypeChange = (value) => {
    setLocalType(value);
    setSelectedType(value);

    if (value === "income") {
      setSelectedFixedExpense("no");
    } else if (value === "expense") {
      setSelectedFixedExpense("");
    }
  };

  const handleResetFilters = () => {
    setLocalType("");
    setLocalCategory("");
    setLocalFixedExpense("");
    setLocalMonth("");
    setLocalYear("");

    setSelectedType("");
    setSelectedCategory("");
    setSelectedFixedExpense("");
    setSelectedMonthEntries("");
    setSelectedYearEntries("");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-[100vh] max-h-[100vh] py-4 w-full bg-gray-50 overflow-y-auto">
        <div className="flex flex-wrap gap-4 items-center bg-white shadow-md p-4 rounded-lg mx-4 mb-4 sticky top-0 z-10">
          <select
            className="border rounded-md p-2 text-gray-700"
            onChange={(e) => {
              setLocalCategory(e.target.value);
              setSelectedCategory(e.target.value);
            }}
            value={localCategory}
          >
            <option value="">All Categories</option>
            <option value="Online shopping">Online shopping</option>
            <option value="Shopping">Shopping</option>
            <option value="Groceries">Groceries</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Car Maintenance">Car Maintenance</option>
            <option value="Dining / Restaurants">Dining / Restaurants</option>
            <option value="Fuel">Fuel</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Subscriptions">Subscriptions</option>
            <option value="Loan">Loan</option>
            <option value="Field trip / Vacation">Field trip / Vacation</option>
            <option value="Salary">Salary</option>
            <option value="Child benefit">Child benefit</option>
            <option value="Tips">Tips</option>
            <option value="Extra job">Extra job</option>
            <option value="Gift / Voucher">Gift / Voucher</option>
          </select>

          <select
            className="border rounded-md p-2 text-gray-700"
            onChange={(e) => handleTypeChange(e.target.value)}
            value={localType}
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {localType === "expense" && (
            <select
              className="border rounded-md p-2 text-gray-700"
              onChange={(e) => {
                setLocalFixedExpense(e.target.value);
                setSelectedFixedExpense(e.target.value);
              }}
              value={localFixedExpense}
            >
              <option value="">Fixed & Non Fixed</option>
              <option value="no">Non Fixed Expenses</option>
              <option value="yes">Fixed Expenses</option>
            </select>
          )}

          <select
            className="border rounded-md p-2 text-gray-700"
            onChange={(e) => {
              setLocalMonth(e.target.value);
              setSelectedMonthEntries(e.target.value);
            }}
            value={localMonth}
          >
            <option value="">All Months</option>
            {[
              "january",
              "february",
              "march",
              "april",
              "may",
              "june",
              "july",
              "august",
              "september",
              "october",
              "november",
              "december",
            ].map((month) => (
              <option key={month} value={month}>
                {month.charAt(0).toUpperCase() + month.slice(1)}
              </option>
            ))}
          </select>

          <select
            className="border rounded-md p-2 text-gray-700"
            onChange={(e) => {
              setLocalYear(e.target.value);
              setSelectedYearEntries(Number(e.target.value));
            }}
            value={localYear}
          >
            <option value="">All Years</option>
            {[2025, 2026, 2027].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 21 21"
            onClick={handleResetFilters}
            className="text-blue-500 transform transition-transform duration-300 hover:scale-125 hover:cursor-pointer hover:text-emerald-700"
          >
            <g
              fill="none"
              fillRule="evenodd"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            >
              <path d="M3.578 6.487A8 8 0 1 1 2.5 10.5"></path>
              <path d="M7.5 6.5h-4v-4"></path>
            </g>
          </svg>
        </div>

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
