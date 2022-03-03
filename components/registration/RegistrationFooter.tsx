import React from 'react';
import { ProgressBar, RegistrationButton } from '.';

interface Props {
  setOpenQuestions: (boolean: boolean) => void;
  step: number;
  claiming: boolean;
  time: number;
  claim: () => void;
  register: () => void;
  timerActive: boolean;
  registering: boolean;
}

export default function RegistrationFooter({
  setOpenQuestions,
  step,
  claiming,
  time,
  claim,
  register,
  timerActive,
  registering,
}: Props) {
  return (
    <div className='mt-10'>
      {step == 2 && <ProgressBar time={time} />}
      <div className='flex justify-between items-center'>
        <div className='flex space-x-3 items-center'>
          <div>
            <button
              onClick={() => setOpenQuestions(true)}
              className='outline-none'
            >
              <QuestionMark />
            </button>
          </div>
          <p className='uppercase text-sm text-gray'>Step {step} of 3</p>
        </div>
        {step === 2 && (
          <div className='flex items-center space-x-3'>
            <span className='font-bold uppercase text-sm flex-col relative'>
              <span className='block'>Time Remaining {time}</span>
              {!timerActive && (
                <span className='block absolute text-center text-xs text-[#999]'>
                  Time will start when tx is complete
                </span>
              )}
            </span>
          </div>
        )}
        {registering && <span>Registering Name</span>}
        <RegistrationButton
          step={step}
          text={
            step === 1
              ? 'Claim'
              : step === 2
              ? 'Claiming'
              : step === 3
              ? 'Register'
              : 'error'
          }
          claim={claim}
          register={register}
          time={time}
        />
      </div>
    </div>
  );
}

function QuestionMark() {
  return (
    <span className='bg-gray bg-opacity-50 px-1.5 py-0.5 rounded-full hover:bg-opacity-100 transition-colors duration-200 hover:bg-green hover:text-black select-none font-bold text-sm focus:outline-none'>
      ?
    </span>
  );
}
