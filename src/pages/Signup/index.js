import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { encrypt } from "../../utils/encrypt";
import uuid from 'react-uuid';

const Signup = () => {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senhaConf, setSenhaConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup, user, signin, isLoading } = useAuth();

  const handleSignup = () => {
    if (!email | !emailConf | !senha | !cep) {
      setError("Preencha todos os campos obrigatórios");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    } else if (senha !== senhaConf) {
      setError("As senhas não são iguais");
      return;
    }

    const newUser = {
      id: uuid(),
      nome,
      email,
      senha: encrypt(senha),
      endereco,
      cidade,
      cep
    };

    const res = signup(newUser);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    signin(email, senha);
    navigate("/home");
  };

  return isLoading ? <></> : (
    !user ? (
      <C.Container>
        <C.Label>Criar conta</C.Label>
        <C.Content>
        <p style={{color: 'red', alignSelf: 'left' }}>* Campos Obrigatórios</p>
        <C.Label>Nome completo <span style={{color: 'red'}}>*</span></C.Label>
        <Input
            type="name"
            placeholder="Ex: João da Silva"
            value={nome}
            onChange={(e) => [setNome(e.target.value), setError("")]}
          />
          <C.Label>Endereço</C.Label>
         <Input
            type="adress"
            placeholder="Ex: Rua, número"
            value={endereco}
            onChange={(e) => [setEndereco(e.target.value), setError("")]}
          />
          <C.Label>Cidade</C.Label>
          <Input
            type="city"
            placeholder="Ex: Florianópolis"
            value={cidade}
            onChange={(e) => [setCidade(e.target.value), setError("")]}
          />
          <C.Label>CEP <span style={{color: 'red'}}>*</span></C.Label>
          <Input
            type="cep"
            placeholder="Ex: 00000-000"
            value={cep}
            onChange={(e) => [setCep(e.target.value), setError("")]}
          />
          <C.Label>Email <span style={{color: 'red'}}>*</span></C.Label>
          <Input
            type="email"
            placeholder="Ex: email@email.com"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <C.Label>Confirme seu email</C.Label>
          <Input
            type="email"
            placeholder="Ex: email@email.com"
            value={emailConf}
            onChange={(e) => [setEmailConf(e.target.value), setError("")]}
          />
          <C.Label>Senha <span style={{color: 'red'}}>*</span></C.Label>
          <Input
            type="password"
            placeholder="*****"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />
          <C.Label>Confirme sua senha</C.Label>
           <Input
            type="password"
            placeholder="*****"
            value={senhaConf}
            onChange={(e) => [setSenhaConf(e.target.value), setError("")]}
          />
          <C.labelError>{error}</C.labelError>
          <Button Text="Criar Conta" onClick={handleSignup} />
          <C.LabelSignin>
            Já possui uma conta? <C.LinkStyled to="/">Realizar login</C.LinkStyled>
          </C.LabelSignin>
        </C.Content>
      </C.Container>
    ) : <Navigate to='/home' />
  );
};

export default Signup;
