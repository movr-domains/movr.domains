import { searchedDomain } from 'apollo/reactiveVars';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function LookUp() {
  const [text, setText] = useState('');
  const router = useRouter();
  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        text.toLowerCase();
        searchedDomain(text);
        router.push(`/domain/${text}/`);
      }}
    >
      <div className='flex'>
        <input
          type='text'
          className='text-white bg-black px-2 py-1 outline-none border-b-green border-b w-full'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          placeholder='Search name...'
        />
        <button className='bg-black border-b border-l-0 uppercase border-green px-3 hover:text-green font-bold transition-colors duration-200'>
          Search
        </button>
      </div>
    </form>
  );
}
