import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signin = () => {
  const { signin, user, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  return isLoading ? <></> : (
    !user ? (
      <C.Container>
        <C.LabelSignup>
          Não possui uma conta? <C.LinkStyled to="/signup">Criar uma conta </C.LinkStyled>
        </C.LabelSignup>
          <C.Label>Login</C.Label>
        <C.Content>
        <C.Label>Email</C.Label>
          <Input
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <C.Label>Senha</C.Label>
          <Input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />
          <C.labelError>{error}</C.labelError>
          <Button Text="Entrar" onClick={handleLogin} /> 
        </C.Content>
        <C.LinkStyled to="/recovery_password">Esqueceu sua senha? </C.LinkStyled>
      </C.Container>
    ) : <Navigate to='/home' />
  );
};

export default Signin;
