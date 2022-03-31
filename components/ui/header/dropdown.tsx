import Link from 'next/link';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import {
  RiAccountCircleFill,
  RiFileList2Line,
  RiLogoutBoxLine,
} from 'react-icons/ri';
import DomainList from './domain-list';
import { useContext } from 'react';
import { Web3Context } from '@components/wallet';
import useWalletActions from '@hooks/useWalletActions';

interface DropdownProps {
  isHomePage: boolean;
  domainsOpen: boolean;
  setDomainsOpen: (isOpen: boolean) => void;
  setDropdownOpen: (isOpen: boolean) => void;
}

export default function Dropdown({
  isHomePage,
  domainsOpen,
  setDomainsOpen,
  setDropdownOpen,
}: DropdownProps) {
  const { state } = useContext(Web3Context);
  const { disconnect } = useWalletActions();

  return (
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
                disconnect();
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
  );
}
