import { Wallet } from '@components/wallet';
import Image from 'next/image';
import { SiteLinks } from '@components/ui';
import classNames from 'classnames';
import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import Web3Context from '@components/wallet/context';
import { GET_ACCOUNT_DOMAINS } from 'graphql/queries';
import {
  RiAccountCircleFill,
  RiFileList2Line,
  RiLogoutBoxLine,
} from 'react-icons/ri';
import { searchedDomain } from 'apollo/reactiveVars';

export default function Header() {
  const [focused, setFocused] = useState(false);
  const { state, dispatch } = useContext(Web3Context);
  const [searchValue, setSearchValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [domainsOpen, setDomainsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!dropdownOpen && domainsOpen) {
      setDomainsOpen(false);
    }
  }, [dropdownOpen, domainsOpen]);

  useEffect(() => {
    router.events.on('routeChangeStart', () => setDropdownOpen(false));
  }, [router.events]);

  const isHomePage = router.pathname === '/';

  return (
    <Fragment>
      <header
        className={classNames(
          'bg-[#3C3C3C] relative z-40 transition-colors duration-300 drop-shadow-[6px_5px_4px_rgba(0,0,0,.25)] rounded-r-sm',
          {
            'bg-opacity-0': isHomePage,
          }
        )}
        style={{ width: '95%', marginTop: '15px' }}
      >
        <div className='px-16'>
          <div className='grid grid-cols-12 gap-5'>
            <AnimatePresence>
              <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                exit={{ y: -100 }}
                transition={{ delay: isHomePage ? 1 : 1, bounce: 0 }}
                className='flex items-center relative'
              >
                <div
                  className='bg-[#202020] px-2 flex items-end drop-shadow-[-3.5px_3.5px_2px_rgba(0,0,0,.25)] rounded-b-sm'
                  style={{ height: '145%' }}
                >
                  <Link href='/'>
                    <a className=''>
                      <Image
                        src='/logos/short_white.svg'
                        height='47px'
                        width='50.52'
                        alt='MDR Logo'
                      />
                    </a>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className='flex items-center col-span-2 col-start-2'>
              <Wallet
                dropdownOpen={dropdownOpen}
                hasChevron={!isHomePage}
                handleClick={() => setDropdownOpen(!dropdownOpen)}
              />
            </div>
            <div className='col-span-6'>
              <AnimatePresence>
                {!isHomePage ? (
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
                ) : (
                  <div className='h-14' />
                )}
              </AnimatePresence>
            </div>
            <div className='col-span-3 flex items-center justify-end'>
              <SiteLinks />
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {dropdownOpen && (
          <div
            className={classNames('grid grid-cols-12 gap-x-5 relative px-16', {
              '-mt-3': isHomePage,
            })}
          >
            <motion.div
              initial={!isHomePage ? { y: -150 } : { opacity: 0 }}
              animate={!isHomePage ? { y: 0 } : { opacity: 1 }}
              exit={!isHomePage ? { y: -150 } : { opacity: 0 }}
              transition={{ duration: 0.3, bounce: 0 }}
              className='absolute col-start-2 flex'
            >
              <ul className='text-white font-cabin bg-[#111] relative z-20'>
                {state.address && (
                  <li className='nav-list-item'>
                    <Link href={`/account`}>
                      <a className='flex items-center space-x-2'>
                        <RiAccountCircleFill /> <span>Account</span>
                      </a>
                    </Link>
                  </li>
                )}
                <li
                  className={classNames('nav-list-item', {
                    'text-yellow': domainsOpen,
                  })}
                >
                  <span
                    className='flex items-center space-x-2'
                    onClick={() => setDomainsOpen(!domainsOpen)}
                  >
                    <RiFileList2Line />
                    <span> Domains</span>
                  </span>
                </li>
                <li className='nav-list-item'>
                  <span
                    onClick={() => {
                      dispatch({ type: 'RESET_WEB3_PROVIDER' });
                      setDropdownOpen(false);
                    }}
                    className='flex items-center space-x-2'
                  >
                    <RiLogoutBoxLine />
                    <span> Disconnect</span>
                  </span>
                </li>
              </ul>
              {state.address && (
                <DomainList
                  open={domainsOpen}
                  address={state.address}
                  isHomePage={isHomePage}
                />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Fragment>
  );
}

interface DomainListProps {
  open: boolean;
  address: string;
  isHomePage?: boolean;
}

function DomainList({ open, address, isHomePage }: DomainListProps) {
  const { data, loading, error } = useQuery(GET_ACCOUNT_DOMAINS, {
    variables: { account: address },
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={!isHomePage ? { y: -150 } : { opacity: 0 }}
          animate={!isHomePage ? { y: 0 } : { opacity: 1 }}
          exit={!isHomePage ? { y: -150 } : { opacity: 0 }}
          transition={{ duration: 0.3, bounce: 0 }}
          className='relative px-10 py-2 bg-[#111111] text-white text-base font-normal normal-case w-auto z-20'
        >
          {!loading && !error ? (
            <ul>
              {data?.account?.registrations?.map(
                (registration: any) =>
                  registration.domain.name && (
                    <li key={registration.domain.name}>
                      <Link href={`/domain/${registration.domain.labelName}`}>
                        <a>{registration.domain.name}</a>
                      </Link>
                    </li>
                  )
              )}
            </ul>
          ) : loading ? (
            <p>Loading</p>
          ) : (
            <p>error</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
