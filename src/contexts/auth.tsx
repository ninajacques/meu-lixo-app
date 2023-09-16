import { createContext, useEffect, useState } from "react";
import React from 'react';
import { AuthContextProps, AuthProviderProps, UserResponse, userProps } from "../types/authTypes";

export const AuthContext: React.Context<AuthContextProps> = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<userProps>();
  const [isLoading, setLoading] = useState(true);

  useEffect(()=> {
    // if (!!accessToken) {
    //   if (hasUser) setUser(hasUser);
    // }
    setLoading(false);
  }, []);

  const getUser = (email) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd") || '' );

    return usersStorage?.find((user) => user.email === email);
  }

  const signin = (email, senha) => {
    // const user = getUser(email);

    // if(!user) {
    //   return UserResponse.USUARIO_NAO_CADASTRADO;
    // }

    // if(decrypt(user.senha) !== senha) {
    //   return UserResponse.DADOS_INCORRETOS;
    // }

    // const token = Math.random().toString(36).substring(2);
    // localStorage.setItem("user_token", JSON.stringify({ id: user.id, token }));
    // setUser(user);
    return UserResponse.LOGIN_SUCESSO;
  };

  const signup = (accessToken, newUser) => {
    // localStorage.setItem("accessToken", accessToken);
    // localStorage.setItem("userData", newUser);
    setUser(newUser);
    alert(UserResponse.NOVO_SUCESSO);
  };

  const updateUser = (updatedData) => {
    // const usersStorage = JSON.parse(localStorage.getItem("users_bd") || '');

    // if(updatedData.email !== user?.email && usersStorage?.some(u => u.email === updatedData.email)) {
    //   return UserResponse.EMAIL_DUPLICADO;
    // }

    // const userIndex = usersStorage?.findIndex((user) => user.id === updatedData.id);
    
    // if (userIndex < 0) {
    //   return UserResponse.ALTERAR_ERRO;
    // }

    // usersStorage[userIndex] = updatedData;

    // localStorage.setItem("users_bd", JSON.stringify(usersStorage));

    return UserResponse.ALTERAR_SUCESSO;
  };

  const signout = () => {
    // setUser(undefined);
    // localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider value={{ user, signin, signup, signout, updateUser, isLoading, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};