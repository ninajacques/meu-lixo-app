import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import useAuth from "../../hooks/useAuth";
import { signinUser } from "../../firebase";
import { Icon } from "@iconify/react";
import Modal from "../../components/Modal";

const Signin = () => {
  const { isLoading, setLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    setLoading(true);
    

    const res = await signinUser(email, password);

    if (res) {
      setLoading(false);
      setError(res);
    }
  };

  return (
    <>
      <Modal isOpen={isLoading}>
        <Icon icon='svg-spinners:pulse-multiple' color="#712eff" width={96} height={96} />
        <p style={{ color: "#712eff" }}>Realizando Login...</p>
      </Modal>
      <C.Container>
        <C.LabelSignup>
          Não possui uma conta? <C.LinkStyled to="/signup">Criar uma conta </C.LinkStyled>
        </C.LabelSignup>
          <C.Label>Login</C.Label>
        <C.Content>
          <Input
            label="Email"
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="Digite sua Senha"
            value={password}
            onChange={(e) => [setPassword(e.target.value), setError("")]}
          />
          <C.labelError>{error}</C.labelError>
          <Button Text="Entrar" onClick={handleLogin} /> 
        </C.Content>
        <C.LinkStyled to="/recovery_password">Esqueceu sua senha?</C.LinkStyled>
      </C.Container>
    </>
  );
};

export default Signin;
