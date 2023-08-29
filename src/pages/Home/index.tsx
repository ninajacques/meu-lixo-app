import React from "react";
import * as C from "./styles";
import Map from "../../components/Map";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user, isLoading } = useAuth();

  return isLoading ? <></> : (
    !!user ? (
      <C.Container>
        <Map />
      </C.Container>
    ) : (
      <Navigate to='/' />
    )
  ) 
};

export default Home;
