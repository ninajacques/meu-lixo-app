import React from "react";
import * as C from "./styles";
import IconButton from "../IconButton";
import { useNavigate } from "react-router-dom";
import { signoutUser } from "../../firebase";

const Header = () => {
  const navigate = useNavigate();

  return (
    <C.Header>
        <C.LogoText to='/'>MEU LIXO APP</C.LogoText>
        <C.Container>
          <IconButton icon="ic:sharp-account-circle" iconColor="white" onClick={() => navigate('/profile')} />
          <IconButton icon="ic:sharp-logout" iconColor="white" onClick={() => signoutUser()} />
        </C.Container>       
    </C.Header>
  )
}

export default Header;