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
    }
  }, [status]);

  const { userData, loading } = useUserData(userEmail);
  const firstRecentBoard = userData?.recent_boards?.[0];

  const router = useRouter();

  useEffect(() => {
    if (!firstRecentBoard) return;
    router.push(`/dashboard/${firstRecentBoard}`);
  }, [firstRecentBoard]);

  return (
    <div className="w-full h-full py-4 px-4">
      <span className="text-accent text-lg font-medium px-1 gradient-text ">
        No Soundboards Found
      </span>
    </div>
  );
}

export default Page;
