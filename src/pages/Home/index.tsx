import React from "react";
import * as C from "./styles";
import Map from "../../components/Map";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { isLoading } = useAuth();

  return isLoading ? <></> : (
    <C.Container>
      <Map />
    </C.Container>
  ) 
};

export default Home;
