import { useMutation } from '@apollo/client';
import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LOGIN,
  LoginResponse,
  LoginVariables,
  REGISTER,
  RegisterResponse,
  RegisterVariables,
} from '../graphQL/mutations/user';
import { User } from '../graphQL/types/user';
import { errorToast, successToast } from '../utils/toasts';
import PATH from '../utils/router/paths';
import useLocalStorage, { clearLocalStorage, Keys } from '../hooks/useLocalStorage';

type AuthStatus = 'initialising' | 'authenticated' | 'unauthenticated';

type AuthContext = {
  status: AuthStatus;
  user: User | null;
  login: (login: string, password: string) => void;
  register: (
    user: string,
    surname: string,
    email: string,
    username: string,
    password: string,
    repeatPassword: string
  ) => void;
  logout: () => void;
  isLoading: boolean;
  token: string | null;
  setUserHandler: (user: User) => void;
};

const AuthContext = React.createContext<AuthContext>({
  status: 'initialising',
  user: null,
  login: () => null,
  logout: () => null,
  register: () => null,
  isLoading: false,
  token: null,
  setUserHandler: () => null,
});

type AuthProps = {
  children: React.ReactNode;
};

const AuthProvider: FC<AuthProps> = ({ children }) => {
  const [status, setStatus] = React.useState<AuthStatus>(
    localStorage.getItem(Keys.TOKEN) ? 'authenticated' : 'unauthenticated'
  );

  const [user, setUser] = useLocalStorage<User>(Keys.USER, null);
  const [token, setToken] = useLocalStorage<string>(Keys.TOKEN, null);

  const setUserHandler = (user: User) => setUser(user);
  const setTokenHandler = (token: string) => setToken(token);

  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleError = (error: string) => {
    errorToast(error);
    setStatus('unauthenticated');
  };

  const [refetchLogin] = useMutation<LoginResponse, LoginVariables>(LOGIN);
  const login = useCallback((login: string, password: string) => {
    setIsLoading(true);
    refetchLogin({ variables: { input: { login, password } } })
      .then(
        ({ data }) => {
          if (data) {
            const user = data.login.user;
            successToast(`You were correctly logged in ${user.email}`);
            setTokenHandler(data.login.token);
            setStatus('authenticated');
            navigate(PATH.APP);
            setUser(user);
          }
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
    clearLocalStorage();
    setStatus('unauthenticated');
    setUser(null);
    navigate(PATH.LOGIN);
    setIsLoading(false);
  };

  const [refetchRegister] = useMutation<RegisterResponse, RegisterVariables>(
    REGISTER
  );

  const register = useCallback(
    (
      name: string,
      surname: string,
      email: string,
      username: string,
      password: string,
      repeatPassword: string
    ) => {
      setIsLoading(true);

      refetchRegister({
        variables: {
          input: {
            firstName: name,
            lastName: surname,
            email,
            login: username,
            password,
            repeatPassword,
          },
        },
      })
        .then(
          ({ data }) => {
            if (data) {
              const { user, token } = data.register;
              successToast(`You were correctly logged in ${user.email}`);
              successToast(`You were correctly registered ${user.login}.`);
              setTokenHandler(token);
              setStatus('authenticated');
              setUser(user);
            }
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
      value={{
        status,
        user,
        login,
        logout,
        register,
        isLoading,
        token,
        setUserHandler,
      }}
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
