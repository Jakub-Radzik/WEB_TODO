import axios from 'axios';
import React, { FC, useCallback, useEffect } from 'react';
import { errorToast, successToast } from '../utils/toasts';

type AuthStatus = 'initialising' | 'authenticated' | 'unauthenticated';

type UserType = {
  username: string;
};

type AuthContext = {
  status: AuthStatus;
  user: UserType | null;
  login: (login: string, password: string) => void;
  register: (
    user: string,
    surname: string,
    email: string,
    username: string,
    password: string
  ) => void;
  logout: () => void;
  isLoading: boolean;
  token: string | null;
};

const AuthContext = React.createContext<AuthContext>({
  status: 'initialising',
  user: null,
  login: () => null,
  logout: () => null,
  register: () => null,
  isLoading: false,
  token: null,
});

type AuthProps = {
  children: React.ReactNode;
};

type PostLoginData = {
  login: string;
  password: string;
};

type PostLoginResponse = {
  data: {
    token: string;
    username: string;
  };
};

type PostRegisterData = {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
};

type PostRegisterResponse = {
  data: {
    username: string;
  };
};

type ProfileResponse = {
  profile: {
    username: string;
  };
};

const AuthProvider: FC<AuthProps> = ({ children }) => {
  const [status, setStatus] = React.useState<AuthStatus>(
    sessionStorage.getItem('token') ? 'authenticated' : 'unauthenticated'
  );
  const [user, setUser] = React.useState<UserType | null>(null);
  const [token, setToken] = React.useState<string | null>(
    sessionStorage.getItem('token') || null
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const handleError = (error: string) => {
    errorToast(error);
    setStatus('unauthenticated');
  };

  const setTokenHandler = (token: string) => {
    setToken(token);
    sessionStorage.setItem('token', token);
  };

  useEffect(() => {
    if (token) {
      axios
        .get<ProfileResponse>('http://127.0.0.1:5000/api/v1/user', {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then(
          ({ data }) => {
            setUser({ username: data.profile.username });
          },
          error => handleError(error)
        )
        .catch(error => {
          handleError(error);
        });
    }
  }, [token]);

  const login = useCallback((login: string, password: string) => {
    setIsLoading(true);

    axios
      .post<PostLoginData, PostLoginResponse>(
        'http://127.0.0.1:5000/api/v1/login',
        { login, password }
      )
      .then(
        ({ data }) => {
          successToast(`You were correctly logged in ${data.username}`);
          setTokenHandler(`Bearer ${data.token}`);
          setStatus('authenticated');
          setUser({ username: data.username });
        },
        error => handleError(error)
      )
      .catch(error => {
        handleError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const logout = () => {
    setIsLoading(true);
    successToast('You were correctly logged out');
    setToken(null);
    sessionStorage.removeItem('token');
    setStatus('unauthenticated');
    setUser(null);
    setIsLoading(false);
  };

  const register = useCallback(
    (
      name: string,
      surname: string,
      email: string,
      username: string,
      password: string
    ) => {
      setIsLoading(true);
      axios
        .post<PostRegisterData, PostRegisterResponse>(
          'http://127.0.0.1:5000/api/v1/register',
          { name, surname, email, username, password }
        )
        .then(
          ({ data }) => {
            successToast(
              `You were correctly registered ${data.username}. You can now login`
            );
          },
          error => handleError(error)
        )
        .catch(error => {
          handleError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{ status, user, login, logout, register, isLoading, token }}
    >
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
