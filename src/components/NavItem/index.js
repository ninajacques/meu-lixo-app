import { Icon } from '@iconify/react';
import * as C from './styles';

const iconColor = '#712eff';

const NavItem = ({ icon, text, link}) => {
  return (
    <C.LinkStyled to={link}>
      <C.Container>
        <Icon icon={icon} color={iconColor} />
        <C.Text>{text}</C.Text>
      </C.Container>
    </C.LinkStyled>
    )
    
};

export default NavItem;