import React from "react";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import IconButton from "../IconButton";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <C.Header>
        <C.LogoText>RECICLA APP</C.LogoText>
        <C.Container>
          <IconButton icon="ic:sharp-account-circle" iconColor="white" onClick={() => navigate('/profile')} />
          <IconButton icon="ic:sharp-logout" iconColor="white" onClick={() => signout()} />
        </C.Container>       
    </C.Header>
  )
}

export default Header;