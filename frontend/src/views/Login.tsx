import { FC, useState } from 'react';
import { LoginView } from '../components/LoginView';
import { useAuth } from '../context/AuthContext';
import { Button } from '../elements/button';
import { BaseContainer } from '../elements/containers';
import { Input } from '../elements/form';

type LoginDataProps = {
  username: string;
  password: string;
};

const Login: FC<{}> = () => {
  const { login, logout, user } = useAuth();

  const [loginData, setLoginData] = useState<LoginDataProps>({
    username: '',
    password: '',
  });

  return (
    <BaseContainer>
      <LoginView>
        <form>
          <Input
            value={loginData.username}
            setValue={(value: string) =>
              setLoginData({ ...loginData, username: value })
            }
            placeholder="Username:"
            type="text"
          />
          <Input
            value={loginData.password}
            setValue={(value: string) =>
              setLoginData({ ...loginData, password: value })
            }
            placeholder="Password:"
            type="password"
          />
          <Button
            label={'Log in'}
            onClick={() => login(loginData.username, loginData.password)}
          />
          {user ? <Button label={'Log out'} onClick={() => logout()} /> : null}
          {user ? 'welcome: ' + user.username : 'log in to sys'}
        </form>
      </LoginView>
    </BaseContainer>
  );
};

export default Login;
