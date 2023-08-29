import styled from "styled-components";

export const Container = styled.div`
  grid-area: main;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: calc(100vh - 100px);
  margin: 160px 0 200px 0;

  @media only screen and (min-width: 768px) {
    height: calc(100vh - 50px);
    width: calc(100vw - 150px);
    margin: 0;
  }
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
