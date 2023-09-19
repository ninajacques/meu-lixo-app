import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import useAuth from "../../hooks/useAuth";
import { UserResponse, userProps } from "../../types/authTypes";
import { createUser } from "../../firebase";
import { InputProps } from "../../types/inputTypes";
import { Icon } from "@iconify/react";
import Modal from "../../components/Modal";
import cep from 'cep-promise';

const Signup = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cepData, setCepData] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [password, setPassword] = useState("");
  const [telefone, setTelefone] = useState("");
  const [error, setError] = useState("");
  const [accountType, setAccountType] = useState('');

  const { isLoading, setLoading } = useAuth();

  const formFields: InputProps[] = [
    {
      label: accountType === 'pontoDeColeta' ? 'Nome do Estabelecimento' : 'Nome Completo',
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
      type: 'number',
      placeholder: '00000000',
      value: cepData,
      onChange: (e) => [setCepData(e.target.value), setError("")],
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
      label: accountType === 'pontoDeColeta' ? 'Telefone' : 'Confirme seu email',
      type: accountType === 'pontoDeColeta' ? 'number' : 'email',
      placeholder: accountType === 'pontoDeColeta' ? 'Digite seu telefone' : 'email@email.com',
      value: accountType === 'pontoDeColeta' ? telefone : emailConf,
      onChange: (e) => [accountType === 'pontoDeColeta' ? setTelefone(e.target.value) : setEmailConf(e.target.value), setError("")],
      required: accountType !== 'pontoDeColeta'
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
    if (!email || !password || !cepData) {
      setError("Preencha todos os campos obrigatórios");
      return;
    } 
    
    if (accountType === 'pessoaFisica' && email !== emailConf) {
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

    setLoading(true);
    
    await cep(cepData)
      .then(async () => {

        const newUser: userProps = {
          id: '',
          name,
          accountType,
          email,
          password,
          address,
          city,
          cep: cepData,
          telefone
        };
        
        const res = await createUser(newUser);

        if (res === UserResponse.EMAIL_DUPLICADO || res === UserResponse.NOVO_ERRO) {
          setError(res);
        }
      })
      .catch(() => setError('CEP Inválido'));

    setLoading(false);

    
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Modal isOpen={isLoading}>
          <Icon icon='svg-spinners:pulse-multiple' color="#712eff" width={96} height={96} />
          <p style={{ color: "#712eff" }}>Criando conta...</p>
        </Modal>
        <C.Container>
          <div style={{ display: 'flex', gap: '24px' }}>
            <p onClick={() => setAccountType('')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Icon icon='ic:baseline-keyboard-arrow-left' />
              Voltar
            </p>
            <C.LabelSignin>
              Já possui uma conta? <C.LinkStyled to="/">Realizar login</C.LinkStyled>
            </C.LabelSignin>
          </div>
          <C.Label style={{ marginRight: 0}}>Criar conta</C.Label>
            {!!accountType ? (
              <C.Content>        
                <p style={{color: 'red', alignSelf: 'left' }}>* Campos Obrigatórios</p>
                {formFields.map((formItem, i) => {
                  return <Input {...formItem} key={`input_${i}`} />;
                })}
                <C.labelError>{error}</C.labelError>
                <Button Text="Criar Conta" onClick={handleSignup} disabled={!!error} />
              </C.Content>
            ) : (
              <C.Container>
                <p>Escolha um tipo de perfil para iniciar seu cadastro.</p>
                <div style={{display: 'flex'}}>

                  <C.Content style={{ cursor: 'pointer', textAlign: 'center', margin: '0 16px', alignItems: 'center' }} onClick={() => setAccountType('pessoaFisica')}>
                    {/* icon */}
                    <Icon icon='ic:outline-person-outline' color="#712eff" width={96} height={96} style={{backgroundColor: 'rgb(205, 187, 245)', borderRadius: '50%'}} />
                    <h3>Pessoa física</h3>
                    <p>Vou usar o app para explorar pontos de coleta</p>
                  </C.Content>
                  <C.Content style={{ cursor: 'pointer', textAlign: 'center', margin: '0 16px', alignItems: 'center' }} onClick={() => setAccountType('pontoDeColeta')}>
                    {/* icon */}
                    <Icon icon='ic:outline-recycling' color="#712eff" width={96} height={96} style={{backgroundColor: 'rgb(205, 187, 245)', borderRadius: '50%'}} />
                    <h3>Espaço para reciclagem</h3>
                    <p>Somos um ponto de coleta</p>
                  </C.Content>
                </div>
              </C.Container>
            )}
        </C.Container>
      </div>
  );
};

export default Signup;
