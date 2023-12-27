import "app/styles/Navbar.css";
import Link from "next/link";

const Dashboard = () => {
  return (
    <Link href="/dashboard">
      <button className="dashboard-btn">
        <span>Dashboard</span>
      </button>
    </Link>
  );
};

export default Dashboard;
