import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);

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
          <li>
            <NavLink
              to={"/savingsGoal"}
              className="w-full text-[14px] text-gray-900 font-semibold rounded-lg hover:bg-gray-100 flex justify-start p-2 group"
            >
              <span className="w-6 h-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="fill-gray-500 group-hover:fill-slate-950 transition-colors duration-200"
                  height="24"
                >
                  <path d="M400 96l0 .7c-5.3-.4-10.6-.7-16-.7L256 96c-16.5 0-32.5 2.1-47.8 6c-.1-2-.2-4-.2-6c0-53 43-96 96-96s96 43 96 96zm-16 32c3.5 0 7 .1 10.4 .3c4.2 .3 8.4 .7 12.6 1.3C424.6 109.1 450.8 96 480 96l11.5 0c10.4 0 18 9.8 15.5 19.9l-13.8 55.2c15.8 14.8 28.7 32.8 37.5 52.9l13.3 0c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32l-32 0c-9.1 12.1-19.9 22.9-32 32l0 64c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32-128 0 0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-64c-34.9-26.2-58.7-66.3-63.2-112L68 304c-37.6 0-68-30.4-68-68s30.4-68 68-68l4 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-4 0c-11 0-20 9-20 20s9 20 20 20l31.2 0c12.1-59.8 57.7-107.5 116.3-122.8c12.9-3.4 26.5-5.2 40.5-5.2l128 0zm64 136a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z" />
                </svg>
              </span>
              <span className="ml-3 whitespace-nowrap">Set a goal</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/newEntry"}
              className="w-full text-[14px] text-gray-900 font-semibold rounded-lg hover:bg-gray-100 flex justify-start p-2 group"
            >
              <span className="w-6 h-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  height="24"
                  className="fill-gray-500 group-hover:fill-slate-950 transition-colors duration-200"
                >
                  <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
                </svg>
              </span>
              <span className="ml-3 whitespace-nowrap">New Entry</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => logout()}
              className="w-full text-[14px] text-gray-900 font-semibold rounded-lg hover:bg-gray-100 flex justify-start p-2 group"
            >
              <span className="w-6 h-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  height="24"
                  className="fill-gray-500 group-hover:fill-slate-950 transition-colors duration-200"
                >
                  <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 224c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" />
                </svg>
              </span>
              <span className="ml-3 whitespace-nowrap">Logout</span>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}
