import { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleButton } from '../components/GoogleButton';
import { LoginView } from '../components/LoginView';
import { useAuth } from '../context/AuthContext';
import { GRAY, MAXIMUM_RED_PURPLE } from '../design/colors';
import { Button, TertiaryButton } from '../elements/button';
import { LeftWrapper, LoginContainer, Wrapper } from '../elements/containers';
import { Input } from '../elements/form';
import { PrimaryText, Text } from '../elements/text';
import PATH from '../utils/router/paths';

type LoginDataProps = {
  login: string;
  password: string;
};

const Login = () => {
  const { login, isLoading } = useAuth();

  const [loginData, setLoginData] = useState<LoginDataProps>({
    login: '',
    password: '',
  });

  const navigate = useNavigate();
  
  const isValid = useCallback(() => {
    return loginData.login && loginData.password;
  }, [loginData]);

  return (
    <LoginContainer>
      <LoginView>
        <LeftWrapper>
          <PrimaryText color={MAXIMUM_RED_PURPLE}>Login</PrimaryText>
          <Text color={GRAY} align="left">
            Welcome! Login to make your life simpler through managing your
            future tasks.
          </Text>
        </LeftWrapper>
        <Wrapper>
          <Input
            value={loginData.login}
            onChange={(value: string) =>
              setLoginData({ ...loginData, login: value })
            }
            placeholder="Username or email:"
            type="text"
          />
          <Input
            value={loginData.password}
            onChange={(value: string) =>
              setLoginData({ ...loginData, password: value })
            }
            placeholder="Password:"
            type="password"
          />
        </Wrapper>
        <Wrapper margin="50px 0 0 0">
          <Button
            label={'Login'}
            onClick={() =>
              isValid() && login(loginData.login, loginData.password)
            }
            disabled={!isValid() || isLoading}
          />
          <GoogleButton/>
        </Wrapper>
        <Wrapper margin="50px 0 0 0">
          <Text color="#000">Don't have an account ?</Text>
          <TertiaryButton label={'Register'} onClick={() => navigate(PATH.REGISTER)} />
        </Wrapper>
      </LoginView>
    </LoginContainer>
  );
};

export default Login;
