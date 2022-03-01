import React from "react";

interface InputProps {
  changeEvent: (value: string) => void;
  name: string;
  value: string;
}

export default function Input({ changeEvent, name, value }: InputProps) {
  return (
    <div className="grid grid-cols-2">
      <label
        htmlFor={name}
        className="uppercase font-bold block text-right mr-8"
      >
        {name}
      </label>
      <input
        id={name}
        className="bg-black text-yellow outline-none"
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          changeEvent(e.target.value);
        }}
        placeholder={"Not Set"}
        name={name}
        value={value}
      />
    </div>
  );
}
