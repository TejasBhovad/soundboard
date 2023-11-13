import Link from "next/link";
import "app/styles/Navbar.css";

const Dashboard = () => {
  return (
    <button className="dashboard-btn">
      {/* bg-gradient-to-b from-[#211D28] to-[#361F5F] px-3 py-0.5 rounded-sm border border-accent border-1 transition-all duration-700 ease-in-out hover:bg-gradient-to-b hover:from-accent hover:to-accent" */}
      <span>Dashboard</span>
    </button>
  );
};

export default Dashboard;
