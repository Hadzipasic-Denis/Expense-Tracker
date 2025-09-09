import { Routes, Route } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Entry from "./components/Entry";
import SavingsGoal from "./components/SavingsGoal";
import Register from "./components/Register";
import Protected from "./components/utils/Protected";
import UserEntries from "./components/UserEntries";
import EditEntry from "./components/EditEntry";
import Navbar from "./components/Navbar";

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

      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/myEntries" element={<UserEntries />} />
          <Route path="/savingsGoal" element={<SavingsGoal />} />
          <Route path="/newEntry" element={<Entry />} />
          <Route path="/myEntries/:id" element={<EditEntry />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
