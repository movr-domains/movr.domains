import { ethers } from "ethers";

function contractLog(contract: ethers.Contract) {
  console.log(contract.interface);
}

export default contractLog;
