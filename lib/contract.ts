import { BigNumber, ethers } from 'ethers';
import addresses from 'constants/contracts';
import MOVRRegistryABI from '@lib/abis/MOVRRegistry.json';
import MOVRRegistrarControllerABI from '@lib/abis/MOVRRegistrarControllerABI.json';
import BaseRegistrar from '@lib/abis/Registrar.json';
import ReverseRegistrar from '@lib/abis/ReverseRegistrar.json';
import PublicResolver from '@lib/abis/PublicResolver.json';
import getProvider from './providers';
import crypto from 'crypto';
import contractLog from './dev/console-contract';
import { namehash } from 'ethers/lib/utils';

const provider = getProvider();

function randomSecret() {
  return '0x' + crypto.randomBytes(32).toString('hex');
}

export function controllerContract(signer?: any) {
  return new ethers.Contract(
    addresses.movrRegistrar,
    MOVRRegistrarControllerABI.abi,
    signer ? signer : provider
  );
}

export function registryContract(signer?: any) {
  return new ethers.Contract(
    addresses.registry,
    MOVRRegistryABI.abi,
    signer ? signer : provider
  );
}

export function resolverContract(signer?: any) {
  return new ethers.Contract(
    addresses.resolver,
    PublicResolver.abi,
    signer ? signer : provider
  );
}

export async function registrarContract(signer?: any) {
  return new ethers.Contract(
    addresses.registrar,
    BaseRegistrar.abi,
    signer ? signer : provider
  );
}

export async function createSubdomain(
  signer: any,
  node: string,
  label: string,
  owner: string,
  resolver: string,
  ttl: string
) {
  const registry = registryContract(signer);
  contractLog(registry);
  const create = registry.createSubnodeRecord(
    node,
    label,
    owner,
    resolver,
    ttl
  );
}

export async function checkOwner(name: string) {
  const node = ethers.utils.namehash(name);
  const registry = registryContract();

  const owner = await registry.owner(node);

  return owner;
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

  const commitmentHash = await controller.makeCommitmentWithConfig(
    name,
    address,
    secret,
    addresses.resolver,
    address
  );

  const commit = await controller.commit(commitmentHash);
  await commit.wait();

  window.localStorage.setItem(`secret-${name}`, secret);
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

export async function setText(
  provider: any,
  name: string,
  key: string,
  value: string
) {
  const signer = provider.getSigner();
  const resolver = resolverContract(signer);
  const node = namehash(name);
  console.log(node, name);

  try {
    const setText = await resolver.setText(node, key, value);
    await setText.wait();
    return { success: true };
  } catch (error) {
    return { message: 'Something went wrong', error };
  }
}

export async function resolveText(name: string, key: string) {
  const resolver = resolverContract();
  const node = namehash(name);

  try {
    const getText = await resolver.text(node, key);
    return getText;
  } catch (error) {
    console.log(error);
  }
}

export async function getName(wallet: string) {
  const reverseRegistrar = new ethers.Contract(
    addresses.reverseRegistrar,
    ReverseRegistrar.abi,
    provider!
  );

  const resolver = new ethers.Contract(
    addresses.resolver,
    PublicResolver.abi,
    provider!
  );

  const reverseNode = await reverseRegistrar.node(wallet);

  return await resolver.name(reverseNode);
}

export async function getResolver() {
  const hash = namehash('look');
  console.log(hash);
  const registry = registryContract();
  const resolver = await registry.resolver(hash);
  return resolver;
}
