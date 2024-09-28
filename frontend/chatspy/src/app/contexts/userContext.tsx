import { createContext, useEffect, useState } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";

export const userContext = createContext([]);

type userProviderProps = {
  children: React.ReactNode;
};

function userProvider({ children }: userProviderProps) {
  useEffect(() => {
    handleInitialLoad();
  }, []);
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return <userContext.Provider value={[]}>{children}</userContext.Provider>;

  async function handleInitialLoad() {
    try {
      const { preferred_username } = await fetchUserAttributes();

      // If user is authenticated
      if (preferred_username) {
        setIsAuthenticated(true);
        setUsername(preferred_username);
      }
    } catch (error) {}
  }
}
