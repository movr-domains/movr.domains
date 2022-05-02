import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { validateNameLength } from '@lib/utils';
import { Modal } from '@components/ui';
import { RegisterSteps } from '@components/registration';
import RegistrationOptions from '@components/registration/RegistrationOptions';
import { Header, RegistrationFooter } from '@components/registration';
import useRegisterDomain from '@hooks/useRegisterDomain';
import { searchedDomain } from 'apollo/reactiveVars';
import { StateType } from '@components/wallet';
import useSearchName from '@hooks/useSearchName';
import Link from 'next/link';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [time, setTime] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [years, setYears] = useState(1);
  const [openQuestions, setOpenQuestions] = useState(false);
  const [basePrice, setBasePrice] = useState(10);

  const router = useRouter();
  const reactiveSearched = searchedDomain();

  const newName = Array.isArray(router.query.name)
    ? router.query.name![0]
    : router.query.name!;

  // console.log(reactiveSearched, newName);

  const {
    movrPrice,
    claiming,
    secretHash,
    error,
    claimingError,
    registered,
    registering,
    claim,
    register,
  } = useRegisterDomain(newName, years);

  const { valid, error: nameError } = useSearchName(newName);

  useEffect(() => {
    if (claimingError) {
      setStep(1);
    }
  }, [claimingError]);

  useEffect(() => {
    if (claiming) {
      setStep(2);
    }

    if (step === 2 && !claiming) {
      setTimerActive(true);
    }
  }, [claiming, step]);

  useEffect(() => {
    if (claimingError) {
      setStep(1);
    }
  }, [claimingError]);

  useEffect(() => {
    if (!newName) return;
    const { price } = validateNameLength(newName);
    setBasePrice(price);
  }, [newName]);

  useEffect(() => {
    if (registered) {
      router.push(`/domain/${newName}/manage`);
    }
  }, [registered, newName, router]);

  // Claim Timer
  useEffect(() => {
    let interval: any = null;
    if (timerActive) {
      if (time == 0) {
        setStep(3);
      }
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (timerActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [time, timerActive]);

  return (
    <React.Fragment>
      <div className='wrapper'>
        <div className='col-start-3 col-span-8 mt-16'>
          {valid ? (
            <div className='flex flex-col'>
              <Header name={newName} step={step} />
              <motion.div
                initial={{
                  y: 0,
                  marginTop: '20px',
                }}
                animate={{
                  y: step === 1 ? 0 : -30,
                  marginTop: step !== 1 ? '10px' : '20px',
                }}
                transition={{ duration: 0.5 }}
              >
                <RegistrationOptions
                  step={step}
                  setYears={(years) => setYears(years)}
                  movrPrice={movrPrice}
                  years={years}
                  basePrice={basePrice}
                  time={time}
                />
                <RegistrationFooter
                  setOpenQuestions={setOpenQuestions}
                  step={step}
                  claiming={claiming}
                  time={time}
                  claim={claim}
                  register={register}
                  timerActive={timerActive}
                  registering={registering}
                />
              </motion.div>
            </div>
          ) : (
            <div className='text-center max-w-lg mx-auto'>
              <h3 className='text-4xl uppercase font-cabin font-bold text-red-600 mb-4'>
                Error
              </h3>
              <p className='text-xl uppercase'>{nameError}</p>
              <div className='mt-10'>
                <Link href='/'>
                  <a className='font-bold font-cabin uppercase text-xl tracking-wider'>
                    Search Again
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={openQuestions} close={() => setOpenQuestions(false)}>
        <RegisterSteps />
      </Modal>
    </React.Fragment>
  );
}
