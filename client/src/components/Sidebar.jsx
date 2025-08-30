import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="hidden md:flex flex-col pt-5 w-[250px]">
      {!user ? (
        <ul className="space-y-2 pb-2 w-[90%] mx-auto">
          <li>
            <NavLink
              to={"/register"}
              className="w-full text-[14px] text-gray-900 font-semibold rounded-lg hover:bg-gray-100 flex justify-start p-2 group"
            >
              <span className="w-6 h-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  className="fill-gray-500 group-hover:fill-slate-950 transition-colors duration-200"
                >
                  <path
                    fill="currentColor"
                    d="M15 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 1.9a2.1 2.1 0 1 1 0 4.2A2.1 2.1 0 0 1 12.9 8A2.1 2.1 0 0 1 15 5.9M4 7v3H1v2h3v3h2v-3h3v-2H6V7zm11 6c-2.67 0-8 1.33-8 4v3h16v-3c0-2.67-5.33-4-8-4m0 1.9c2.97 0 6.1 1.46 6.1 2.1v1.1H8.9V17c0-.64 3.1-2.1 6.1-2.1"
                  ></path>
                </svg>
              </span>
              <span className="ml-3 whitespace-nowrap">Register</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/"}
              className="w-full text-[14px] text-gray-900 font-semibold rounded-lg hover:bg-gray-100 flex justify-start p-2 group"
            >
              <span className="w-6 h-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-gray-500 group-hover:fill-slate-950 transition-colors duration-200"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9m6-9l-4-4m4 4l-4 4m4-4H5"
                  />
                </svg>
              </span>
              <span className="ml-3 whitespace-nowrap">Login</span>
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="space-y-2 pb-2 w-[90%] mx-auto">
          <li>
            <NavLink
              to={"/dashboard"}
              className="w-full text-[14px] text-gray-900 font-semibold rounded-lg hover:bg-gray-100 flex justify-start p-2 group"
            >
              <span className="w-6 h-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-gray-500 group-hover:fill-slate-950 transition-colors duration-200"
                >
                  <path
                    fill="currentColor"
                    d="m6 16.5l-3 2.94V11h3m5 3.66l-1.57-1.34L8 14.64V7h3m5 6l-3 3V3h3m2.81 9.81L17 11h5v5l-1.79-1.79L13 21.36l-3.47-3.02L5.75 22H3l6.47-6.34L13 18.64"
                  />
                </svg>
              </span>
              <span className="ml-3 whitespace-nowrap">Dashboard</span>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}
