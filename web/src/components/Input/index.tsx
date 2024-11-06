import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface InputProps {
  label: string;
  type: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  placeholder?: string;
  accept?: string;
}

const Input = ({
  label,
  type,
  value,
  onChange,
  isPassword,
  placeholder,
  accept,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          id={label}
          name={label}
          className="mt-1 block w-full p-3 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-primary/60 focus:border-primary/60"
          required
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          accept={accept}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 text-primary flex items-center text-sm leading-5"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
