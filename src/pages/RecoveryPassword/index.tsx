import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { recoveryPassword } from "../../firebase";

const RecoveryPassword = () => {
    const { isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const sendRecoveryEmail = async (e) => {
        e.preventDefault();
        const res = await recoveryPassword(email);

        if(res) {
          setError(res);
        }
      };
    
    return isLoading ? <></> : (
      <C.Container>
        <C.Label>Recuperação de senha</C.Label>
        <C.Content>
          <Input
            label="Email"
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <C.labelError>{error}</C.labelError>
          <Button Text="Recuperar Senha" onClick={sendRecoveryEmail} /> 
        </C.Content>
        <C.LinkStyled to="/">Cancelar</C.LinkStyled>
      </C.Container>
    );
};

export default RecoveryPassword;