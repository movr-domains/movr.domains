import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { injected } from "../constants/connectors";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import shortenHex from "@lib/shorten-hex";
import getName from "@lib/get-name";

export default function useWallet() {
  const [connectedWallet, setConnectedWallet] = useState<string | null>();
  const [mdrName, setMdrName] = useState<string | null>();

  const { activate, active, account, chainId, connector } =
    useWeb3React<Web3Provider>();

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

  useEffect(() => {
    async function lookUpName(wallet: string) {
      const name = await getName(wallet);
      setMdrName(name);
    }

    if (connectedWallet) {
      lookUpName(connectedWallet);
    }

    return () => {
      setMdrName("");
    };
  }, [connectedWallet]);

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

  const connectWallet = async () => {
    activate(injected, (error) => console.log(error), true).catch((error) => {
      console.log("Connect Wallet Error: ", error);
    });
  };

  return {
    connectWallet,
    wallet: connectedWallet,
    truncatedWallet: shortenHex(connectedWallet),
    getSigner,
    mdrName: `${mdrName}.movr`,
  };
}
