import React from "react";
import * as C from "./styles";
import { Icon } from '@iconify/react';
import { ButtonIconProps } from "../../types/buttonTypes";

const IconButton: React.FC<ButtonIconProps> = ({ icon, iconColor, onClick, Type = "button" }) => {
  return (
    <C.Button type={Type} onClick={onClick}>
      <Icon icon={icon} color={iconColor} />
    </C.Button>
  );
};

export default IconButton;
