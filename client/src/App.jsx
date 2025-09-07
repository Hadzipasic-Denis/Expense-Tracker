import { Routes, Route } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import SavingsGoal from "./components/SavingsGoal";
import Protected from "./components/utils/Protected";
import Entry from "./components/Entry";
import UserEntries from "./components/UserEntries";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/myEntries" element={<UserEntries />} />
          <Route path="/newEntry" element={<Entry />} />
          <Route path="/savingsGoal" element={<SavingsGoal />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
