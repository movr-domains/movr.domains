import useWalletActions from '@hooks/useWalletActions';
import shortenHex from '@lib/shorten-hex';
import classNames from 'classnames';
import Image from 'next/image';
import React, { useContext } from 'react';
import Web3Context from './context';

interface WalletProps {
  dropdownOpen: boolean;
  hasChevron: boolean;
  handleClick: () => void;
}

export default function Wallet({
  dropdownOpen,
  handleClick,
  hasChevron,
}: WalletProps) {
  const { state } = useContext(Web3Context);
  const { connect, switchChainIds } = useWalletActions();

  if (!state.address) {
    return (
      <div className='flex'>
        <button
          className='font-cabin tracking-wider uppercase border border-green px-3 py-1 text-xs'
          onClick={connect}
        >
          Connect
        </button>
      </div>
    );
  }

  return (
    <div
      className='flex flex-col cursor-pointer select-none relative'
      onClick={handleClick}
    >
      <span className='text-xs font-cabin tracking-wider uppercase text-[#a4a4a4] leading-0 block -mb-2'>
        Connected As
      </span>

      <div className='flex flex-end'>
        <span className='font-cabin tracking-wider'>
          {state.movrName
            ? `${state.movrName}.movr`
            : shortenHex(state.address)}
        </span>
        <div
          className={classNames('transform transition duration-200', {
            '-rotate-180': dropdownOpen,
          })}
        >
          <Image
            src='/arrow.svg'
            height='8.5px'
            width='17px'
            alt='arrow down'
          />
        </div>
      </div>
    </div>
  );
}
