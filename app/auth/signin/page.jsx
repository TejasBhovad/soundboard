"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import "app/styles/Navbar.css";
import Github from "@/app/components/logos/Github";
import Google from "@/app/components/logos/Google";
import "../../styles/Utils.css";

import { options } from "app/api/auth/[...nextauth]/options";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-108 flex justify-center px-10 py-20 bg-secondary rounded-md">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <span className="text-accent text-4xl px-1 gradient-text ">
              Let's Get Started
            </span>
            <span className="text-utility text-gray-300 font-normal text-sm px-1.5">
              Sign in to create and share soundboards for free.
            </span>
          </div>
          <div className="text-text py-4 gap-6 flex-col flex items-center">
            {/* map through the auth providers from options */}
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
                  {/* add logo  */}
                  {provider.name === "GitHub" ? <Github /> : <Google />}
                  {/* add text */}
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
