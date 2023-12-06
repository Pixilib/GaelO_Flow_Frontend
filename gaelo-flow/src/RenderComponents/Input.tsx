
import React from 'react';

type InputProps = {
  placeholder?: string;
  label?: string;
};

const Input = ({ placeholder = "", label = "" }: InputProps) => {

  const inputStyle = {
    base: 'bg-gray-100 rounded-lg p-2 shadow-md',
    hover: 'hover:border-blue-500 hover:bg-white',
    placeholder: 'placeholder-gray-400',

  };

  return (
    <fieldset>
      <legend>{label}</legend>
      <input
        className={`${inputStyle.base} ${inputStyle.hover} ${inputStyle.placeholder} w-full text-gray-600`}
        type="text"
        placeholder={placeholder}
        onChange={(e) => {}}
      />
    </fieldset>
  );
};

export default Input;
