import { Icon } from '@iconify/react';
import * as C from './styles';
import React from 'react';
import { NavItemProps } from '../../types/navTypes';

const NavItem: React.FC<NavItemProps> = ({ icon, text, link }) => {
  return (
    <C.LinkStyled to={link}>
      <C.Container>
        <Icon icon={icon} color={C.IconColor} />
        <C.Text>{text}</C.Text>
      </C.Container>
    </C.LinkStyled>
    )
    
};

export default NavItem;