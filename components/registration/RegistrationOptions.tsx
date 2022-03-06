import ProgressBar from './ProgressBar';
import { DisplayCosts, YearsSelect } from '.';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { Web3Context } from '@components/wallet';
import shortenHex from '@lib/shorten-hex';

interface Props {
  step: number;
  years: number;
  basePrice: number;
  movrPrice: number;
  time: number;

  setYears: (years: number) => void;
}

export default function RegistrationOptions({
  step,
  years,
  basePrice,
  movrPrice,
  setYears,

  time,
}: Props) {
  const { state } = useContext(Web3Context);

  const labelHeading = classNames(
    'uppercase text-sm text-[#555] font-bold tracking-wider',
    {
      'text-center': step !== 3,
    }
  );
  return (
    <div>
      {step == 2 && (
        <div className='mb-2'>
          <span className='text-[#333] font-bold font-cabin uppercase'>
            After the claiming process you will be able to register your name
          </span>
        </div>
      )}
      {step == 3 && (
        <div className='mb-2'>
          <span className='text-[#333] font-bold font-cabin uppercase'>
            Something about registering a name will go here
          </span>
        </div>
      )}
      <div
        className={classNames('grid grid-cols-2 gap-y-2', {
          'place-items-center': step !== 3,
        })}
      >
        <div>
          <p className={labelHeading}>Registration Period</p>
          <YearsSelect
            step={step}
            years={years}
            setYears={(years: number) => setYears(years)}
          />
        </div>
        <div>
          <p className={labelHeading}>Total Cost + Gas</p>
          <DisplayCosts
            years={years}
            basePrice={basePrice}
            movrPrice={movrPrice}
            step={step}
          />
        </div>
        {step === 3 && (
          <React.Fragment>
            <div>
              <h4 className={labelHeading}>Registrant</h4>
              <span className='uppercase font-bold text-[#999]'>
                {shortenHex(state.address)}
              </span>
            </div>
            <div>
              <h4 className={labelHeading}>Controller</h4>
              <span className='uppercase font-bold text-[#999]'>
                {shortenHex(state.address)}
              </span>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
