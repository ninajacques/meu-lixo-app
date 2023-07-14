interface ButtonBasicProps {
  onClick: () => void;
  Type?: "button" | "submit" | "reset";
}

export interface ButtonProps extends ButtonBasicProps {
  Text: string;
}

export interface ButtonIconProps extends ButtonBasicProps {
  icon: string;
  iconColor: string;
}