import { useEffect, useState } from "react";
import { getUserByEmail } from "../queries/user";
export function useUserData(email) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const user = await getUserByEmail(email);
      setUserData(user);
      setLoading(false);
    };
    if (email) {
      fetchUserData();
      setRefetch(false);
    }
  }, [email, refetch]);

  return { userData, loading, setRefetch };
}
