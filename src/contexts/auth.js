import { createContext, useEffect, useState } from "react";
import { decrypt } from "../utils/encrypt";

export const AuthContext = createContext({});

export const AuthProvider = ({ children, userToken, usersStorage }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(()=> {
    if (userToken && usersStorage) {
      const hasUser = usersStorage.find(
        (user) => user.id === userToken.id
      );

      if (hasUser) setUser(hasUser);
    }
    setLoading(false);
  }, []);

  const getUser = (email) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    return usersStorage?.find((user) => user.email === email);
  }

  const signin = (email, senha) => {
    const user = getUser(email);
    if (user) {
      if (user.email === email && decrypt(user.senha) === senha) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ id: user.id, token }));
        setUser(user);
        return;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signup = (newUser) => {
    const user = getUser(newUser.email);

    if (user?.length) {
      return "Já existe uma conta com esse E-mail";
    }

    let newUserDb;

    if (usersStorage) {
      newUserDb = [...usersStorage, newUser];
    } else {
      newUserDb = [newUser];
    }

    localStorage.setItem("users_bd", JSON.stringify(newUserDb));

    return;
  };

  const updateUser = (updatedData) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    if(updatedData.email !== user.email && usersStorage?.some(u => u.email === updatedData.email)) {
      return "Já existe uma conta com esse E-mail";
    }

    const userIndex = usersStorage?.findIndex((user) => user.id === updatedData.id);
    
    if (userIndex < 0) {
      return "Infelizmente, não foi possível alterar os dados do usuário.";
    }

    usersStorage[userIndex] = updatedData;

    localStorage.setItem("users_bd", JSON.stringify(usersStorage));

    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signin, signup, signout, updateUser, isLoading, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
