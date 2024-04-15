import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const Button: React.FC<Props> = ({ text, ...restProps }) => (
  <button className="rounded bg-gray-200 px-4 py-2" {...restProps}>
    {text}
  </button>
);
