import { WHITE } from '../design/colors';
import { HeaderContainer } from '../elements/containers';
import { HeaderBox, StyledHeader } from '../elements/header';
import { PrimaryText } from '../elements/text';
import { FC } from 'react';
import { useAuth } from '../context/AuthContext';
import LogOut from '../assets/logOut.png';
import { IconButton } from '../elements/button';

const Header: FC<{}> = () => {
  const { user, logout } = useAuth();

  return (
    <StyledHeader>
      <HeaderContainer>
        <HeaderBox horizontal="flex-start">
          <PrimaryText color={WHITE}>LOGO </PrimaryText>
        </HeaderBox>
        <HeaderBox>
          <PrimaryText color={WHITE}>App Name</PrimaryText>
        </HeaderBox>
        <HeaderBox horizontal="flex-end">
          {user && (
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
