import classNames from 'classnames';
import React, { RefObject } from 'react';
import { useEffect } from 'react';
import { forwardRef } from 'react';
import { useRef } from 'react';
import { MutableRefObject } from 'react';

interface InputProps {
  changeEvent: (value: string) => void;
  name: string;
  value: string;
  className?: string;
  disabled?: boolean;
  hideLabel?: boolean;
  placeholder?: string;
  onBlur?: () => void;
}

export default function Input({
  changeEvent,
  name,
  value,
  className,
  disabled = false,
  hideLabel = false,
  placeholder,
  onBlur,
}: InputProps) {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  return (
    <div className='w-full'>
      {!hideLabel && (
        <label htmlFor={name} className='uppercase font-bold block'>
          {name}
        </label>
      )}
      <input
        id={name}
        className={classNames(
          'input-el',
          {
            'bg-[#3c3c3c]': !disabled,
            'bg-[#2d2d2d]': disabled,
          },
          [className]
        )}
        type='text'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          changeEvent(e.target.value);
        }}
        placeholder={
          placeholder
            ? `${placeholder.toUpperCase()}...`
            : `${name.toUpperCase()}...`
        }
        name={name}
        value={value}
        disabled={disabled}
        onBlur={onBlur}
        ref={inputEl}
      />
    </div>
  );
}
