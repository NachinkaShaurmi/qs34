import React from "react";

interface IButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
}

const Button: React.FC<IButton> = ({ title, ...props }) => {
  return <button {...props}>{title}</button>;
};

export default Button;
