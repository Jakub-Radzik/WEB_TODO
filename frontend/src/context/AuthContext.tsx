import React, { FC } from 'react';

type AuthStatus = 'initialising' | 'authenticated' | 'unauthenticated';

type AuthContext = {
  status: AuthStatus;
  login: (username: string, password: string) => void;
  register: (username: string, password: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContext>({
  status: 'initialising',
  login: () => null,
  logout: () => null,
  register: () => null,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const status = 'initialising';
  const login = () => {};
  const logout = () => {};
  const register = () => {};

  return (
    <AuthContext.Provider value={{ status, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
