import React from "react";
import { GlobalProps } from "@internalTypes/global";

type Input = React.FC<
  React.InputHTMLAttributes<HTMLInputElement> &
    GlobalProps & { setValue: React.Dispatch<React.SetStateAction<string>> }
>;

export const Input: Input = ({ value, setValue, className = "", ...props }) => (
  <input
    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
    value={value}
    onChange={(e) => setValue(e.target.value)}
    {...props}
  />
);
