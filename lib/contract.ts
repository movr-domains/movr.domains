import { BigNumber, ethers } from 'ethers';
import addresses from 'constants/contracts';
import MOVRRegistrarControllerABI from '@lib/abis/MOVRRegistrarControllerABI.json';
import { moonbeamDevProvider, moonbaseProvider } from './providers';
import crypto from 'crypto';

function randomSecret() {
  return '0x' + crypto.randomBytes(32).toString('hex');
}

function controllerContract(signer?: any) {
  const provider = moonbaseProvider;
  return new ethers.Contract(
    addresses.movrRegistrar,
    MOVRRegistrarControllerABI.abi,
    signer ? signer : provider
  );
}

export async function claimName(
  name: string,
  provider: any,
  duration: number,
  address: string
) {
  const signer = await provider.getSigner();
  const controller = controllerContract(signer);
  const secret = randomSecret();

  const valid = await controller.valid(name);
  if (!valid) return { error: 'Name is not valid' };
  const available = await controller.available(name);
  if (!available) return { error: 'Name is not available' };

  const rent = await controller.rentPrice(name, duration);

  const commitmentHash = await controller.makeCommitment(name, address, secret);

  const commit = await controller.commit(commitmentHash);
  await commit.wait();

  window.localStorage.setItem(`secret-${name}.movr`, secret);
  return { valid, available, rent, commitmentHash, secret, commit };
}

export async function getRentPrice(name: string, duration: number) {
  try {
    const controller = controllerContract();
    const rent = await controller.rentPrice(name, duration);
    return rent;
  } catch (error) {
    console.log('Get Rent Price', error);
  }
}

export async function checkIfAvailable(name: string) {
  try {
    const controller = controllerContract();
    const available = await controller.available(name);
    return available;
  } catch (error) {
    console.log('Check If Vaild Error: ', error);
  }
}

export async function checkIfValid(name: string) {
  try {
    const controller = controllerContract();
    const valid = await controller.valid(name);
    return valid;
  } catch (error) {
    console.log('Check If Vaild Error: ', error);
  }
}

type InitialData = {
  unparsedRent: BigNumber | null;
  rentPrice: string | null;
  isAvailable: boolean | null;
  isValid: boolean | null;
};

export const initialNameChecks = async (name: string): Promise<InitialData> => {
  try {
    const rent = getRentPrice(name, 31536000);
    const available = checkIfAvailable(name);
    const valid = checkIfValid(name);
    const [rentPrice, isAvailable, isValid] = await Promise.all([
      rent,
      available,
      valid,
    ]);
    return {
      unparsedRent: rentPrice,
      rentPrice: ethers.utils.formatEther(rentPrice),
      isAvailable,
      isValid,
    };
  } catch (error: any) {
    console.log('Initial Check Error: ', error);
    return {
      unparsedRent: null,
      rentPrice: null,
      isAvailable: null,
      isValid: null,
    };
  }
};

export const registerName = async (
  provider: any,
  name: string,
  address: string,
  duration: number,
  secret: string,
  rent: BigNumber
) => {
  const signer = await provider.getSigner();

  const registrar = new ethers.Contract(
    addresses.movrRegistrar,
    MOVRRegistrarControllerABI.abi,
    signer
  );

  try {
    const register = await registrar.register(name, address, duration, secret, {
      value: rent,
      gasLimit: 420000,
    });
    await register.wait();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { message: 'Something went wrong', error };
  }
};
