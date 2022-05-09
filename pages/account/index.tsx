import type { DomainProps } from 'constants/types';
import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import shortenHex from '@lib/shorten-hex';
import { useRouter } from 'next/router';
import Web3Context from '@components/wallet/context';
import { Modal, DomainCard } from '@components/ui';
import { SetPrimaryName } from '@components/domain';
import { GET_ACCOUNT_DOMAINS } from 'graphql/queries';
import { FaChevronDown } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

type OrderByType = 'labelName' | 'expiryDate' | 'registrationDate';
type OrderDirectionsType = 'asc' | 'desc';

export default function AccountPage() {
  const { state } = useContext(Web3Context);
  const { query: routerQuery } = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [screen, setScreen] = useState<'registered' | 'controlled'>(
    'registered'
  );
  const [orderDirection, setOrderDirection] =
    useState<OrderDirectionsType>('asc');
  const [orderBy, setOrderBy] = useState<OrderByType>('labelName');
  const { data, loading, error, refetch } = useQuery(GET_ACCOUNT_DOMAINS, {
    variables: {
      account: state.address,
      orderDirection,
      orderBy,
    },
    nextFetchPolicy: 'no-cache',
  });

  const setSort = (sortOption: OrderByType) => {
    setSortMenuOpen(false);
    setOrderBy(sortOption);
    refetch({ account: state.address, orderBy, orderDirection });
  };

  return (
    <React.Fragment>
      <div className='wrapper'>
        <h1 className='text-4xl uppercase mt-16 col-span-full'>
          <span className='text-yellow font-bold tracking-wider'>Account </span>
          <span className='normal-case'>{shortenHex(state.address)}</span>
        </h1>
        <div className='mb-8 col-span-full'>
          {state.movrName ? (
            <React.Fragment>
              <span className='uppercase'>Primary MOVR name </span>
              <span className='text-yellow'>{state.movrName}.movr</span>
            </React.Fragment>
          ) : (
            <button
              className='bg-green text-black px-1.5 py-0.5'
              onClick={() => setModalOpen(true)}
            >
              Set Primary MOVR Name
            </button>
          )}
          {state.movrName && (
            <React.Fragment>
              <span> </span>
              <span className='text-green'>
                <button
                  className='font-bold tracking-wider outline-none'
                  onClick={() => setModalOpen(true)}
                >
                  CHANGE
                </button>
              </span>
            </React.Fragment>
          )}
        </div>
        <div className='wrapper col-span-full mb-4'>
          <h2
            className={classNames(
              'col-span-3 text-xl font-bold font-cabin uppercase cursor-pointer',
              {
                'text-[#7B7B7B]': screen != 'registered',
                'text-white': screen == 'registered',
              }
            )}
            onClick={() => setScreen('registered')}
          >
            Registered Domains
          </h2>
          <h2
            className={classNames(
              'col-span-3 text-xl font-bold font-cabin uppercase cursor-pointer',
              {
                'text-[#7B7B7B]': screen != 'controlled',
                'text-white': screen == 'controlled',
              }
            )}
            onClick={() => setScreen('controlled')}
          >
            Controlled Domains
          </h2>
          <div className='col-start-10 col-span-3'>
            <div className='flex justify-end space-x-5'>
              <button
                className='uppercase border border-yellow border-opacity-40 px-5 py-1 font-bold flex items-center space-x-3'
                onClick={() => {
                  setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
                  refetch();
                }}
              >
                <span className='block w-12'>{orderDirection}</span>
              </button>
              <button
                className='uppercase border border-yellow border-opacity-40 px-5 py-1 font-bold flex items-center space-x-3'
                onClick={() => setSortMenuOpen(!sortMenuOpen)}
              >
                <span>Sort</span>
                <FaChevronDown />
              </button>
            </div>
            <div className='flex justify-end'>
              <AnimatePresence>
                {sortMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='absolute bg-black z-20 border border-green border-opacity-50 mt-0.5'
                  >
                    <ul className='text-right font-bold uppercase relative z-30'>
                      <li className='border-b border-green border-opacity-20 px-5 py-2 z-30 block cursor-pointer relative'>
                        <a onClick={() => setSort('labelName')}>Alphabetical</a>
                      </li>
                      <li className='border-b border-green border-opacity-20 px-5 py-2 cursor-pointer z-30 relative'>
                        <a onClick={() => setSort('registrationDate')}>
                          Registered
                        </a>
                      </li>
                      <li className='border-b border-green border-opacity-20 px-5 py-2 cursor-pointer z-30 relative'>
                        <a onClick={() => setSort('expiryDate')}>Expiring</a>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        {data && !loading ? (
          data.account != null ? (
            <div className='col-span-full'>
              <div className='grid grid-cols-4 gap-10'>
                {data?.account?.domains.map(
                  (domain: DomainProps) =>
                    domain.name && (
                      <DomainCard
                        domain={domain}
                        // expiration={registration.expiryDate}
                        key={domain.id}
                      />
                    )
                )}
              </div>
            </div>
          ) : (
            <div className='col-span-full'>
              <p className='font-cabin text-gray-300'>
                You currently do not have any names registered.
              </p>
            </div>
          )
        ) : error ? (
          <div className='col-span-12'>
            <h1 className='text-4xl text-yellow font-bold uppercase'>
              Something went wrong
            </h1>
            <div>
              <code>{JSON.stringify(error, null, 2)}</code>
            </div>
          </div>
        ) : (
          <p>Loading</p>
        )}
      </div>
      {data?.account?.registrations && (
        <Modal isOpen={modalOpen} close={() => setModalOpen(false)}>
          <SetPrimaryName
            registrations={data.account.registrations}
            setModalOpen={(open: boolean) => setModalOpen(open)}
          />
        </Modal>
      )}
    </React.Fragment>
  );
}
