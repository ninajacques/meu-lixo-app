import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { encrypt } from "../../utils/encrypt";
import { UserResponse } from "../../types/authTypes";

const Profile = () => {
  const { user, updateUser, isLoading } = useAuth();
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [senhaConf, setSenhaConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if(user) {
      setNome(user.nome);
      setEndereco(user.endereco);
      setCidade(user.cidade);
      setCep(user.cep);
      setEmail(user.email);
    }
  }, [user])

  const handleSignup = () => {
    if (!email || !cep) {
      setError("Preencha todos os campos obrigatórios");
      return;
    } else if (!!senha && senha !== senhaConf) {
      setError("As senhas não são iguais");
      return;
    }

    const updatedData = { 
      ...user,
      nome,
      email,
      senha: senha ? encrypt(senha) : user?.senha,
      endereco,
      cidade,
      cep
    };

    const res = updateUser(updatedData);

    if (res !== UserResponse.NOVO_SUCESSO) {
      setError(res);
      return;
    }

    alert(res);
  };

  return isLoading ? <></> : (
    !!user ? (
      <C.Container>
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
          <C.Label>Senha</C.Label>
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
          <Button Text="Alterar dados" onClick={handleSignup} />
        </C.Content>
      </C.Container>
    ) : <Navigate to='/' />
  );
};

export default Profile;
