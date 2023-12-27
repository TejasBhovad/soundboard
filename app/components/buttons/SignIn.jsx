"use client";
import "app/styles/Navbar.css";
import "../../styles/Utils.css";

import { signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { options } from "app/api/auth/[...nextauth]/options";
import Github from "@/app/components/logos/Github";
import Google from "@/app/components/logos/Google";

const Dashboard = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="sign-btn">
          <span>Sign in</span>
        </div>
      </DialogTrigger>
      <DialogContent className="w-96 flex justify-center px-10 py-16">
        <div className="flex flex-col gap-2">
          <DialogTitle className="flex flex-col gap-2">
            <span className="text-accent text-4xl px-1 gradient-text">
              Let's Get Started
            </span>
            <span className="text-utility text-gray-300 font-normal text-sm px-1.5">
              Sign in to create and share soundboards for free.
            </span>
          </DialogTitle>
          <div className="text-text py-4 gap-6 flex-col flex items-center">
            {Object.values(options.providers).map((provider) => (
              <div key={provider.id} className="w-full">
                <button
                  className="text-lg px-4 py-2 bg-secondary border-[1px] border-utility flex gap-4 font-medium w-full rounded-sm hover:bg-accent transition-all justify-center items-center"
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: "/dashboard",
                    })
                  }
                >
                  {provider.name === "GitHub" ? <Github /> : <Google />}
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Dashboard;
