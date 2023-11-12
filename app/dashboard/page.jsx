"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const recentBoardID = "sound_1";
  const router = useRouter();

  useEffect(() => {
    if (!recentBoardID) return;
    router.push(`/dashboard/${recentBoardID}`);
  }, []);

  return (
    <div className="w-full h-full py-2 px-4">
      <h1>No soundboards created yet</h1>
      {/* improve this page */}
    </div>
  );
}

export default Page;
