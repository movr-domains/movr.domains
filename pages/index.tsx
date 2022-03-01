import { Web3Context, ActionType, StateType } from '@components/wallet';
import { Header } from '@components/ui';
// import { Lookup } from "@components/user";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { LookUp } from '@components/registration';
import { namehash } from 'ethers/lib/utils';

interface ContextProps {
  state: typeof StateType;
  dispatch: typeof ActionType;
}

export default function Home() {
  const { state, dispatch } = useContext<ContextProps>(Web3Context);
  console.log(state, dispatch);
  console.log(namehash('spence.movr'));

  return (
    <main className='h-screen flex items-center bg-opacity-100'>
      <div className='fixed top-0 w-full left-0'>
        <Header />
      </div>
      <div className='max-w-xl mx-auto bg-opacity-40 p-16 rounded'>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className=''>
            <code className='text-xs uppercase text-center block'>
              {process.env.NODE_ENV === 'production'
                ? 'production'
                : process.env.NODE_ENV === 'test'
                ? 'staging'
                : 'development'}
            </code>
            <div className='px-4'>
              <Image
                src='/mdr-logos/movr_full_white.png'
                height='250px'
                width='1853px'
                alt='MOVR Domain Registry Logo'
                priority
              />
            </div>
          </div>
          <LookUp />
        </motion.div>
      </div>
    </main>
  );
}
