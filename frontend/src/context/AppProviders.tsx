import React, { FC } from 'react';
import { AuthProvider } from './AuthContext';

const AppProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
export default AppProviders;
