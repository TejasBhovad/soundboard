"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserData } from "@/app/hooks/db";
function Page() {
  const { data: session, status } = useSession();
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    if (status === "authenticated") {
      setUserEmail(session.user.email);
      console.log(session.user.email);
    }
  }, [status]);
  const { userData, loading } = useUserData(userEmail);
  const firstRecentBoard = userData?.recent_boards?.[0];

  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!firstRecentBoard) return;
    router.push(`/dashboard/${firstRecentBoard}`);
  }, [firstRecentBoard]);
  return (
    <div className="w-full h-full py-4 px-4">
      <span className="text-accent text-lg font-medium px-1 gradient-text ">
        No Soundboards Found
      </span>

      {/* improve this page */}
      {/* {status == "authenticated" ? (
        <h1>
          Authenticated: {session.user.email} <br />
          Recent Board: {firstRecentBoard}
          <br />
        </h1>
      ) : (
        <h1>Not Authenticated</h1>
      )} */}
    </div>
  );
}

export default Page;
