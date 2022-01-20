import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { injected } from "../constants/connectors";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

export default function useWallet() {
  const [connectedWallet, setConnectedWallet] = useState<string | null>();

  const { activate, active, account } = useWeb3React<Web3Provider>();

  useEffect(() => {
    const { ethereum } = window;
    ethereum.on("disconnect", () => {
      localStorage.removeItem("__user");
      setConnectedWallet(null);
    });
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      const storage = localStorage.getItem("__user");
      if (storage) {
        setConnectedWallet(storage);
      }

      if (!window.ethereum.selectedAddress) {
        localStorage.removeItem("__user");
        setConnectedWallet(null);
      }
    }
  }, []);

  // useEffect(() => {
  //   if (window.ethereum.chainId !== '0x1') return;
  //   async function lookUpENS(wallet: string) {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const ENS = await provider.lookupAddress(wallet);
  //     setENSName(ENS);
  //   }

  //   if (connectedWallet) {
  //     lookUpENS(connectedWallet);
  //   }

  //   return () => {
  //     setENSName('');
  //   };
  // }, [connectedWallet]);

  async function getSigner() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider.getSigner();
  }

  useEffect(() => {
    if (active && account) {
      setConnectedWallet(account);
      localStorage.setItem("__user", account);
    }
  }, [active, account]);

  const connectWallet = () => {
    activate(injected, (error) => console.log(error), true).catch((error) => {
      console.log("Connect Wallet Error: ", error);
    });
  };

  function shortenHex(hex?: string | null, length = 4) {
    if (!hex) return;
    return `${hex.substring(0, length + 2)}…${hex.substring(
      hex.length - length
    )}`;
  }

  return {
    connectWallet,
    wallet: connectedWallet,
    truncatedWallet: shortenHex(connectedWallet),
    getSigner,
  };
}
