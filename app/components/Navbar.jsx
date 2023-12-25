import Logo from "@/app/components/Logo";
import Dashboard from "@/app/components/buttons/Dashboard";
import SignIn from "@/app/components/buttons/SignIn";
import StarButton from "@/app/components/buttons/StarButton";
import Link from "next/link";
import SignOut from "@/app/components/buttons/SignOut";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const Navbar = async () => {
  const session = await getServerSession(options);

  return (
    <nav className="bg-secondary h-12 flex items-center px-4 justify-between absolute w-full border-b-[1px] border-utility">
      <Link href="/">
        <div className="flex gap-3 items-center">
          <Logo />
          <span className="font-semibold">SoundXLR</span>
        </div>
      </Link>
      <div className="flex gap-4 items-center">
        <StarButton />
        {session ? (
          <>
            <Dashboard />
            <SignOut />
          </>
        ) : (
          <SignIn />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
