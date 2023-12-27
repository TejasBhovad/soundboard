import "app/styles/Navbar.css";
import Link from "next/link";
import Star from "app/components/logos/Star";

const Dashboard = () => {
  return (
    <Link href="https://github.com/TejasBhovad/soundboard">
      <button className="star-btn">
        <div className="flex items-center gap-2">
          <Star />
          <span className="text">Star on Github</span>
        </div>
      </button>
    </Link>
  );
};

export default Dashboard;
