export interface InputProps {
  label: string
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
  required?: boolean;
}