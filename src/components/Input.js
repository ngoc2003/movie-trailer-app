import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const Input = ({
  placeholder = "Placeholder",
  icon = false,
  defaultValue='',
  onChange=() => {}
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center px-3 py-3 overflow-hidden border rounded-md">
      <input
        type={!icon ? 'text' : showPassword ? "text" : "password"}
        className="flex-1 bg-transparent outline-none "
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      {icon && (
        <span
          className="px-5 cursor-pointer text-primary"
          onClick={handleTogglePassword}
        >
          {!showPassword ? (
            <AiFillEye size={20}></AiFillEye>
          ) : (
            <AiFillEyeInvisible size={20}></AiFillEyeInvisible>
          )}
        </span>
      )}
    </div>
  );
};

export default Input;
