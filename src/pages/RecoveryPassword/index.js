import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import * as C from "./styles";
import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { decrypt } from "../../utils/encrypt";

const RecoveryPassword = () => {
    const { user, getUser, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const sendRecoveryEmail = (e) => {
        e.preventDefault();

        const userData = getUser(email);

        if(!userData) {
          setError('Não existe um usuário cadastrado com este email');
          return;
        }

        emailjs.send(
          'service_ahk1tbe', 
          'template_98dhjhd', 
          {email: userData.email, nome: userData.nome, senha: decrypt(userData.senha)}, 
          '4L7Hf8nxc8t7MyASp'
        )
          .then((result) => {
            alert('Email de recuperação enviado com sucesso!')
          }, (error) => {
            alert(`ERRO! ${error.text}`);
          });
      };
    
    return isLoading ? <></> : (
      !user ? (
        <C.Container>
          <C.Label>Recuperação de senha</C.Label>
          <C.Content>
            <C.Label>Email</C.Label>
            <Input
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
      ) : <Navigate to='/home' />
    );
};

export default RecoveryPassword;