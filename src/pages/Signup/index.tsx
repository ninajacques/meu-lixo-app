import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import useAuth from "../../hooks/useAuth";
import { UserResponse, userProps } from "../../types/authTypes";
import { createUser } from "../../firebase";
import { InputProps } from "../../types/inputTypes";



const Signup = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { isLoading } = useAuth();

  const formFields: InputProps[] = [
    {
      label: 'Nome Completo',
      type: 'text',
      placeholder: 'Digite seu nome completo',
      value: name,
      onChange: (e) => [setName(e.target.value), setError("")],
      required: true
    },
    {
      label: 'Endereço',
      type: 'text',
      placeholder: 'Rua, número',
      value: address,
      onChange: (e) => [setAddress(e.target.value), setError("")],
      required: false
    },
    {
      label: 'Cidade',
      type: 'text',
      placeholder: 'Cidade',
      value: city,
      onChange: (e) => [setCity(e.target.value), setError("")],
      required: false
    },
    {
      label: 'CEP',
      type: 'text',
      placeholder: '00000-000',
      value: cep,
      onChange: (e) => [setCep(e.target.value), setError("")],
      required: true
    },
    {
      label: 'Email',
      type: 'email',
      placeholder: 'email@email.com',
      value: email,
      onChange: (e) => [setEmail(e.target.value), setError("")],
      required: true
    },
    {
      label: 'Confirme seu email',
      type: 'email',
      placeholder: 'email@email.com',
      value: emailConf,
      onChange: (e) => [setEmailConf(e.target.value), setError("")],
      required: true
    },
    {
      label: 'Senha',
      type: 'password',
      placeholder: '******',
      value: password,
      onChange: (e) => [setPassword(e.target.value), setError("")],
      required: true
    },
    {
      label: 'Confirme sua senha',
      type: 'password',
      placeholder: '******',
      value: passwordConf,
      onChange: (e) => [setPasswordConf(e.target.value), setError("")],
      required: true
    }
  ]

  const handleSignup = async () => {
    if (!email || !emailConf || !password || !cep) {
      setError("Preencha todos os campos obrigatórios");
      return;
    } 
    
    if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }
    
    if (password !== passwordConf) {
      setError("As senhas não são iguais");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve conter no mínimo 6 dígitos");
      return;
    }

    const newUser: userProps = {
      id: '',
      name,
      email,
      password,
      address,
      city,
      cep
    };
    
    const res = await createUser(newUser);

    
    if (res === UserResponse.EMAIL_DUPLICADO || res === UserResponse.NOVO_ERRO) {
      setError(res);
      return;
    }
  };

  return isLoading ? <></> : (
    <C.Container>
      <C.Label>Criar conta</C.Label>
      <C.Content>
        <p style={{color: 'red', alignSelf: 'left' }}>* Campos Obrigatórios</p>
        {formFields.map((formItem, i) => {
          return <Input {...formItem} key={`input_${i}`} />;
        })}
        <C.labelError>{error}</C.labelError>
        <Button Text="Criar Conta" onClick={handleSignup} />
        <C.LabelSignin>
          Já possui uma conta? <C.LinkStyled to="/">Realizar login</C.LinkStyled>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;
