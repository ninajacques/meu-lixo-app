import styled from "styled-components";

export const Input = styled.input`
  outline: none;
  padding: 16px 20px;
  width: 100%;
  border-radius: 5px;
  font-size: 16px;

  background-color: #f0f2f5;
  border: none;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  [type='number']{
    -moz-appearance: textfield;
  }
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: black;
`;
