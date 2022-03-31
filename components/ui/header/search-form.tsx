import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { searchedDomain } from 'apollo/reactiveVars';

export default function Search() {
  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.4 }}
      className='flex py-2 h-full'
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        const search = searchValue.trim();
        searchedDomain(search);
        router.push(`/domain/${search}`);
      }}
    >
      <input
        type='text'
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value.toLowerCase())
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder='Search names...'
        className={classNames(
          'bg-[#2D2D2D] h-full px-3 py-3 w-full text-white outline-none transition duration-300 rounded-l-sm',
          {
            'border-opacity-50': !focused,
            'border-opacity-100': focused,
          }
        )}
      />
      <button
        className={classNames(
          'border-l-0 bg-[#2D2D2D] px-3 uppercase font-bold font-cabin tracking-wider text-xs hover:bg-green hover:bg-opacity-80 transition duration-300 rounded-r-sm',
          {
            'border-opacity-50': !focused,
            'border-opacity-100': focused,
          }
        )}
      >
        Search
      </button>
    </motion.form>
  );
}
