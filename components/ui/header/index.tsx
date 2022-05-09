import { Wallet } from '@components/wallet';
import Image from 'next/image';
import { SiteLinks } from '@components/ui';
import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import Search from './search-form';
import Dropdown from './dropdown';

export default function Header() {
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
      <div className='relative z-40 bg-[#0d0d0d]' style={{ height: '15px' }} />
      <motion.header
        initial={{ opacity: 0, x: !isHomePage ? -1000 : 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={classNames(
          'bg-[#3C3C3C] relative z-40 transition-colors duration-300 drop-shadow-[6px_5px_4px_rgba(0,0,0,.25)] rounded-r-sm',
          {
            'bg-opacity-0': isHomePage,
          }
        )}
        style={{ width: '95%' }}
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
                  <Search />
                ) : (
                  // to hold up nav when on home page
                  <div className='h-14' />
                )}
              </AnimatePresence>
            </div>
            <div className='col-span-3 flex items-center justify-end'>
              <SiteLinks />
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {dropdownOpen && (
          <Dropdown
            isHomePage={isHomePage}
            domainsOpen={domainsOpen}
            setDomainsOpen={(isOpen) => setDomainsOpen(isOpen)}
            setDropdownOpen={(isOpen) => setDropdownOpen(isOpen)}
          />
        )}
      </AnimatePresence>
    </Fragment>
  );
}
