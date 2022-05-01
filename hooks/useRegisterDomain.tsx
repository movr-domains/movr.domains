import { Web3Context } from '@components/wallet';
import { claimName, initialNameChecks, registerName } from '@lib/contract';
import addresses from 'constants/contracts';
import { BigNumber, ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import MOVRRegistrarControllerABI from '@lib/abis/MOVRRegistrarControllerABI.json';

const oneYear = 31536000;

export default function useRegisterDomain(name: string, years: number) {
  const { state } = useContext(Web3Context);
  const [secretHash, setSecretHash] = useState<string | null>();
  const [error, setError] = useState<string | null>();
  const [rent, setRent] = useState<BigNumber>();
  const [movrPrice, setMovrPrice] = useState(1);
  const [claiming, setClaiming] = useState(false);
  const [claimingError, setClaimingError] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    async function fetchRent() {
      if (!name) return;
      const { unparsedRent, rentPrice, isAvailable, isValid } =
        await initialNameChecks(name);
      if (rentPrice && unparsedRent) {
        setRent(unparsedRent);
        setMovrPrice(parseFloat(rentPrice));
      }

      // if (isAvailable) {
      //   setAvailable(isAvailable);
      // }

      if (!isValid) {
      }
    }
    fetchRent();
  }, [name]);

  const register = async () => {
    if (!state.web3Provider) {
      setError('No Wallet Connected');
      return;
    }

    if (!rent) {
      setError("Rent price isn't set");
      return;
    }

    let secret = secretHash;

    if (!secret) {
      secret = window.localStorage.getItem(`secret-${name}`);
      if (!secret) return setError('No secret found');
    }

    const formattedName = name.split('.')[0];

    const signer = await state.web3Provider.getSigner();

    const registrar = new ethers.Contract(
      addresses.movrRegistrar,
      MOVRRegistrarControllerABI.abi,
      signer
    );

    try {
      const register = await registrar.register(
        formattedName,
        state.address,
        oneYear * years,
        secret,
        {
          value: rent,
          gasLimit: 420000,
        }
      );
      setRegistering(true);
      await register.wait();
      setRegistering(false);
      return setRegistered(true);
    } catch (error) {
      console.log(error);
      return { message: 'Something went wrong', error };
    }
  };

  const claim = async () => {
    if (!state.web3Provider) {
      setError('No Wallet Connected');
      return;
    }

    if (isNaN(years) || years < 0) {
      setError('invalid years');
      return;
    }

    if (!name) {
      setError('Name is not set');
      return;
    }

    const formattedName = name.split('.')[0];
    console.log(formattedName);

    try {
      setClaiming(true);
      const { error, secret, commit } = await claimName(
        formattedName,
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
      // setStep(2);
      setClaiming(false);
    } catch (error) {
      console.log(error);
      setClaimingError(true);
      setClaiming(false);
    }
  };

  return {
    movrPrice,
    claiming,
    error,
    secretHash,
    claimingError,
    registering,
    registered,
    register,
    claim,
  };
}
