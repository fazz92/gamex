import React from 'react';

import { styled } from '@gamex/uix';
import { Brand } from 'ui/components/styled-components';
import Logo from 'images/logo.svg';
import User from './User';
import ThemeToggle from './ThemeToggle';

const LogoStyle = styled('img', () => ({
  maxWidth: '200px',
}));

const UserContainer = styled('div', () => ({
  display: 'flex',
  gap: '10px',
}));

const Header = () => {
  return (
    <Brand>
      <LogoStyle src={Logo} />
      <UserContainer>
        <ThemeToggle />
        <User />
      </UserContainer>
    </Brand>
  );
};

export default Header;
