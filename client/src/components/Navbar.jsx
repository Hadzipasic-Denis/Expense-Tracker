import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthProvider";
import logo from "../assets/expenseTrackerLogo.jpg";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center md:hidden">
      <div>
        <img src={logo} alt="logo" width={58} />
      </div>

      <div className="text-center">
        <p>Expense</p>
        <p>Tracker</p>
      </div>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 text-gray-900 font-semibold focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
            {!user ? (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myEntries"
                    className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                  >
                    My Entries
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/savingsGoal"
                    className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                  >
                    Set a Goal
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/newEntry"
                    className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                  >
                    New Entry
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => logout()}
                    className="w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}
