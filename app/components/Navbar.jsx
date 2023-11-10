import Logo from "@/app/components/Logo";
import Dashboard from "@/app/components/buttons/Dashboard";
import StarButton from "@/app/components/buttons/StarButton";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-secondary h-12 flex items-center px-4 justify-between absolute w-full">
      <Link href="/">
        <div className="flex gap-3 items-center">
          <Logo />
          <span className="font-semibold">App Name</span>
        </div>
      </Link>
      <div className="flex gap-4 items-center">
        <StarButton />
        <Dashboard />
      </div>
    </nav>
  );
};

export default Navbar;
