import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
`;

export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: left;
  justify-content: left;
  flex-direction: column;
  width: 100%;
  background-color: white;
  max-width: 350px;
  padding: 20px;
`;

export const Label = styled.label`
  font-size: 15px;
  font-weight: 600;
  color: black;
  
`;

export const LabelSignup = styled.label`
margin-bottom: 20px;
  font-size: 16px;
  color: black;
`;

export const labelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const LinkStyled = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: #712eff;
`
