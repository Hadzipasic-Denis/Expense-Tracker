import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-[100vh] w-full bg-gray-50 p-2"></div>
    </div>
  );
}
