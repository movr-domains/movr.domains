import classNames from 'classnames';
import React from 'react';

interface InputProps {
  changeEvent: (value: string) => void;
  name: string;
  value: string;
  disabled?: boolean;
}

export default function Input({
  changeEvent,
  name,
  value,
  disabled = false,
}: InputProps) {
  return (
    <div className=''>
      <label htmlFor={name} className='uppercase font-bold block'>
        {name}
      </label>
      <input
        id={name}
        className={classNames(
          'w-full text-white outline-none py-1 px-3 rounded transition-colors duration-200',
          { 'bg-[#3c3c3c]': !disabled, 'bg-[#2d2d2d]': disabled }
        )}
        type='text'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          changeEvent(e.target.value);
        }}
        placeholder={`${name.toUpperCase()}...`}
        name={name}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}
