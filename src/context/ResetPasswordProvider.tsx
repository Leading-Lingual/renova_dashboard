import { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from "react";

interface ResetPasswordContextProps {
  token: string|null;
  setToken:Dispatch<SetStateAction<string|null>>;
}

export function useResetPassword(): ResetPasswordContextProps {
  const context = useContext(ResetPasswordContext);
  if (!context) {
    throw new Error("useResetPassword must be used within a ResetPasswordProvider");
  }
  return { ...context };
}

const ResetPasswordContext = createContext<ResetPasswordContextProps | null>(null);

export const ResetPasswordProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<null|string>(null);

  return (
    <ResetPasswordContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </ResetPasswordContext.Provider>
  );
};
