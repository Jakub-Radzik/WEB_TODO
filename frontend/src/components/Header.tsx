import { WHITE } from '../design/colors';
import { HeaderContainer } from '../elements/containers';
import { HeaderBox, StyledHeader } from '../elements/header';
import { PrimaryText } from '../elements/text';
import { FC } from 'react';
import { useAuth } from '../context/AuthContext';
import LogOut from '../assets/logOut.png';
import { IconButton } from '../elements/button';
import LogoImg from '../assets/todo.png';
import { Logo } from '../elements/images';

const Header: FC<{}> = () => {
  const { user, logout } = useAuth();
  console.dir(user);
  return (
    <StyledHeader>
      <HeaderContainer>
        <HeaderBox horizontal="flex-start">
          <Logo src={LogoImg} />
        </HeaderBox>
        <HeaderBox>
          <PrimaryText color={WHITE}>SLP_TODO</PrimaryText>
        </HeaderBox>
        <HeaderBox horizontal="flex-end">
          {user?.username && (
            <>
              <PrimaryText color={WHITE}>Welcome {user?.username}</PrimaryText>
              <IconButton
                icon={LogOut}
                onClick={() => {
                  logout();
                }}
              />
            </>
          )}
        </HeaderBox>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default Header;
