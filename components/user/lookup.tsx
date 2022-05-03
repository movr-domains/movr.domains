import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';

export default function Lookup() {
  const [domainSearch, setDomainSearch] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const { push } = useRouter();

  useEffect(() => {
    if (inputRef?.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className='text-darkgrey text-lg space-y-3 text-center'>
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          setError('');
          if (domainSearch.length <= 2) {
            setError('Domains must be 3 characters or more.');
            return;
          }
          push(`/search/${domainSearch}`);
        }}
      >
        <div className='flex'>
          <input
            type='text'
            ref={inputRef}
            value={domainSearch}
            className=' bg-black caret-red-500 outline-none bg-opacity-20 w-full px-5 py-3 text-white rounded-tl rounded-bl border-yellow border'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDomainSearch(e.target.value)
            }
            placeholder='Lookup Domain...'
            autoComplete='off'
          />
          <button className='bg-yellow text-black px-4 py-0.5 uppercase rounded-tr rounded-br'>
            Search
          </button>
        </div>
      </form>
      <p className='text-[#ff0000]'>{error}</p>
    </div>
  );
}
