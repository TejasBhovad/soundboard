"use client";
import { signOut } from "next-auth/react";
const SignOut = () => {
  return (
    <div
      className="text-white bg-background hover:bg-secondary cursor-pointer rounded-sm px-4 py-0.5 border-[1px] border-utility hover:border-primary transition-all"
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
    >
      Logout
    </div>
  );
};
export default SignOut;
