import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import useAuth from "../../hooks/useAuth";
import { InputProps } from "../../types/inputTypes";
import { updateUser } from "../../firebase";

const Profile = () => {
  const { user, isLoading, setUser } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [address, setAddress] = useState(user?.address ?? '');
  const [city, setCity] = useState(user?.city ?? '');
  const [cep, setCep] = useState(user?.cep ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [passwordConf, setPasswordConf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
  ];

  const handleSignup = async () => {
    if (!email || !cep) {
      setError("Preencha todos os campos obrigatórios");
      return;
    } 
    
    if (!!password && password !== passwordConf) {
      setError("As senhas não são iguais");
      return;
    }

    if (!!password && password.length < 6) {
      setError("A nova senha deve conter no mínimo 6 dígitos");
      return;
    }

    const updatedData: any = { 
      ...user,
      name,
      email,
      password,
      address,
      city,
      cep
    };

    const res = await updateUser(user!, updatedData);

    if (res) {
      setError(res);
      return;
    }

    delete updatedData.password;
    setUser(updatedData);
  };

  return isLoading ? <></> : (
    <C.Container>
      <C.Content>
        <p style={{color: 'red', alignSelf: 'left' }}>* Campos Obrigatórios</p>
        {formFields.map((formItem, i) => {
          return <Input {...formItem} key={`input_${i}`} />;
        })}
        <C.labelError>{error}</C.labelError>
        <Button Text="Alterar dados" onClick={handleSignup} />
      </C.Content>
    </C.Container>
  );
};

export default Profile;
