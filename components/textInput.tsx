import React from "react";

const TextInput = ({
  width,
  type,
  placeholder,
  value,
  error,
  setValue,
  label,
}) => {
  return (
    <div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className={`${width} px-3 mb-6 md:mb-0`}>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor={`input-${value}`}
          >
            {label}
          </label>
          <input
            className={
              "appearance-none block w-full bg-white text-gray-700 border rounded-lg " +
              (error ? " border-red-500 " : "") +
              "rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100"
            }
            required
            id={`input-${value}`}
            type={type}
            name={value}
            placeholder={placeholder}
            onChange={setValue}
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
      </div>
    </div>
  );
};
export default TextInput;
