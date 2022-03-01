import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import cn from "classnames";
import { ethers } from "ethers";
import addresses from "constants/contracts";
import MOVRRegistrarControllerABI from "@lib/abis/MOVRRegistrarControllerABI.json";
import useWallet from "@hooks/useWallet";
import lookUpOwner from "@lib/look-up";
import Web3Context from "@components/wallet/context";
import useWalletActions from "@hooks/useWalletActions";

const oneYear = 31536000;

export default function RegisterNamePage() {
  const [years, setYears] = useState(3);
  const [isLifetime, setIsLifetime] = useState(false);
  const [basePrice, setBasePrice] = useState(10);
  const [rentPrice, setRentPrice] = useState<any>();
  const [committed, setIsCommitted] = useState(false);
  const [time, setTime] = useState(60);
  const [isCounting, setIsCounting] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const { wallet, connectWallet } = useWallet();
  const { state, dispatch } = useContext(Web3Context);
  const { connect } = useWalletActions();

  const newName = Array.isArray(router.query.name)
    ? router.query.name![0]
    : router.query.name!;

  useEffect(() => {
    async function fetch() {
      const owner = await lookUpOwner(newName);

      if (owner) {
        router.push(`/search/${newName}`);
      }
    }
    fetch();
  }, [newName, router]);

  useEffect(() => {
    if (!newName) return;

    switch (newName.length) {
      case 1:
        setError("Names must be at least 3 characters in length.");
        break;
      case 2:
        setError("Names must be at least 3 characters in length.");
        break;
      case 3:
        setBasePrice(250);
        break;
      case 4:
        setBasePrice(100);
        break;
      default:
        setBasePrice(10);
    }
  }, [newName]);

  useEffect(() => {
    let interval: any = null;
    if (isCounting) {
      if (time == 0) {
        setIsCounting(false);
      }
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (!isCounting && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [time, isCounting]);

  async function claim(e: React.FormEvent) {
    e.preventDefault();

    // Function should not happen without a wallet, this is here to potentially prevent
    // this function from getting called
    if (!state.address) return;
    const signer = await state.web3Provider.getSigner();

    const controller = new ethers.Contract(
      addresses.movrRegistrar,
      MOVRRegistrarControllerABI.abi,
      signer
    );
    const rent = await controller.rentPrice(newName, oneYear * years);
    console.log(
      "Rent Price: ",
      ethers.utils.formatEther(ethers.BigNumber.from(rent).toString())
    );
    setRentPrice(rent);

    const isValid = await controller.valid(newName);
    // TODO: Add error message for this.
    if (!isValid) return;

    const isAvailable = await controller.available(newName);

    // TODO: Add error message for this.
    if (!isAvailable) return;

    const commitmentHash = await controller.makeCommitment(
      newName,
      state.address,
      ethers.utils.formatBytes32String("secret")
    );
    console.log(commitmentHash);

    const commit = await controller.commit(commitmentHash);
    await commit.wait();
    if (commit.hash) {
      setIsCommitted(true);
      setIsCounting(true);
    }
  }

  const registerName = async () => {
    const signer = await state.web3Provider.getSigner();

    const controller = new ethers.Contract(
      addresses.movrRegistrar,
      MOVRRegistrarControllerABI.abi,
      signer
    );
    const register = await controller.register(
      newName,
      state.address,
      oneYear * years,
      ethers.utils.formatBytes32String("secret"),
      {
        value: rentPrice,
        gasLimit: 420000,
      }
    );

    await register.wait();
    setIsCommitted(false);
  };

  return (
    <main>
      <div className="contrainer max-w-3xl mx-auto mt-10">
        <div className="px-16 py-10 bg-black border border-green rounded mt-5">
          <div className="mb-5 pb-3 border-b border-stone-800">
            <h2 className="text-3xl font-bold border-stone-800">
              Registering{" "}
              <span className="uppercase text-yellow">{newName}.movr</span>
            </h2>
            <p>
              <span className="text-yellow">Domain</span>{" "}
              <span className="text-[#00ff00] test">available</span>.{" "}
              {newName && newName.length < 4 && (
                <span>
                  {newName.length} letter .movr domains are available for{" "}
                  {basePrice} per year.
                </span>
              )}
            </p>
          </div>
          <div>
            <div className="max-w-xl mx-auto py-5">
              <h4 className="text-xl tracking-wider uppercase mb-3">
                Registration Length
              </h4>
              <div className="flex space-x-10 justify-between">
                <div
                  className="flex items-center"
                  onClick={() => {
                    isLifetime && setIsLifetime(false);
                  }}
                >
                  <div
                    className={cn("flex flex-col items-center", {
                      "text-white": !isLifetime,
                      "text-stone-800": isLifetime,
                    })}
                  >
                    <motion.button
                      whileTap={{ opacity: 0.1 }}
                      className="text-xl mx-1 block"
                      onClick={() => setYears(years + 1)}
                    >
                      <BsChevronUp />
                    </motion.button>
                    <span
                      className={cn("text-2xl uppercase flex items-center", {
                        "text-yellow": !isLifetime,
                        "text-stone-800": isLifetime,
                      })}
                    >
                      {years}
                    </span>
                    <motion.button
                      whileTap={{ opacity: 0.1 }}
                      className="text-xl px-1"
                      onClick={() => {
                        years >= 2 && setYears(years - 1);
                      }}
                    >
                      <BsChevronDown />
                    </motion.button>
                  </div>
                  <span
                    className={cn("text-2xl uppercase text-yellow block ml-3", {
                      "text-yellow": !isLifetime,
                      "text-stone-800": isLifetime,
                    })}
                  >
                    {years <= 1 ? "Year" : "Years"} - ${basePrice * years}
                  </span>
                </div>
                <div className="mt-4 ml-3">
                  <button
                    onClick={() => setIsLifetime(!isLifetime)}
                    className={cn(
                      "text-2xl uppercase flex items-center px-3 py-1 rounded transition duration-200",
                      {
                        "bg-yellow text-black border border-white": isLifetime,
                        "bg-black text-stone-800": !isLifetime,
                      }
                    )}
                  >
                    Lifetime - $2500
                  </button>
                </div>
              </div>
            </div>

            <div className=" mt-7 flex flex-col items-end">
              {wallet ? (
                !committed ? (
                  <button
                    className="px-5 py-0.5 bg-yellow text-black rounded"
                    onClick={claim}
                  >
                    Claim {newName}.movr
                  </button>
                ) : (
                  <React.Fragment>
                    {time !== 0 && (
                      <p>Please wait {time} seconds to claim your name.</p>
                    )}
                    <button
                      className={cn("px-5 py-0.5  text-black rounded", {
                        "bg-yellow": time == 0 && !isCounting,
                        "bg-gray": time !== 0,
                      })}
                      onClick={registerName}
                      disabled={time !== 0}
                    >
                      Register {newName}.movr
                    </button>
                  </React.Fragment>
                )
              ) : (
                <button
                  className="px-5 py-0.5 bg-yellow text-black rounded"
                  onClick={connect}
                >
                  Connect Wallet
                </button>
              )}

              <div className="mt-2 text-right">
                <p className="text-sm text-gray">
                  Transaction {!committed ? "1" : "2"} of 2
                </p>
                <p className="text-sm text-gray">
                  Registering a new domain requires two transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
