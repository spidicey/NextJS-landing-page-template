// context/AuthContext.tsx
"use client"
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    Cookies.get("token-client") || null,
  );

  useEffect(() => {
    // Watch for cookie changes and update token when it changes
    const handleCookieChange = () => {
      const newToken = Cookies.get("token-client");
      setToken(newToken || null);
    };

    // Listen for cookies change
    window.addEventListener("storage", handleCookieChange);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("storage", handleCookieChange);
    };
  }, []);

  const updateToken = (newToken: string | null) => {
    if (newToken) {
      Cookies.set("token-client", newToken, { expires: 7 });
    } else {
      Cookies.remove("token-client");
    }
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

 export  const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
