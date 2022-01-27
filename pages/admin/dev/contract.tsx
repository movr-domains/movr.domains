import { DeployerAddresses } from "@components/admin";
import addresses from "../../../constants/contracts";
import { moonbaseProvider } from "@lib/providers";
import { ethers } from "ethers";
import ENSDeployer from "@lib/abis/ENSDeployer.json";
import ENSRegistry from "@lib/abis/ENSRegistry.json";
import FIFSRegistrarABI from "@lib/abis/FIFSRegistrar.json";
import RegistrarABI from "@lib/abis/Registrar.json";
import ReverseRegistrar from "@lib/abis/ReverseRegistrar.json";
import PublicResolver from "@lib/abis/PublicResolver.json";
import MOVRRegistrarControllerABI from "@lib/abis/MOVRRegistrarControllerABI.json";
import React, { useEffect, useState } from "react";
// @ts-ignore
import namehash from "eth-ens-namehash";
import contractLog from "@lib/dev/console-contract";
import Timer from "@components/timer";
import useWallet from "@hooks/useWallet";

export default function ContractPage() {
  return (
    <div className="space-y-20 pt-10 pb-32">
      <DeployerAddresses />
      <CreateDomain />
      <GetName />
    </div>
  );
}

const oneYear = 31536000;

function CreateDomain() {
  const [name, setName] = useState("");
  const [rentPrice, setRentPrice] = useState<any>();
  const [isCommitted, setIsCommitted] = useState(false);
  const [time, setTime] = useState(60);
  const { wallet } = useWallet();

  const checkIfAvailable = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const controller = new ethers.Contract(
      addresses.movrRegistrar,
      MOVRRegistrarControllerABI.abi,
      signer
    );
    const isAvailable = await controller.available(name);
    console.log(isAvailable, name);
    return isAvailable;
  };

  async function create(e: React.FormEvent) {
    e.preventDefault();

    if (!moonbaseProvider) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const controller = new ethers.Contract(
      addresses.movrRegistrar,
      MOVRRegistrarControllerABI.abi,
      signer
    );

    contractLog(controller);

    setRentPrice(await controller.rentPrice(name, oneYear));

    const isValid = await controller.valid(name);
    // TODO: Add error message for this.
    if (!isValid) return;

    const isAvailable = await controller.available(name);

    // TODO: Add error message for this.
    if (!isAvailable) return;

    const commitmentHash = await controller.makeCommitment(
      name,
      wallet,
      ethers.utils.formatBytes32String("secret")
    );
    console.log(commitmentHash);

    const commit = await controller.commit(commitmentHash);
    await commit.wait();
    if (commit.hash) {
      console.log(true);
      setIsCommitted(true);
    }
  }

  const register = async (rent: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const controller = new ethers.Contract(
      addresses.movrRegistrar,
      MOVRRegistrarControllerABI.abi,
      signer
    );
    const register = await controller.register(
      name,
      wallet,
      oneYear,
      ethers.utils.formatBytes32String("secret"),
      {
        value: rent,
        gasLimit: 420000,
      }
    );
    await register.wait();
    console.log(register);
    setTime(0);
    setIsCommitted(false);
  };

  return (
    <div>
      <h2 className="text-3xl">Create Domain</h2>
      <form onSubmit={create}>
        <input
          type="text"
          placeholder="Name..."
          className="px-2 py-1 rounded text-black"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          value={name}
        />
        <button type="submit" className="btn">
          Create Domain
        </button>
      </form>
      <button onClick={checkIfAvailable} className="btn">
        Check if available
      </button>
      <button onClick={() => register(rentPrice)} className="btn">
        Register
      </button>
    </div>
  );
}

function GetName() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddress("");
    console.log(namehash.hash(name));

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const registry = new ethers.Contract(
      addresses.registry,
      ENSRegistry.abi,
      signer
    );

    contractLog(registry);

    const resolver = new ethers.Contract(
      addresses.resolver,
      PublicResolver.abi,
      signer
    );

    contractLog(resolver);

    const owner = await registry.owner(namehash.hash(name + ".movr"));
    setAddress(owner);
  };
  return (
    <div>
      <h2 className="text-3xl">Get Name</h2>
      <form onSubmit={search}>
        <input
          type="text"
          placeholder="Name..."
          className="px-2 py-1 rounded text-black"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          value={name}
        />
        <button type="submit" className="btn">
          Get Name
        </button>
      </form>
      {address}
    </div>
  );
}
