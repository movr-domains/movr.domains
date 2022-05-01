import useSearchName from '@hooks/useSearchName';
import { searchedDomain } from 'apollo/reactiveVars';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function LookUp() {
  const [text, setText] = useState('');

  const { lookUp } = useSearchName();
  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        lookUp(text);
      }}
    >
      <div className='flex'>
        <input
          type='text'
          className='text-white bg-[#0d0d0d] px-2 py-1 outline-none border-yellow border w-full border-r-0 rounded-l-sm'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value.toLowerCase())
          }
          placeholder='Search name...'
        />
        <button className='bg-[#0d0d0d] border border-l-0 uppercase border-yellow px-3 hover:bg-[#0d0d0d] text-white font-bold transition-colors duration-200 text-sm rounded-r-sm'>
          Search
        </button>
      </div>
    </form>
  );
}
