import React from "react";
import * as C from "./styles";
import { InputProps } from "../../types/inputTypes";


const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, required, label }) => {
  return (
    <>
      <C.Label>{label} {required && <span style={{color: 'red'}}>*</span>}</C.Label>
      <C.Input
        required={required}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
