import { getName } from '@lib/contract';
import addresses from 'constants/contracts';
import { DomainProps } from 'constants/types';
import { ethers } from 'ethers';
import { useContext } from 'react';
import Web3Context from '../wallet/context';
import ReverseRegistrar from '@lib/abis/ReverseRegistrar.json';
import classNames from 'classnames';

interface RegistrationProps {
  domain: DomainProps;
}

export default function SetPrimaryName({
  registrations,
  setModalOpen,
}: {
  registrations: RegistrationProps[];
  setModalOpen: (open: boolean) => void;
}) {
  const { state, dispatch } = useContext(Web3Context);

  const setNameAsPrimary = async (name: string) => {
    console.log('hi');
    if (name === state.movrName) {
      console.error('Name is already set to primary');
      return;
    }

    const signer = await state.web3Provider.getSigner();

    const reverseRegistrar = new ethers.Contract(
      addresses.reverseRegistrar,
      ReverseRegistrar.abi,
      signer
    );

    try {
      const set = await reverseRegistrar.setName(name);
      await set.wait();

      setModalOpen(false);

      const newName = await getName(state.address);
      dispatch({ type: 'SET_MOVR_NAME', movrName: newName });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h3 className='text-2xl font-bold uppercase text-yellow mb-3'>
        Set Primary MOVR Name
      </h3>
      <ul className='space-y-2'>
        {registrations.map(
          (registration) =>
            registration.domain.name && (
              <li
                key={registration.domain.id}
                className={classNames(
                  'px-3 py-1 border-b border-green border-opacity-20 transition-colors flex justify-between items-end cursor-pointer',
                  {
                    'text-[#444] cursor-default':
                      state.movrName === registration.domain.labelName,
                    'hover:border-opacity-100':
                      state.movrName !== registration.domain.labelName,
                  }
                )}
                onClick={() => setNameAsPrimary(registration.domain.labelName)}
              >
                <div>
                  <span className='font-bold'>{registration.domain.name}</span>
                </div>
                {state.movrName == registration.domain.labelName ? (
                  <span className='uppercase font-bold'>Primary</span>
                ) : (
                  <span className='text-sm'>Set as Primary</span>
                )}
              </li>
            )
        )}
      </ul>
    </div>
  );
}
