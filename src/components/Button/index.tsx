import React from "react";
import * as C from "./styles";
import { ButtonProps } from "../../types/buttonTypes";

const Button: React.FC<ButtonProps> = ({ Text, onClick, Type = "button", disabled }) => {
  return (
    <C.Button type={Type} onClick={onClick} disabled={disabled}>
      {Text}
    </C.Button>
  );
};

export default Button;
