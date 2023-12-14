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

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!firstRecentBoard) return;
    // router.push(`/dashboard/${firstRecentBoard}`);
  }, [firstRecentBoard]);
  return (
    <div className="w-full h-full py-2 px-4">
      <h1>No soundboards created yet</h1>

      {/* improve this page */}
      {status == "authenticated" ? (
        <h1>
          Authenticated: {session.user.email} <br />
          Recent Board: {firstRecentBoard}
          <br />
          {JSON.stringify(userData)}
        </h1>
      ) : (
        <h1>Not Authenticated</h1>
      )}
    </div>
  );
}

export default Page;
