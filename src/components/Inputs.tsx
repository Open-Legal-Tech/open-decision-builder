import React from "react";
import clsx from "clsx";
import { pluck } from "@utils/index";

const inputVariants = {
  default:
    "rounded w-full py-2 px-3 leading-tight  bg-gray-100 border-2 border-gray-300 shadow-inner",
} as const;

type inputVariants = keyof typeof inputVariants;

type Input = React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
    variant?: inputVariants;
  }
>;

export const Input: Input = ({ className, variant = "default", ...props }) => (
  <input
    className={clsx(pluck([variant], inputVariants), className)}
    {...props}
  />
);

export const FileInput: Input = ({ className, ...props }) => (
  <label
    className={clsx(
      className,
      "w-48 flex flex-col items-center px-2 py-4 bg-gray-100 text-green-900 rounded-lg shadow-lg tracking-wide uppercase border border-green-700 cursor-pointer hover:bg-green-300 clickable"
    )}
  >
    <svg
      className="w-8 h-8"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
    </svg>
    <span className="mt-2 text-base leading-normal">Datei auswählen</span>
    <input type="file" className="hidden" {...props} />
  </label>
);
