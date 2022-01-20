import { ethers } from "ethers";

export const moonbaseProvider = new ethers.providers.StaticJsonRpcProvider(
  "https://rpc.api.moonbase.moonbeam.network",
  {
    chainId: 1287,
    name: "moonbase-alphanet",
  }
);

export const moonbeamDevProvider = new ethers.providers.StaticJsonRpcProvider(
  "http://127.0.0.1:9933",
  {
    chainId: 1281,
    name: "moonbeam-dev-node",
  }
);
