import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import GlobalStyle from "./styles/global";

const App = () => {
  const userToken = JSON.parse(localStorage.getItem("user_token") || '');
  const usersStorage = JSON.parse(localStorage.getItem("users_bd") || '');

  return (
    <AuthProvider userToken={userToken} usersStorage={usersStorage}>
      <RoutesApp />
      <GlobalStyle />
    </AuthProvider>
  )
};

export default App;
