import React from "react";
import * as C from "./styles";
import { InputProps } from "../../types/inputTypes";


const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange }) => {
  return (
    <C.Input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
