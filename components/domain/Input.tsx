import React from 'react';

interface InputProps {
  changeEvent: (value: string) => void;
  name: string;
  value: string;
}

export default function Input({ changeEvent, name, value }: InputProps) {
  return (
    <div className=''>
      <label htmlFor={name} className='uppercase font-bold block'>
        {name}
      </label>
      <input
        id={name}
        className='bg-[#2d2d2d] w-full text-white outline-none py-1 px-3 rounded'
        type='text'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          changeEvent(e.target.value);
        }}
        placeholder={`${name.toUpperCase()}...`}
        name={name}
        value={value}
      />
    </div>
  );
}
