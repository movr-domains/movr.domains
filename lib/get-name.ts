import addresses from "constants/contracts";
import { ethers } from "ethers";
import { moonbeamDevProvider } from "./providers";
import PublicResolver from "@lib/abis/PublicResolver.json";
import ReverseRegistrar from "@lib/abis/ReverseRegistrar.json";

export default async function getName(wallet: string) {
  const reverseRegistrar = new ethers.Contract(
    addresses.reverseRegistrar,
    ReverseRegistrar.abi,
    moonbeamDevProvider
  );

  const resolver = new ethers.Contract(
    addresses.resolver,
    PublicResolver.abi,
    moonbeamDevProvider
  );

  const reverseNode = await reverseRegistrar.node(wallet);

  return await resolver.name(reverseNode);
}
