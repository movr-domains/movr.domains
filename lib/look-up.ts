import addresses from "constants/contracts";
import { ethers } from "ethers";
// @ts-ignore
import namehash from "eth-ens-namehash";
import ENSRegistry from "@lib/abis/ENSRegistry.json";

const lookUpOwner = async (name: string) => {
  if (!name) return;
  const provider = new ethers.providers.StaticJsonRpcProvider(
    "http://127.0.0.1:9933",
    {
      name: "mbase",
      chainId: 1281,
    }
  );

  const registry = new ethers.Contract(
    addresses.registry,
    ENSRegistry.abi,
    provider
  );

  const owner = await registry.owner(namehash.hash(name + ".movr"));
  return owner !== "0x0000000000000000000000000000000000000000" ? owner : null;
};

export default lookUpOwner;
