import { createContext, useEffect, useState } from "react";
import React from 'react';
import { AuthContextProps, AuthProviderProps, userBasicProps } from "../types/authTypes";
import { firebaseAuth, getUser } from "../firebase";

export const AuthContext: React.Context<AuthContextProps> = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<userBasicProps>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async userRes => {
      if(userRes) {
        await getUser(userRes?.uid).then(userData => setUser(userData));
      } else {
        setUser(undefined);
      };
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};