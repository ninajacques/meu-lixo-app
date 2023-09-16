import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import GlobalStyle from "./styles/global";
import { verifyLogin } from "./firebase";

const App = () => {
  verifyLogin();
  return (
    <AuthProvider>
      <RoutesApp />
      <GlobalStyle />
    </AuthProvider>
  )
};

export default App;
