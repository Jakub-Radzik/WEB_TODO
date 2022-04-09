import axios from 'axios';
import React, { FC, useCallback } from 'react';
import { toast } from 'react-toastify';
import { errorToast, successToast } from '../utils/toasts';

type AuthStatus = 'initialising' | 'authenticated' | 'unauthenticated';

type UserType = {
  username: string;
};

type AuthContext = {
  status: AuthStatus;
  user: UserType | null;
  login: (username: string, password: string) => void;
  register: (username: string, password: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContext>({
  status: 'initialising',
  user: null,
  login: () => null,
  logout: () => null,
  register: () => null,
});

type AuthProps = {
  children: React.ReactNode;
};

type PostLoginData = {
  username: string;
  password: string;
};

type PostLoginResponse = {
  data: {
    token: string;
  };
};

const AuthProvider: FC<AuthProps> = ({ children }) => {
  const [status, setStatus] = React.useState<AuthStatus>('initialising');
  const [user, setUser] = React.useState<UserType | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  const handleError = (error: string) => {
    errorToast(error);
    setStatus('unauthenticated');
  };

  const login = useCallback((username: string, password: string) => {
    axios
      .post<PostLoginData, PostLoginResponse>(
        'http://127.0.0.1:5000/api/v1/login',
        { username, password }
      )
      .then(
        data => {
          successToast(`You were correctly logged in ${username}`);
          setToken(data.data.token);
          setStatus('authenticated');
          setUser({ username });
        },
        error => handleError(error)
      )
      .catch(error => {
        handleError(error);
      });
  }, []);

  const logout = () => {
    successToast("You were correctly logged out")
    setToken(null);
    setStatus('unauthenticated');
    setUser(null);
  };
  const register = () => {
    setStatus('unauthenticated');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ status, user, login, logout, register }}>
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
