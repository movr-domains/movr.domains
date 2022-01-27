import addresses from "../../../constants/contracts";
import StablePriceOracle from "@lib/abis/StablePriceOracle.json";
import { ethers } from "ethers";
import { useEffect } from "react";
import contractLog from "@lib/dev/console-contract";
import { DeployerAddresses } from "@components/admin";

const oneYear = 31536000;

export default function PriceOracle() {
  useEffect(() => {
    async function fetch() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // const provider = new ethers.providers.StaticJsonRpcProvider(
      //   "http://127.0.0.1:9933",
      //   {
      //     name: "mbase",
      //     chainId: 1281,
      //   }
      // );
      const priceOracle = new ethers.Contract(
        addresses.priceOracle,
        StablePriceOracle.abi,
        signer
      );
      const date = Date.now();
      console.log(date);
      contractLog(priceOracle);
      const prices = await priceOracle.price("nate", date + oneYear, oneYear);
      console.log({
        prices: ethers.utils.formatEther(
          ethers.BigNumber.from(prices).toString()
        ),
      });
    }

    fetch();
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
      <DeployerAddresses />
    </div>
  );
}
