import React, { createContext, ReactNode, useContext, useState } from "react";

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginContext = createContext<LoginContextType | null>(null);

const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

const useLoginContext = (): LoginContextType => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
};

export { LoginProvider, useLoginContext };
