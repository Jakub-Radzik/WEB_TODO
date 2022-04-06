import React, { FC } from "react";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";

const AppProviders: FC<{ children: React.ReactNode }> = ({ children }) =>{
    return (
        <AuthProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </AuthProvider>
    );
  }
  export default AppProviders;