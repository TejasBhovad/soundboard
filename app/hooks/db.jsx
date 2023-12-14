import { useEffect, useState } from "react";
import { getUserByEmail } from "../queries/user";
export function useUserData(email) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (email) {
        setLoading(true);
        const user = await getUserByEmail(email);
        setUserData(user);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [email]);

  return { userData, loading };
}
