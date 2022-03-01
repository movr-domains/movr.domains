import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { claimName, initialNameChecks, registerName } from "@lib/contract";
import { validateNameLength } from "@lib/utils";
import { Modal } from "@components/ui";
import {
  DisplayCosts,
  YearsSelect,
  RegisterSteps,
} from "@components/registration";
import { Web3Context } from "@components/wallet";
import useWalletActions from "@hooks/useWalletActions";
import RegistrationButton from "@components/registration/RegistrationButton";
import RegistrationOptions from "@components/registration/RegistrationOptions";
import MOVRRegistrarControllerABI from "@lib/abis/MOVRRegistrarControllerABI.json";
import addresses from "constants/contracts";
import { BigNumber, ethers } from "ethers";
import contractLog from "@lib/dev/console-contract";

const oneYear = 31536000;

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [years, setYears] = useState(1);
  const [openQuestions, setOpenQuestions] = useState(false);
  const [error, setError] = useState<string | null>();
  const [basePrice, setBasePrice] = useState(10);
  const [movrPrice, setMovrPrice] = useState(1);
  const [secretHash, setSecretHash] = useState<string | null>();
  const [available, setAvailable] = useState<boolean | null>(null);
  const [valid, setValid] = useState<boolean | null>(null);
  const [time, setTime] = useState(60);
  const [rent, setRent] = useState<BigNumber>();
  const router = useRouter();
  const { state } = useContext(Web3Context);

  const { connect } = useWalletActions();

  const newName = Array.isArray(router.query.name)
    ? router.query.name![0]
    : router.query.name!;

  useEffect(() => {
    async function fetchRent() {
      if (!newName) return;

      const { unparsedRent, rentPrice, isAvailable, isValid } =
        await initialNameChecks(newName);
      if (rentPrice && unparsedRent) {
        setRent(unparsedRent);
        setMovrPrice(parseFloat(rentPrice));
      }

      if (isAvailable) {
        setAvailable(isAvailable);
      }

      if (!isValid) {
        router.push(`/domain/${newName}`);
      }
    }
    fetchRent();
  }, [newName, router]);

  useEffect(() => {
    if (!newName) return;
    const { price, error } = validateNameLength(newName);
    if (error) return setError(error);
    setBasePrice(price);
  }, [newName]);

  // Claim Timer
  useEffect(() => {
    let interval: any = null;
    if (step === 2) {
      if (time == 0) {
        setStep(3);
      }
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (step !== 2 && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [time, step]);

  const claim = async () => {
    if (!state.web3Provider) {
      setError("No Wallet Connected");
      return;
    }

    if (isNaN(years) || years < 0) {
      setError("invalid years");
      return;
    }

    if (!newName) {
      setError("Name is not set");
      return;
    }

    try {
      const { error, secret, commit } = await claimName(
        newName,
        state.web3Provider,
        years * oneYear,
        state.address
      );

      if (error) {
        console.log(error);
        setError(error);
        return;
      }

      setSecretHash(secret);
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async () => {
    if (!state.web3Provider) {
      setError("No Wallet Connected");
      return;
    }

    if (!rent) {
      setError("Rent price isn't set");
      return;
    }

    let secret = secretHash;

    if (!secret) {
      secret = window.localStorage.getItem(`secret-${newName}.movr`);
      if (!secret) return setError("No secret found");
    }

    const register = await registerName(
      state.web3Provider,
      newName,
      state.address,
      oneYear * years,
      secret,
      rent
    );

    // if (!register.success) {
    //   setError("Error registering name.");
    //   return;
    // }

    // TODO: Do something after name is registered
    console.log("Name registered");
  };

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="col-start-3 col-span-8 mt-16">
          <div className="flex flex-col">
            <Header name={newName} step={step} />
            <motion.div
              initial={{
                y: 0,
                marginTop: "20px",
              }}
              animate={{
                y: step === 1 ? 0 : -30,
                marginTop: step !== 1 ? 0 : "20px",
              }}
              transition={{ delay: 0.5, duration: 1 }}
              layout
            >
              <RegistrationOptions
                step={step}
                setYears={(years) => setYears(years)}
                movrPrice={movrPrice}
                years={years}
                basePrice={basePrice}
              />
              <div className="mt-10 flex justify-between items-center">
                <div className="flex space-x-3 items-center">
                  <div>
                    <button
                      onClick={() => setOpenQuestions(true)}
                      className="outline-none"
                    >
                      <QuestionMark />
                    </button>
                  </div>
                  <p className="uppercase text-sm text-gray">
                    Step {step} of 3
                  </p>
                </div>
                {step === 2 && (
                  <div className="flex items-center space-x-3">
                    <span className="font-bold uppercase text-sm">
                      Time Remaining {time}
                    </span>
                  </div>
                )}
                <RegistrationButton
                  step={step}
                  text={
                    step === 1
                      ? "Claim"
                      : step === 2
                      ? "Claiming"
                      : step === 3
                      ? "Register"
                      : "error"
                  }
                  claim={claim}
                  register={register}
                  time={time}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Modal isOpen={openQuestions} close={() => setOpenQuestions(false)}>
        <RegisterSteps />
      </Modal>
    </React.Fragment>
  );
}

function QuestionMark() {
  return (
    <span className="bg-gray bg-opacity-50 px-1.5 py-0.5 rounded-full hover:bg-opacity-100 transition-colors duration-200 hover:bg-green hover:text-black select-none font-bold text-sm focus:outline-none">
      ?
    </span>
  );
}

function Header({ name, step }: { name: string; step: number }) {
  return (
    <div className="mb-5">
      <h1 className="text-4xl uppercase font-bold flex flex-col text-yellow mb-1 bg-black relative z-10 space-x-3 break-words leading-5">
        {step === 1 && (
          <motion.span
            key="register"
            animate={{ y: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ duration: 1, bounce: 0 }}
            className="block"
          >
            Register{" "}
          </motion.span>
        )}

        {step === 2 && (
          <motion.span
            key="claiming"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 1, bounce: 0 }}
            className="block"
          >
            Claiming{" "}
          </motion.span>
        )}

        {step === 3 && (
          <motion.span
            key="registering"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2, bounce: 0 }}
            className="block"
          >
            Registering
          </motion.span>
        )}
      </h1>
      <motion.span className="text-5xl uppercase font-bold  text-white block m-0">
        {name}.movr
      </motion.span>
      <AnimatePresence>
        {step === 1 && (
          <motion.p
            exit={{ y: -50, opacity: 0 }}
            className="text-gray leading-4"
            layout
          >
            <span className="text-yellow">Domain</span>{" "}
            <span className="text-[#00ff00]">available</span> - 4 letter .movr
            domains are available for $100 per year with a scaling .05% discount
            to each added year.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
