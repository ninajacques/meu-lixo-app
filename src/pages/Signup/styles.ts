import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  margin-top: 16px;
  width: 100%;
`;

export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  background-color: white;
  max-width: 350px;
  padding: 20px;
  border-radius: 5px;
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: black;
`;

export const LabelSignin = styled.label`
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
`;
